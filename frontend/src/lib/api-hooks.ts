import {useEffect, useState} from "react";
import {getCurrentUser, listEvents, listSecrets} from "./api-client";

type Unpromised<P> = P extends Promise<infer T> ? T : P;

interface HookLoading<T> {
    loading: true;
    error: undefined;
    result: T;
}

interface HookLoaded<T> {
    loading: false;
    error: undefined;
    result: T;
}

interface HookError<T> {
    loading: false;
    error: string;
    result: T;
}

type HookResult<T, D> = HookLoading<D> | HookLoaded<T> | HookError<D>;


export function createApiHookMethod<A extends any[], R extends any>(func: (...args: A) => R) {
    return function useApiMethod<D>(nonce: number, def: D, ...args: A): HookResult<Unpromised<R>, D> {
        const [loading, setLoading] = useState(true);
        const [result, setResult] = useState<Unpromised<R> | D>(def);
        const [error, setError] = useState<string>();

        useEffect(() => {
            func(...args)
                .then(setResult)
                .catch(setError)
                .finally(() => setLoading(false))

        }, [nonce,])

        return {
            loading,
            result,
            error,
        } as HookResult<Unpromised<R>, D>
    }
}


export const useCurrentUser = createApiHookMethod(getCurrentUser);

export const useSecretsList = createApiHookMethod(listSecrets);

export const useEventsList = createApiHookMethod(listEvents);
