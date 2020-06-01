import {
    array,
    boolean,
    byDefault,
    Chain,
    check,
    createContinueResult,
    createErrorResult,
    number,
    shape,
    string,
    treat
} from "treat-like";
import {ValidationError} from "./errors";
import {SecretKind} from "../db/models/secret";

const requiredString = string.then(check(x => x.length > 0, "required"));
const optionalString = byDefault("").then(string);

const choices = <T extends any>(...args: T[]) => treat((value: T) => {
    if (args.includes(value)) {
        return createContinueResult(value);
    } else {
        return createErrorResult("invalid_choice");
    }
})

export function validateBy<CO, SO>(input: unknown, schema: Chain<any, CO, SO, any>, error?: Error): CO | SO {
    const report = schema(input);

    if (report.ok) return report.output;

    throw error || new ValidationError(report.error);
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
    remember: byDefault(false).then(boolean),
});

export const registrationSchema = shape({
    email: requiredString,
    password: requiredString,
});

export const channelSchema = shape({
    secretId: systemIdSchema,
    template: requiredString,
    isActive: byDefault(true).then(boolean),
});

export const eventSchema = shape({
    key: requiredString,
    name: requiredString,
    description: optionalString,

    isActive: byDefault(true).then(boolean),

    channels: array(channelSchema),
});

export const baseSecretSchema = shape({
    kind: choices<SecretKind>("telegram", "email")
})

export const partTelegramSecretSchema = shape({
    name: requiredString,

    botSecret: requiredString,
    chatId: requiredString,
});

export const partEmailSecretSchema = shape({
    name: requiredString,

    host: requiredString,
    port: number,
    username: requiredString,
    password: requiredString,
    useSSL: byDefault(false).then(boolean),
    useTLS: byDefault(false).then(boolean),
});
