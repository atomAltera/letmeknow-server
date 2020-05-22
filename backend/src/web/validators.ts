import {boolean, byDefault, Chain, createContinueResult, treat, array, number, createErrorResult, required, shape, string} from "treat-like";
import {ValidationError} from "./errors";
import {SecretKind} from "../db/models/secret";

const requiredString = required.then(string);
const optionalString = byDefault("").then(string);
const requiredNumber = required.then(number);

const choices = <T extends any>(...args: T[]) => treat((value: T) => {
    if (args.includes(value)) {
        return createContinueResult(value);
    } else {
        return createErrorResult("invalid_value");
    }
})

export function validateBy<CO, SO>(input: unknown, schema: Chain<any, CO, SO, any>): CO | SO {
    const report = schema(input);

    if (report.ok) return report.output;

    throw new ValidationError(report.error);
}

export const systemIdSchema = requiredString.then(value => {
    if (value.match(/^[a-f0-9]{24}$/i)) {
        return createContinueResult(value);
    } else {
        return createErrorResult("not_valid_id");
    }
})

export const loginSchema = shape({
    email: requiredString,
    password: requiredString,
});

export const registrationSchema = shape({
    email: requiredString,
    password: requiredString,
});

export const channelCreateSchema = shape({
    secretId: systemIdSchema,
    template: requiredString,
    isActive: byDefault(true).then(boolean),
});

export const eventCreateSchema = shape({
    name: requiredString,
    description: optionalString,

    isActive: byDefault(true).then(boolean),

    channels: array(channelCreateSchema),
});

export const baseSecretCreateSchema = shape({
    name: requiredString,
    kind: choices<SecretKind>("telegram", "email")
})

export const partTelegramSecretCreateSchema = shape({
    botSecret: requiredString,
    chatId: requiredString,
});

export const partEmailSecretCreateSchema = shape({
    host: requiredString,
    port: requiredNumber,
    username: requiredString,
    password: requiredString,
    useSSL: boolean,
    useTLS: boolean,
});
