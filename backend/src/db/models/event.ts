import {Db, ObjectId} from "mongodb";

import {Maybe} from "../../lib/helper-types";
import {fromMongoId, listFromCursor, toMongoId} from "../utils";

interface Scheme {
    _id: ObjectId;
    createdAt: Date;
    userId: ObjectId;

    name: string;
    description: string;

    isActive: boolean;
}

export interface Event {
    id: string;
    createdAt: Date;
    userId: string;

    name: string;
    description: string;

    isActive: boolean;
}

export interface Event_CreateForm {
    name: string;
    description: string;

    isActive: boolean;
}

export type Event_UpdateForm = Event_CreateForm;


/**
 * Creates event model adapter
 */
export async function createEventAdapter(db: Db) {
    const collection = await db.createCollection<Scheme>("events");

    /**
     * Create event for specified user
     */
    async function create(userId: string, form: Event_CreateForm): Promise<Event> {
        const doc: Scheme = {
            _id: new ObjectId(),
            createdAt: new Date(),
            userId: toMongoId(userId),

            name: form.name,
            description: form.description,

            isActive: form.isActive,
        }

        await collection.insertOne(doc);

        return fromDb(doc);
    }

    /**
     * Update event of specified user
     */
    async function edit(userId: string, id: string, form: Event_UpdateForm): Promise<void> {
        const filter = {
            _id: toMongoId(id),
            userId: toMongoId(userId)
        }

        const update = {
            $set: {
                name: form.name,
                description: form.description,

                isActive: form.isActive,
            }
        }

        await collection.updateOne(filter, update);
    }

    /**
     * List events of specified user
     */
    function list(userId: string): Promise<Event[]> {
        const filter = {
            userId: toMongoId(userId)
        }

        const cursor = collection.find(filter).sort({createdAt: -1});

        return listFromCursor(cursor, fromDb);
    }

    /**
     * Get event by id
     */
    async function get(id: string): Maybe<Event> {
        const filter = {
            _id: toMongoId(id)
        }

        const doc = await collection.findOne(filter);

        return doc ? fromDb(doc) : undefined;
    }

    /**
     * Removes event of specified user
     */
    async function remove(userId: string, id: string): Promise<void> {
        const filter = {
            _id: toMongoId(id),
            userId: toMongoId(userId)
        }

        await collection.deleteOne(filter)
    }

    /**
     * Removes all events of specified user
     */
    async function removeAll(userId: string): Promise<void> {
        const filter = {
            userId: toMongoId(userId)
        }

        await collection.deleteMany(filter)
    }

    return {
        create,
        edit,
        list,
        get,
        remove,
        removeAll,
    }
}


function fromDb(doc: Scheme): Event {
    return {
        id: fromMongoId(doc._id),
        createdAt: doc.createdAt,
        userId: fromMongoId(doc.userId),

        name: doc.name,
        description: doc.description,

        isActive: doc.isActive,
    }
}


