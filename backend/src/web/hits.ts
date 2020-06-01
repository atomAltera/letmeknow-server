import {Request, Response} from "express";
import {eventKeySchema, validateBy} from "./validators";


/**
 * Takes object and serializes it to string
 */
function objectToPayload(obj: {}): string | undefined {
    if (Object.keys(obj).length === 0) return undefined;

    return JSON.stringify(obj);
}

/**
 * Handles event hit
 */
export async function handleHit(req: Request<{ eventKey: string }>, res: Response) {
    const eventKey = validateBy(req.params.eventKey, eventKeySchema);

    res.end();

    try {
        let payload: string | undefined;

        if (req.method === "GET") {
            payload = objectToPayload(req.query)
        } else {
            payload = objectToPayload(req.body);
        }

        await req.core.event.registerHit(eventKey, payload);

    } catch (e) {
        // TODO: Log hit error
        console.error(`While hit processing:`, e)
    }
}
