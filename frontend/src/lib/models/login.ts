import {ChainError, ChainOutput, shape} from "treat-like";
import {optionalBoolean, requiredString} from "../validators";

/**
 * Schema to validate login form
 */
export const loginSchema = shape({
    email: requiredString,
    password: requiredString,
    remember: optionalBoolean,
});

/**
 * Login form types
 */
export type Login_Form = ChainOutput<typeof loginSchema>;
export type Login_Errors = ChainError<typeof loginSchema> | undefined;


