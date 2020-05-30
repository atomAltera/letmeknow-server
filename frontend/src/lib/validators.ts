import {
    boolean,
    byDefault, Chain,
    check,
    createContinueResult,
    createErrorResult, number,
    Result,
    Step,
    string,
    treat
} from "treat-like";

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

type Predicate<T> = (value: T) => boolean;

export const cond = <I, CO1, CO2, SO1, SO2, E1, E2>(
    pred: Predicate<I>,
    stepTrue: Step<I, CO1, SO1, E1>,
    stepFalse: Step<I, CO2, SO2, E2>
): Chain<I, CO1 | CO2, SO1 | SO2, E1 | E2>  => treat((value: I): Result<CO1 | CO2, SO1 | SO2, E1 | E2> => {
    if (pred(value)) {
        return stepTrue(value)
    } else {
        return stepFalse(value)
    }
})
