import {Request, Response} from "express";
import {
    baseSecretCreateSchema,
    partEmailSecretCreateSchema,
    systemIdSchema,
    partTelegramSecretCreateSchema,
    validateBy
} from "../validators";
import {authenticate} from "../auth";
import {Secret} from "../../db/models/secret";

/**
 * Hides sensitive information in secret
 * @param secret
 */
function sanitizeSecret(secret: Secret): Secret {
    switch (secret.kind) {
        case "telegram":
            return {
                ...secret,
                botSecret: "*********"
            }

        case "email":
            return {
                ...secret,
                password: "*********"
            }
    }
}

/**
 * Handles telegram secrets creation
 */
export async function secretCreateHandler(req: Request, res: Response) {
    const user = await authenticate(req);

    let secret: Secret;
    const base = validateBy(req.body, baseSecretCreateSchema);

    switch (base.kind) {
        case "telegram":
            const telegramForm = validateBy(req.body, partTelegramSecretCreateSchema)
            secret = await req.core.secret.createTelegram(user.id, {...base, ...telegramForm});
            break;

        case "email":
            const emailForm = validateBy(req.body, partEmailSecretCreateSchema)
            secret = await req.core.secret.createEmail(user.id, {...base, ...emailForm});
            break;
    }

    return sanitizeSecret(secret);
}

/**
 * Handles secrets list request
 */
export async function secretListHandler(req: Request, res: Response) {
    const user = await authenticate(req);

    const secretList = await req.core.secret.list(user.id);

    return secretList.map(sanitizeSecret);
}

/**
 * Handles secrets remove request
 */
export async function secretRemoveHandler(req: Request<{ secretId: string }>, res: Response) {
    const secretId = validateBy(req.params.secretId, systemIdSchema);
    const user = await authenticate(req);

    await req.core.secret.remove(user.id, secretId);
}
