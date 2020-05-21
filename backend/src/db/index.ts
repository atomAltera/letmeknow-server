import {connect} from "mongodb"

import {Unpromised} from "../lib/helper-types";
import {createUserAdapter} from "./models/user";
import {createEventAdapter} from "./models/event";
import {createHitAdapter} from "./models/hit";
import {createSecretAdapter} from "./models/secret";

interface DatabaseConfig {
    readonly uri: string;
}

/**
 * Creates database adapter
 * @param config
 */
export async function connectToDatabase(config: DatabaseConfig) {
    const client = await connect(config.uri, {useNewUrlParser: true, useUnifiedTopology: true});

    const db = client.db();

    const user = await createUserAdapter(db);
    const event = await createEventAdapter(db);
    const hit = await createHitAdapter(db);
    const secret = await createSecretAdapter(db);

    return {
        user,
        event,
        hit,
        secret,
    }
}

export type Database = Unpromised<ReturnType<typeof connectToDatabase>>

export * from "./models/user";
