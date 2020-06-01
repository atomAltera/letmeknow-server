import {useEffect, useState} from "react";
import {getCurrentUser, getEvent, getSecret, listEvents, listSecrets} from "./api-client";

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

/**
 * Takes async function and return hook for it
 */
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

// Auth
export const useCurrentUser = createApiHookMethod(getCurrentUser);

// Events
export const useEventsList = createApiHookMethod(listEvents);
export const useEvent = createApiHookMethod(getEvent);

// Secrets
export const useSecretsList = createApiHookMethod(listSecrets);
export const useSecret = createApiHookMethod(getSecret);


