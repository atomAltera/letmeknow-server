import {boolean, byDefault, ChainError, ChainOutput, check, shape, string} from "treat-like";

const requiredString = string.then(check(x => x.length > 0, "required"));
const optionalString = byDefault("").then(string);
const optionalBoolean = byDefault(false).then(boolean);

export type LoginFormInput = Partial<LoginFormOutput>;
export type LoginFormOutput = ChainOutput<typeof loginFormSchema>;
export type LoginFormErrors = ChainError<typeof loginFormSchema> | undefined;
export const loginFormSchema = shape({
    email: requiredString,
    password: requiredString,
    remember: optionalBoolean,
});



