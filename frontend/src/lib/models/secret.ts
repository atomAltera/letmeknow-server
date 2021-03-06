import {ChainError, ChainOutput, check, number, shape} from "treat-like";
import {choices, optionalBoolean, requiredString} from "../validators";

/**
 * Represents secret kind
 */
export type SecretKind = "telegram" | "email"

/**
 * Secret model base
 */
export interface SecretBase {
    id: string;
    createdAt: Date;
    userId: string;

    name: string;
    kind: SecretKind;
}

/**
 * Email secret
 */
export interface TelegramSecret extends SecretBase {
    kind: "telegram";

    botSecret: string;
    chatId: string;
}

/**
 * Email secret
 */
export interface EmailSecret extends SecretBase {
    kind: "email";

    host: string;
    port: number;
    username: string;
    password: string;
    useSSL: boolean;
    useTLS: boolean;
    mailFrom: string,
    mailTo: string,
}

/**
 * Secret model
 */
export type Secret = TelegramSecret | EmailSecret;

/**
 * Schema to validate general Secret params
 */
export const baseSecretSchema = shape({
    kind: choices<SecretKind>("telegram", "email")
})

/**
 * Schema to validate Telegram specified Secret params
 */
export const partTelegramSecretSchema = shape({
    name: requiredString,

    botSecret: requiredString,
    chatId: requiredString,
});

/**
 * Schema to validate email specified Secret params
 */
export const partEmailSecretSchema = shape({
    name: requiredString,

    host: requiredString,
    port: number.then(check(x => x > 0 && x < 65536, "invalid_port_number")),
    username: requiredString,
    password: requiredString,
    useSSL: optionalBoolean,
    useTLS: optionalBoolean,
    mailFrom: requiredString,
    mailTo: requiredString,
});

/**
 * Telegram specified Secret form types
 */
export type TelegramSecret_Form =
    ChainOutput<typeof baseSecretSchema>
    & ChainOutput<typeof partTelegramSecretSchema>;

export type TelegramSecret_Errors =
    (ChainError<typeof baseSecretSchema> & ChainError<typeof partTelegramSecretSchema>)
    | undefined;

/**
 * Email specified Secret form types
 */
export type EmailSecret_Form =
    ChainOutput<typeof baseSecretSchema>
    & ChainOutput<typeof partEmailSecretSchema>;

export type EmailSecret_Errors =
    (ChainError<typeof baseSecretSchema> & ChainError<typeof partEmailSecretSchema>)
    | undefined;

/**
 * United Secret form types
 */
export type Secret_Form = TelegramSecret_Form & EmailSecret_Form;
export type Secret_Errors = TelegramSecret_Errors & EmailSecret_Errors;
