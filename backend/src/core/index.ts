import {Database} from "../db";
import {Unpromised} from "../lib/helper-types";
import {initUsersLogic} from "./users";
import {initEventsLogic} from "./events";
import {initSecretLogic} from "./secrets";
import {initHitsLogic} from "./hits";

interface CoreConfig {
    readonly db: Database;
    readonly maxAttemptCount: number;
    readonly attemptTimeoutInSeconds: number;
}

/**
 * Initialize core
 */
export async function initializeCore(config: CoreConfig) {
    const user = initUsersLogic(config);
    const event = initEventsLogic(config);
    const secret = initSecretLogic(config);
    const hit = initHitsLogic(config);

    return {
        user,
        event,
        secret,
        hit,
    }
}

export type Core = Unpromised<ReturnType<typeof initializeCore>>
