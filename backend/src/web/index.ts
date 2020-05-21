import express, {NextFunction, Request, Response} from "express";
import cookieParser from "cookie-parser";
import {Core} from "../core";
import {
    responseWithAccessError,
    responseWithAuthError,
    responseWithUnknownError,
    responseWithValidationError
} from "./responses";
import {AccessError, AuthError, ValidationError} from "./errors";
import api from "./api";
import {User} from "../db";
import {getLoggedInUserId} from "./auth";
import {handleHit} from "./hits";
import {h} from "./utils";

declare global {
    namespace Express {
        export interface Request {
            config: WebConfig;
            core: Core;
        }
    }
}

interface WebConfig {
    readonly port: number;
    readonly sessionSecret: string;
    readonly core: Core;
}

/**
 * Starts web server
 * @param config
 */
export async function startServer(config: WebConfig): Promise<void> {
    const app = express();

    // Standard middleware
    app.use(express.json({limit: "50kb", strict: true}));
    app.use(cookieParser());

    // Initializing context vars
    app.use(async function (req, res, next) {
        req.config = config;
        req.core = config.core;

        next();
    });

    // API request handlers
    app.use(api);

    // Event hit handler
    app.get('/:eventId', h(handleHit));
    app.post('/:eventId', h(handleHit));

    // Error handler
    app.use((error: any, req: Request, res: Response, next: NextFunction) => {
        console.error(error);

        if (error instanceof ValidationError) {
            responseWithValidationError(res, error.details)
            return;
        }

        if (error instanceof AuthError) {
            responseWithAuthError(res);
            return;
        }
        if (error instanceof AccessError) {
            responseWithAccessError(res);
            return;
        }

        responseWithUnknownError(res);
    });

    // Start server
    return new Promise((resolve, reject) => {
        app.listen(config.port, (err) => {
            if (err) {
                reject(err);
                return
            }

            resolve();
        });
    });
}

