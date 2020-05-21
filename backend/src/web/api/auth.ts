import {Request, Response} from "express";
import {validateBy, loginSchema} from "../validators";
import {AuthError} from "../errors";
import {setLoggedInUserId} from "../auth";


/**
 * Handles user login
 */
export async function loginHandler(req: Request, res: Response) {
    const {email, password} = validateBy(req.body, loginSchema);

    const user = await req.core.user.login(email, password);

    if (!user) {
        throw new AuthError();
    }

    setLoggedInUserId(user.id, res, req.config.sessionSecret)

    return user;
}
