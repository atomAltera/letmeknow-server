import {AggregationCursor, Collection, Cursor, IndexOptions, ObjectId} from "mongodb";

/**
 * Converts mongo id to hex string
 * @param id
 */
export function fromMongoId(id: ObjectId): string {
    return id.toHexString();
}

/**
 * Converts hex string to mongo id if possible
 */
export function toMongoId(id: string): ObjectId {
    return new ObjectId(id);
}

/**
 * Generates random key
 */
export function randomKey(): string {
    return fromMongoId(new ObjectId())
}

/**
 * Ensures if specified index exits on *collection*. If not, creates it
 */
export function ensureIndex<S>(collection: Collection<S>, fields: keyof S | Partial<{ [name in keyof S]: number }>, options?: IndexOptions): Promise<void> {
    return collection.createIndex(fields, options).then(() => undefined)
}

/**
 * Takes cursor and reads list from it.
 * Applies serializing function to each item.
 */
export async function listFromCursor<S, M>(cursor: Cursor<S>, serializer: (doc: S) => M) {
    const list = await cursor.toArray();
    return list.map(serializer);
}

/**
 * Takes cursor and creates async iterator.
 * Applies serializing function to each item.
 */
export function iteratorFromCursor<S, M>(cursor: Cursor<S> | AggregationCursor<S>, serializer: (s: S) => M): AsyncIterable<M> {
    return {
        [Symbol.asyncIterator]: () => ({
            async next() {
                const hasNext = await cursor.hasNext();
                const doc = hasNext ? await cursor.next() : undefined;

                return {
                    value: (doc && serializer(doc))!,
                    done: !hasNext,
                }
            }
        })
    }
}
