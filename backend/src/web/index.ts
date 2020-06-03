import express, {NextFunction, Request, Response} from "express";
import cookieParser from "cookie-parser";
import {Core} from "../core";
import {
    responseWithAccessError,
    responseWithAuthError,
    responseWithNotFoundError,
    responseWithUnknownError,
    responseWithValidationError
} from "./responses";
import {AccessError, AuthError, NotFoundError, ValidationError} from "./errors";
import api from "./api";
import {handleHit} from "./hits";
import {h} from "./utils";
import {Scheduler} from "../scheduler";

declare global {
    namespace Express {
        export interface Request {
            config: WebConfig;
            core: Core;
            scheduler: Scheduler;
        }
    }
}

interface WebConfig {
    readonly port: number;
    readonly sessionSecret: string;
    readonly core: Core;
    readonly scheduler: Scheduler;
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
        req.scheduler = config.scheduler;

        next();
    });

    // API request handlers
    app.use(api);

    // Event hit handler
    app.get('/call/:eventKey', h(handleHit));
    app.post('/call/:eventKey', h(handleHit));

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

        if (error instanceof NotFoundError) {
            responseWithNotFoundError(res);
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

