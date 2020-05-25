import {Request, Response} from "express";
import {registrationSchema, validateBy} from "../validators";
import {setLoggedInUserId} from "../auth";


/**
 * Handles user registration
 */
export async function registrationHandler(req: Request, res: Response) {
    const form = validateBy(req.body, registrationSchema);

    const user = await req.core.user.register(form);

    setLoggedInUserId(user.id, true, res, req.config.sessionSecret)

    return user;
}
