import {Db, ObjectId} from "mongodb";

import {Maybe} from "../../lib/helper-types";
import {ensureIndex, fromMongoId, listFromCursor, toMongoId} from "../utils";

interface Scheme {
    _id: ObjectId;
    createdAt: Date;
    userId: ObjectId;

    key: string;
    name: string;
    description: string;

    isActive: boolean;

    channels?: {
        secretId: ObjectId;
        template: string;
        isActive: boolean;
    }[];
}

export interface Event {
    id: string;
    createdAt: Date;
    userId: string;

    key: string;
    name: string;
    description: string;

    isActive: boolean;

    channels: {
        secretId: string;
        template: string;
        isActive: boolean;
    }[];
}

export interface Event_Form {
    key: string;
    name: string;
    description: string;

    isActive: boolean;

    channels: {
        secretId: string;
        template: string;
        isActive: boolean;
    }[];
}


/**
 * Creates event model adapter
 */
export async function createEventAdapter(db: Db) {
    const collection = await db.createCollection<Scheme>("events");

    await ensureIndex(collection, {key: 1}, {unique: true})

    /**
     * Create event for specified user
     */
    async function create(userId: string, form: Event_Form): Promise<Event> {
        const doc: Scheme = {
            _id: new ObjectId(),
            createdAt: new Date(),
            userId: toMongoId(userId),

            key: form.key,
            name: form.name,
            description: form.description,

            isActive: form.isActive,

            channels: form.channels.map(c => ({
                secretId: toMongoId(c.secretId),
                template: c.template,
                isActive: c.isActive,
            }))
        }

        await collection.insertOne(doc);

        return fromDb(doc);
    }

    /**
     * Update event of specified user
     */
    async function edit(userId: string, id: string, form: Event_Form): Promise<void> {
        const filter = {
            _id: toMongoId(id),
            userId: toMongoId(userId)
        }

        const update = {
            $set: {
                key: form.key,
                name: form.name,
                description: form.description,

                isActive: form.isActive,

                channels: form.channels.map(c => ({
                    secretId: toMongoId(c.secretId),
                    template: c.template,
                    isActive: c.isActive,
                }))
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
     * Get event of specified user by id
     */
    async function get(userId: string, eventId: string): Maybe<Event> {
        const filter = {
            _id: toMongoId(eventId)
        }

        const doc = await collection.findOne(filter);

        return doc ? fromDb(doc) : undefined;
    }

    /**
     * Get event by key
     */
    async function getByKey(key: string): Maybe<Event> {
        const filter = {
            key,
        }

        const doc = await collection.findOne(filter);

        return doc ? fromDb(doc) : undefined;
    }

    /**
     * Removes event of specified user
     */
    async function remove(userId: string, secretId: string): Promise<void> {
        const filter = {
            _id: toMongoId(secretId),
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
        getByKey,
        remove,
        removeAll,
    }
}


function fromDb(doc: Scheme): Event {
    return {
        id: fromMongoId(doc._id),
        createdAt: doc.createdAt,
        userId: fromMongoId(doc.userId),

        key: doc.key,
        name: doc.name,
        description: doc.description,

        isActive: doc.isActive,

        channels: (doc.channels ?? []).map(c => ({
            secretId: fromMongoId(c.secretId),
            template: c.template,
            isActive: c.isActive,
        }))
    }
}


