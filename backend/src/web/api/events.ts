import {Request, Response} from "express";
import {eventCreateSchema, systemIdSchema, validateBy} from "../validators";
import {authenticate} from "../auth";


/**
 * Handles events creation
 */
export async function eventCreateHandler(req: Request, res: Response) {
    const user = await authenticate(req);

    const form = validateBy(req.body, eventCreateSchema);

    const event = await req.core.event.create(user.id, form);

    return event;
}

/**
 * Handles events list request
 */
export async function eventListHandler(req: Request, res: Response) {
    const user = await authenticate(req);

    const eventList = await req.core.event.list(user.id);

    return eventList;
}

/**
 * Handles events remove request
 */
export async function eventRemoveHandler(req: Request<{eventId: string}>, res: Response) {
    const eventId = validateBy(req.params.eventId, systemIdSchema);
    const user = await authenticate(req);

    await req.core.event.remove(user.id, eventId);
}
