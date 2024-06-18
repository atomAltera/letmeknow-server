import {Database} from "../db";
import {secondsAgo} from "../lib/dates";
import {Hit} from "../db/models/hit";
import {Secret} from "../db/models/secret";
import {sendNotification} from "./notificator";


interface Config {
    readonly db: Database;
    readonly maxAttemptCount: number;
    readonly attemptTimeoutInSeconds: number;
}


/**
 * Initializes secrets logic
 */
export function initHitsLogic(config: Config) {
    const {db} = config;

    /**
     * Takes single hit and process it
     */
    async function processHit(hit: Hit): Promise<void> {
        const event = await db.event.get(hit.userId, hit.eventId);

        if (!event) throw new Error(`Event with id ${hit.eventId} did not found for user ${hit.userId}`);

        if (!event.isActive) return;

        const globalVars: any = {
            hit,
        };

        await Promise.all(
            event.channels.map(async channel => {
                if (!channel.isActive) return;

                const secret = await db.secret.get(event.userId, channel.secretId);

                if (!secret) throw new Error(`Secret with id ${channel.secretId} did not found for event ${event.id}`);

                await sendNotification(
                    secret,
                    event.name,
                    channel.template,
                    hit.payload,
                    globalVars
                );
            })
        );
    }

    /**
     * Perform hits processing actions
     */
    async function process() {
        const lastAttemptThreshold = secondsAgo(new Date(), config.attemptTimeoutInSeconds);

        const list = await db.hit.listPending(lastAttemptThreshold, config.maxAttemptCount);

        await Promise.all(
            list.map(async hit => {
                try {
                    await processHit(hit);

                    await db.hit.markProcessed(hit.id)
                } catch (e) {
                    await db.hit.markFailed(hit.id, e.message)
                }
            })
        );
    }

    return {
        process,
        cleanUp: db.hit.cleanUp,
    }
}

