import {Db, ObjectId} from "mongodb";
import {fromMongoId, listFromCursor, toMongoId} from "../utils";

interface Scheme {
    _id: ObjectId;
    createdAt: Date;
    userId: ObjectId;
    eventId: ObjectId;

    payload?: string;

    processedAt?: Date;
}

export interface Hit {
    id: string;
    createdAt: Date;
    userId: string;
    eventId: string;

    payload?: string;

    processedAt?: Date;
}

export interface Hit_Form {
    payload?: string;
}


/**
 * Creates hit model adapter
 */
export async function createHitAdapter(db: Db) {
    const collection = await db.createCollection<Scheme>("hits");

    /**
     * Create hit for specified event and user
     */
    async function create(userId: string, eventId: string, form: Hit_Form): Promise<Hit> {
        const doc: Scheme = {
            _id: new ObjectId(),
            createdAt: new Date(),
            userId: toMongoId(userId),
            eventId: toMongoId(eventId),

            payload: form.payload,

            processedAt: undefined,
        }

        await collection.insertOne(doc);

        return fromDb(doc);
    }

    /**
     * List hits of specified user and event
     */
    function list(userId: string, eventId: string): Promise<Hit[]> {
        const filter = {
            userId: toMongoId(userId),
            eventId: toMongoId(eventId),
        }

        const cursor = collection.find(filter).sort({createdAt: -1});

        return listFromCursor(cursor, fromDb);
    }

    /**
     * Removes all hits of specified user
     */
    async function removeAll(userId: string): Promise<void> {
        const filter = {
            userId: toMongoId(userId)
        }

        await collection.deleteMany(filter)
    }

    return {
        create,
        list,
        removeAll,
    }
}


function fromDb(doc: Scheme): Hit {
    return {
        id: fromMongoId(doc._id),
        createdAt: doc.createdAt,
        userId: fromMongoId(doc.userId),
        eventId: fromMongoId(doc.eventId),

        payload: doc.payload,

        processedAt: doc.processedAt,
    }
}


