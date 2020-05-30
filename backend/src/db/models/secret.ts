import {Db, ObjectId} from "mongodb";

import {Maybe} from "../../lib/helper-types";
import {fromMongoId, listFromCursor, toMongoId} from "../utils";

export type SecretKind = "telegram" | "email"

interface SchemeBase {
    _id: ObjectId;
    createdAt: Date;
    userId: ObjectId;

    name: string;
    kind: SecretKind,
}

interface TelegramScheme extends SchemeBase {
    kind: "telegram";

    botSecret: string;
    chatId: string;
}

interface EmailScheme extends SchemeBase {
    kind: "email";

    host: string;
    port: number;
    username: string;
    password: string;
    useSSL: boolean;
    useTLS: boolean;
}

type Scheme = TelegramScheme | EmailScheme;

interface SecretBase {
    id: string;
    createdAt: Date;
    userId: string;

    name: string;
    kind: SecretKind;
}

export interface TelegramSecret extends SecretBase {
    kind: "telegram";

    botSecret: string;
    chatId: string;
}

export interface EmailSecret extends SecretBase {
    kind: "email";

    host: string;
    port: number;
    username: string;
    password: string;
    useSSL: boolean;
    useTLS: boolean;
}

export type Secret = TelegramSecret | EmailSecret;

interface SecretBase_Form {
    name: string;
}

export interface TelegramSecret_Form extends SecretBase_Form {
    botSecret: string;
    chatId: string;
}

export interface EmailSecret_Form extends SecretBase_Form {
    host: string;
    port: number;
    username: string;
    password: string;
    useSSL: boolean;
    useTLS: boolean;
}


/**
 * Creates secret model adapter
 */
export async function createSecretAdapter(db: Db) {
    const collection = await db.createCollection<Scheme>("secrets");

    /**
     * Create telegram secret for specified user
     */
    async function createTelegram(userId: string, form: TelegramSecret_Form): Promise<Secret> {
        const doc: Scheme = {
            _id: new ObjectId(),
            createdAt: new Date(),
            userId: toMongoId(userId),

            name: form.name,
            kind: "telegram",

            botSecret: form.botSecret,
            chatId: form.chatId,
        }

        await collection.insertOne(doc);

        return fromDb(doc);
    }

    /**
     * Create email secret for specified user
     */
    async function createEmail(userId: string, form: EmailSecret_Form): Promise<Secret> {
        const doc: Scheme = {
            _id: new ObjectId(),
            createdAt: new Date(),
            userId: toMongoId(userId),

            name: form.name,
            kind: "email",

            host: form.host,
            port: form.port,
            username: form.username,
            password: form.password,
            useSSL: form.useSSL,
            useTLS: form.useTLS,
        }

        await collection.insertOne(doc);

        return fromDb(doc);
    }

    /**
     * Update telegram secret of specified user
     */
    async function editTelegram(userId: string, secretId: string, form: TelegramSecret_Form): Promise<void> {
        const filter = {
            _id: toMongoId(secretId),
            userId: toMongoId(userId),
        } as Scheme;

        const update = {
            $set: {
                name: form.name,
                kind: "telegram" as "telegram",

                botSecret: form.botSecret,
                chatId: form.chatId,
            }
        }

        await collection.updateOne(filter, update);
    }

    /**
     * Update email secret of specified user
     */
    async function editEmail(userId: string, secretId: string, form: EmailSecret_Form): Promise<void> {
        const filter = {
            _id: toMongoId(secretId),
            userId: toMongoId(userId),
        } as Scheme;

        const update = {
            $set: {
                name: form.name,
                kind: "email" as "email",

                host: form.host,
                port: form.port,
                username: form.username,
                password: form.password,
                useSSL: form.useSSL,
                useTLS: form.useTLS,
            }
        }

        await collection.updateOne(filter, update);
    }

    /**
     * List secrets of specified user
     */
    function list(userId: string): Promise<Secret[]> {
        const filter = {
            userId: toMongoId(userId)
        }

        const cursor = collection.find(filter).sort({name: 1});

        return listFromCursor(cursor, fromDb);
    }

    /**
     * Get secret by id
     */
    async function get(userId: string, secretId: string): Maybe<Secret> {
        const filter = {
            _id: toMongoId(secretId),
            userId: toMongoId(userId),
        }

        const doc = await collection.findOne(filter);

        return doc ? fromDb(doc) : undefined;
    }

    /**
     * Removes secret of specified user
     */
    async function remove(userId: string, secretId: string): Promise<void> {
        const filter = {
            _id: toMongoId(secretId),
            userId: toMongoId(userId)
        }

        await collection.deleteOne(filter)
    }

    /**
     * Removes all secrets of specified user
     */
    async function removeAll(userId: string): Promise<void> {
        const filter = {
            userId: toMongoId(userId)
        }

        await collection.deleteMany(filter)
    }

    return {
        createTelegram,
        createEmail,
        editTelegram,
        editEmail,
        list,
        get,
        remove,
        removeAll,
    }
}


function fromDb(doc: Scheme): Secret {
    const base: SecretBase = {
        id: fromMongoId(doc._id),
        createdAt: doc.createdAt,
        userId: fromMongoId(doc.userId),

        name: doc.name,
        kind: doc.kind,
    }

    switch (doc.kind) {
        case "telegram":
            return {
                ...base,
                kind: "telegram",

                botSecret: doc.botSecret,
                chatId: doc.chatId,
            };

        case "email":
            return {
                ...base,
                kind: "email",

                host: doc.host,
                port: doc.port,
                username: doc.username,
                password: doc.password,
                useSSL: doc.useSSL,
                useTLS: doc.useTLS,
            };
    }
}


