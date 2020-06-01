import {Database} from "../db";


interface Config {
    readonly db: Database;
}

/**
 * Initializes events logic
 */
export function initEventsLogic(config: Config) {
    const {db} = config;

    /**
     * Register event hit
     */
    async function registerHit(eventKey: string, payload: string | undefined) {
        const event = await db.event.getByKey(eventKey);
        if (!event) throw new Error(`Event with key "${eventKey}" not found in database`);

        await db.hit.create(event.userId, event.id, {
            payload
        });
    }

    /**
     * Removes event of specified user
     */
    function remove(userId: string, id: string): Promise<void> {
        // TODO: Remove all associated hits too
        return db.event.remove(userId, id);
    }


    return {
        registerHit,
        create: db.event.create,
        edit: db.event.edit,
        list: db.event.list,
        get: db.event.get,
        remove,
    }
}

