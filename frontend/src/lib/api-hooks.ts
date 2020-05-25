import {useEffect, useState} from "react";
import {getCurrentUser} from "./api-client";

type Unpromised<P> = P extends Promise<infer T> ? T : P;

interface HookLoading {
    loading: true;
    error: undefined;
    result: undefined;
}

interface HookLoaded<T> {
    loading: false;
    error: undefined;
    result: T;
}

interface HookError {
    loading: false;
    error: string;
    result: undefined;
}

type HookResult<T> = HookLoading | HookLoaded<T> | HookError;


export function createApiHookMethod<A extends any[], R extends any>(func: (...args: A) => R) {
    return function useApiMethod(nonce: number, ...args: A): HookResult<Unpromised<R>> {
        const [loading, setLoading] = useState(true);
        const [result, setResult] = useState<Unpromised<R>>();
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
        } as HookResult<Unpromised<R>>
    }
}


export const useCurrentUser = createApiHookMethod(getCurrentUser);
