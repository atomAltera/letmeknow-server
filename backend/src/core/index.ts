import {Database} from "../db";
import {Unpromised} from "../lib/helper-types";
import {initUsersLogic} from "./users";
import {initEventsLogic} from "./events";
import {initSecretLogic} from "./secrets";

interface CoreConfig {
    db: Database;
}

/**
 * Initialize core
 */
export async function initializeCore(config: CoreConfig) {
    const user = initUsersLogic(config.db);
    const event = initEventsLogic(config.db);
    const secret = initSecretLogic(config.db);

    return {
        user,
        event,
        secret,
    }
}

export type Core = Unpromised<ReturnType<typeof initializeCore>>
