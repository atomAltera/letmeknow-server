
export type Maybe<T> = Promise<T | undefined>;

export type Unpromised<T> = T extends PromiseLike<infer V> ? V : T;

