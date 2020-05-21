import {Db, ObjectId} from "mongodb";
import * as crypto from "crypto";

import {Maybe} from "../../lib/helper-types";
import {ensureIndex, fromMongoId, randomKey, toMongoId} from "../utils";

interface Scheme {
    _id: ObjectId;
    createdAt: Date;

    email: string;

    passwordDigest: string;
    passwordSalt: string;
}

export interface User {
    id: string;
    createdAt: Date;

    email: string;
}

export interface User_CreateForm {
    email: string;
    password: string;
}

export type User_UpdateForm = User_CreateForm;


/**
 * Creates user model adapter
 */
export async function createUserAdapter(db: Db) {
    const collection = await db.createCollection<Scheme>("users");

    // Create required indexes
    await ensureIndex(collection, "email", {unique: true});

    /**
     * Creates new user
     */
    async function create(form: User_CreateForm): Promise<User> {
        const passwordSalt = randomKey();
        const passwordDigest = createPasswordDigest(passwordSalt, form.password);

        const doc: Scheme = {
            _id: new ObjectId(),
            createdAt: new Date(),

            email: form.email,

            passwordSalt,
            passwordDigest
        }

        await collection.insertOne(doc);

        return fromDb(doc);
    }

    /**
     * Takes email and password and returns appropriate user
     */
    async function authenticate(email: string, password: string): Maybe<User> {
        const filter = {
            email
        }

        const doc = await collection.findOne(filter);

        if (!doc) return;

        const passwordDigest = createPasswordDigest(doc.passwordSalt, password);

        if (passwordDigest !== doc.passwordDigest) return;

        return fromDb(doc);
    }

    /**
     * Get user by id
     */
    async function get(id: string): Maybe<User> {
        const filter = {
            _id: toMongoId(id)
        }

        const doc = await collection.findOne(filter);

        if (!doc) return;

        return fromDb(doc);
    }


    return {
        create,
        authenticate,
        get,
    }
}


function fromDb(doc: Scheme): User {
    return {
        id: fromMongoId(doc._id),
        createdAt: doc.createdAt,

        email: doc.email
    }
}

/**
 * Creates password digest from raw password and salt
 */
function createPasswordDigest(salt: string, password: string): string {
    const h1 = crypto.createHash("sha512")
    const h2 = crypto.createHash("sha512")
    const h3 = crypto.createHash("sha512")

    h1.update(salt);
    h2.update(password);

    h3.update(h1.digest("hex"));
    h3.update(h2.digest("hex"));

    return h3.digest("hex");
}


