/**
 * Returns promise that will be resolved at *ms* milliseconds
 * @param ms
 */
export const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve));
