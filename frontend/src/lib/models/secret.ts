import {boolean, ChainError, ChainOutput, shape} from "treat-like";
import {choices, intAsString, optionalBoolean, requiredString} from "../validators";

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
}

/**
 * Secret model
 */
export type Secret = TelegramSecret | EmailSecret;

/**
 * Schema to validate general Secret params
 */
export const baseSecretSchema = shape({
    name: requiredString,
    kind: choices<SecretKind>("telegram", "email")
})

/**
 * Schema to validate Telegram specified Secret params
 */
export const partTelegramSecretSchema = shape({
    botSecret: requiredString,
    chatId: requiredString,
});

/**
 * Schema to validate email specified Secret params
 */
export const partEmailSecretSchema = shape({
    host: requiredString,
    port: intAsString,
    username: requiredString,
    password: requiredString,
    useSSL: optionalBoolean,
    useTLS: optionalBoolean,
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
