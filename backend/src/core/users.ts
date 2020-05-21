import {Database} from "../db";


/**
 * Initializes users logic
 */
export function initUsersLogic(db: Database) {

    return {
        register: db.user.create,
        login: db.user.authenticate,
        get: db.user.get,
    }
}

