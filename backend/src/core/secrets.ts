import {Database} from "../db";


/**
 * Initializes secrets logic
 */
export function initSecretLogic(db: Database) {

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

