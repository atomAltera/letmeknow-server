import {Database} from "../db";


/**
 * Initializes events logic
 */
export function initEventsLogic(db: Database) {

    /**
     * Register event hit
     */
    async function registerHit(eventId: string, payload: string | undefined) {
        const event = await db.event.get(eventId);
        if (!event) throw new Error(`Event with id "${eventId}" not found in database`);

        await db.hit.create(event.userId, event.id, {
            payload
        });
    }

    /**
     * Removes event of specified user
     */
    function remove(userId: string, id: string): Promise<void> {
        // TODO: Remove all associated objects too
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

