import {Request, Response} from "express";
import {eventSchema, systemIdSchema, validateBy} from "../validators";
import {authenticate} from "../auth";
import {notFoundError} from "../errors";


/**
 * Handles events creation
 */
export async function eventCreateHandler(req: Request, res: Response) {
    const user = await authenticate(req);

    const form = validateBy(req.body, eventSchema);

    return await req.core.event.create(user.id, form);
}

/**
 * Handles events update
 */
export async function eventUpdateHandler(req: Request, res: Response) {
    const eventId = validateBy(req.params.eventId, systemIdSchema, notFoundError);
    const user = await authenticate(req);

    const form = validateBy(req.body, eventSchema);

    return await req.core.event.edit(user.id, eventId, form);
}

/**
 * Handles events list request
 */
export async function eventListHandler(req: Request, res: Response) {
    const user = await authenticate(req);

    return await req.core.event.list(user.id);
}

/**
 * Handles event get request
 */
export async function eventGetHandler(req: Request, res: Response) {
    const eventId = validateBy(req.params.eventId, systemIdSchema, notFoundError);
    const user = await authenticate(req);

    return await req.core.event.get(user.id, eventId);
}

/**
 * Handles events remove request
 */
export async function eventRemoveHandler(req: Request<{eventId: string}>, res: Response) {
    const eventId = validateBy(req.params.eventId, systemIdSchema, notFoundError);
    const user = await authenticate(req);

    await req.core.event.remove(user.id, eventId);
}
