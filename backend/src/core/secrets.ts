import {Database} from "../db";

interface Config {
    readonly db: Database;
}


/**
 * Initializes secrets logic
 */
export function initSecretLogic(config: Config) {
    const {db} = config;

    return {
        createTelegram: db.secret.createTelegram,
        createEmail: db.secret.createEmail,
        editTelegram: db.secret.editTelegram,
        editEmail: db.secret.editEmail,
        list: db.secret.list,
        get: db.secret.get,
        remove: db.secret.remove,
    }
}

