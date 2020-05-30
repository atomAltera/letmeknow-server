import {useEffect, useState} from "react";
import {getCurrentUser, getSecret, listEvents, listSecrets} from "./api-client";

// type Unpromised<P> = P extends Promise<infer T> ? T : P;

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

interface HookOptions<R, D> {
    nonce?: number;
    def: D;
    onLoad?: (value: R) => void
}

export function createApiHookMethod<A extends any[], R extends any>(func: (...args: A) => Promise<R>) {
    return function useApiMethod<D>(options: HookOptions<R, D>, ...args: A): HookResult<R, D> {
        const [loading, setLoading] = useState(true);
        const [result, setResult] = useState<R | D>(options.def);
        const [error, setError] = useState<string>();

        useEffect(() => {
            func(...args)
                .then(result => {
                    setResult(result);
                    options.onLoad && options.onLoad(result);
                })
                .catch(setError)
                .finally(() => setLoading(false))

        }, [options.nonce,])

        return {
            loading,
            result,
            error,
        } as HookResult<R, D>
    }
}


export const useCurrentUser = createApiHookMethod(getCurrentUser);

export const useSecretsList = createApiHookMethod(listSecrets);
export const useSecret = createApiHookMethod(getSecret);

export const useEventsList = createApiHookMethod(listEvents);
