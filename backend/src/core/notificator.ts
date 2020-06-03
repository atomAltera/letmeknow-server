import {Secret} from "../db/models/secret";
import {renderTemplate} from "../lib/renderer";
import {sendTelegramMessage} from "../lib/telegram";
import {sendEmailMessage} from "../lib/email";


/**
 * Notify target using secret and template of notification with some payload
 */
export async function sendNotification(
    secret: Secret,
    eventName: string,
    template: string,
    payload: string | undefined,
    globalVars: any,
) {
    let params: any = {};

    if (payload) {
        try {
            params = JSON.parse(payload);
        } catch (e) {
            console.warn(`Error while parsing payload: ${e.message}`)
        }
    }

    params = {...params, ...globalVars};

    const message = renderTemplate(template, params);

    switch (secret.kind) {
        case "telegram":
            return await sendTelegramMessage({
                secret: secret.botSecret,
                channelId: secret.chatId,
            }, message);

        case "email":
            return await sendEmailMessage({
                host: secret.host,
                port: secret.port,
                username: secret.username,
                password: secret.password,
                secure: secret.useTLS,
                mailFrom: secret.mailFrom,
                mailTo: secret.mailTo,
            }, eventName, message);


        default:
            // @ts-ignore
            throw new Error(`Unknown secret kind: "${secret.kind}" of secret with id: ${secret.id}`);
    }
}
