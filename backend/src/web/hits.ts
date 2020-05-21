import {Request, Response} from "express";
import {systemIdSchema, validateBy} from "./validators";


/**
 * Takes object and serializes it to string
 * @param obj
 */
function objectToPayload(obj: {}): string | undefined {
    if (Object.keys(obj).length === 0) return undefined;

    return JSON.stringify(obj);
}

/**
 * Handles event hit
 */
export async function handleHit(req: Request<{ eventId: string }>, res: Response) {
    const  eventId = validateBy(req.params.eventId, systemIdSchema);

    res.end();

    try {
        let payload: string | undefined;

        if (req.method === "GET") {
            payload = objectToPayload(req.query)
        } else {
            payload = objectToPayload(req.body);
        }

        await req.core.event.registerHit(eventId, payload)

    } catch (e) {
        // TODO: Log hit error
        console.error(`While hit processing:`, e)
    }
}
