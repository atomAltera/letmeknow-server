import {Request, Response} from "express";
import {validateBy, loginSchema} from "../validators";
import {AuthError} from "../errors";
import {authenticate, setLoggedInUserId} from "../auth";


/**
 * Handles user login
 */
export async function loginHandler(req: Request, res: Response) {
    const {email, password, remember} = validateBy(req.body, loginSchema);

    const user = await req.core.user.login(email, password);

    if (!user) {
        throw new AuthError();
    }

    setLoggedInUserId(user.id, remember, res, req.config.sessionSecret)

    return user;
}


/**
 * Handles current user request
 */
export async function loggedInUserHandler(req: Request, res: Response) {
    return authenticate(req);
}
