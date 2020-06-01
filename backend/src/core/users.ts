import {Database} from "../db";

interface Config {
    readonly db: Database;
}


/**
 * Initializes users logic
 */
export function initUsersLogic(config: Config) {
    const {db} = config;

    return {
        register: db.user.create,
        login: db.user.authenticate,
        get: db.user.get,
    }
}

