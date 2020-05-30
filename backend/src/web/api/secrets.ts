import {Request, Response} from "express";
import {
    baseSecretSchema,
    partEmailSecretSchema,
    systemIdSchema,
    partTelegramSecretSchema,
    validateBy
} from "../validators";
import {authenticate} from "../auth";
import {Secret} from "../../db/models/secret";
import {NotFoundError} from "../errors";


/**
 * Handles secrets creation
 */
export async function secretCreateHandler(req: Request, res: Response) {
    const user = await authenticate(req);

    let secret: Secret;
    const base = validateBy(req.body, baseSecretSchema);

    switch (base.kind) {
        case "telegram":
            const telegramForm = validateBy(req.body, partTelegramSecretSchema)
            secret = await req.core.secret.createTelegram(user.id, {...base, ...telegramForm});
            break;

        case "email":
            const emailForm = validateBy(req.body, partEmailSecretSchema)
            secret = await req.core.secret.createEmail(user.id, {...base, ...emailForm});
            break;
    }

    return secret;
}

/**
 * Handles secret update
 */
export async function secretUpdateHandler(req: Request, res: Response) {
    const secretId = validateBy(req.params.secretId, systemIdSchema);
    const user = await authenticate(req);

    const base = validateBy(req.body, baseSecretSchema);

    switch (base.kind) {
        case "telegram":
            const telegramForm = validateBy(req.body, partTelegramSecretSchema)
            await req.core.secret.editTelegram(user.id, secretId, {...base, ...telegramForm});
            break;

        case "email":
            const emailForm = validateBy(req.body, partEmailSecretSchema)
            await req.core.secret.editEmail(user.id, secretId, {...base, ...emailForm});
            break;
    }
}

/**
 * Handles secrets list request
 */
export async function secretListHandler(req: Request, res: Response) {
    const user = await authenticate(req);

    return await req.core.secret.list(user.id);
}

/**
 * Handles secrets get request
 */
export async function secretGetHandler(req: Request, res: Response) {
    const secretId = validateBy(req.params.secretId, systemIdSchema);
    const user = await authenticate(req);

    const secret = await req.core.secret.get(user.id, secretId);

    if (!secret) throw new NotFoundError();

    return secret
}

/**
 * Handles secrets remove request
 */
export async function secretRemoveHandler(req: Request<{ secretId: string }>, res: Response) {
    const secretId = validateBy(req.params.secretId, systemIdSchema);
    const user = await authenticate(req);

    await req.core.secret.remove(user.id, secretId);
}
