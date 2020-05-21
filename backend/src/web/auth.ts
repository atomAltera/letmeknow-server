import {NextFunction, Request, Response} from "express";
import jwt from "jsonwebtoken";
import {AccessError} from "./errors";
import {User} from "../db";

/**
 * Auth token content
 */
interface AuthTokenPayload {
    userId: string;
}

/**
 * Live time of auth token (in seconds)
 */
const TOKEN_AGE = 3600 * 24 * 60;

/**
 * Creates auth token from userId and secret key
 */
const createAuthToken = (userId: string, secret: string) => {
    const exp = Math.floor(Date.now() / 1000) + TOKEN_AGE;

    return jwt.sign({
        exp,
        userId,
    } as AuthTokenPayload, secret);
};

/**
 * Takes auth token and validates it. If valid, returns user id from that token
 */
const checkAuthToken = (token: string, secret: string): string | undefined => {
    try {
        const payload = jwt.verify(token, secret) as AuthTokenPayload;
        return payload.userId;
    } catch (e) {
        return undefined;
    }
};

/**
 * Sets user id to cookie to make it logged in
 */
export const setLoggedInUserId = (userId: string, res: Response, secret: string) => {
    const token = createAuthToken(userId, secret);

    const maxAge = TOKEN_AGE * 1000;

    res.cookie("auth", token, {maxAge});
};

/**
 * Clear auth cookie
 */
export const clearLoggedInUserId = (res: Response) => {
    res.cookie("auth", "");
};

/**
 * Retrieves logged in user id from cookie
 */
export const getLoggedInUserId = (req: Request, secret: string): string | undefined => {
    const token = req.cookies.auth as string | undefined;

    if (!token) {
        return undefined;
    }

    return checkAuthToken(token, secret);
};

/**
 * Returns logged in user from request object. If no user is logged in, throws AccessError
 */
export async function authenticate(req: Request): Promise<User> {
    const userId = getLoggedInUserId(req, req.config.sessionSecret);

    if (!userId) {
        throw new AccessError();
    }

    const user = await req.core.user.get(userId);

    if (!user) {
        throw new AccessError();
    }

    return user;
}
