import {boolean, byDefault, check, createContinueResult, createErrorResult, string, treat} from "treat-like";

export * from "treat-like";

export const requiredString = string.then(check(x => x.length > 0, "required"));
export const optionalString = byDefault("").then(string);
export const optionalBoolean = byDefault(false).then(boolean);
export const intAsString = string
    .then(x => createContinueResult(parseInt(x)))
    .then(check(x => !isNaN(x), "not_a_number"))

export const choices = <T extends any>(...args: T[]) => treat((value: T) => {
    if (args.includes(value)) {
        return createContinueResult(value);
    } else {
        return createErrorResult("invalid_choice");
    }
})

export const systemIdSchema = requiredString.then(value => {
    if (value.match(/^[a-f0-9]{24}$/i)) {
        return createContinueResult(value);
    } else {
        return createErrorResult("not_valid_id");
    }
})
