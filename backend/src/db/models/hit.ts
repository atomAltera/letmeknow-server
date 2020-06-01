import {Db, ObjectId} from "mongodb";
import {fromMongoId, listFromCursor, toMongoId} from "../utils";

interface Scheme {
    _id: ObjectId;
    createdAt: Date;
    userId: ObjectId;
    eventId: ObjectId;

    payload?: string;

    lastProcessAttemptAt?: Date;
    failedAttemptsCount: number;
    errors: {message: string, date: Date}[];

    processedAt?: Date;
}

export interface Hit {
    id: string;
    createdAt: Date;
    userId: string;
    eventId: string;

    payload?: string;

    lastProcessAttemptAt?: Date;
    failedAttemptsCount: number;
    errors: {message: string, date: Date}[];

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

            lastProcessAttemptAt: undefined,
            failedAttemptsCount: 0,
            errors: [],

            processedAt: undefined,
        }

        await collection.insertOne(doc);

        return fromDb(doc);
    }

    /**
     * List hits that are to be processed
     */
    function listPending(lastAttemptThreshold: Date, maxFailedAttempts: number): Promise<Hit[]> {
        const filter = {
            $or: [
                {lastProcessAttemptAt: undefined},
                {lastProcessAttemptAt: {$lte: lastAttemptThreshold}},
            ],
            processedAt: undefined,
            failedAttemptsCount: {$lt: maxFailedAttempts},
        }

        const cursor = collection.find(filter).sort({createdAt: -1});

        return listFromCursor(cursor, fromDb);
    }

    /**
     * Marks hist as processed
     */
    async function markProcessed(hitId: string): Promise<void> {
        const filter = {
            _id: toMongoId(hitId)
        }

        const update = {
            $set: {
                processedAt: new Date(),
            }
        }

        await collection.updateOne(filter, update);
    }

    /**
     * Harks hit as failed
     */
    async function markFailed(hitId: string, error: string): Promise<void> {
        const now = new Date();

        const filter = {
            _id: toMongoId(hitId)
        }

        const update = {
            $inc: {failedAttemptsCount: 1},
            $set: {lastProcessAttemptAt: now},
            $push: {errors: {message: error, date: now}}
        }

        await collection.updateOne(filter, update);
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
        listPending,
        markProcessed,
        markFailed,
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

        lastProcessAttemptAt: doc.lastProcessAttemptAt,
        failedAttemptsCount: doc.failedAttemptsCount,
        errors: doc.errors,

        processedAt: doc.processedAt,
    }
}


