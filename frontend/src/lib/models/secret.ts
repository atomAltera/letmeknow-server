import {boolean, ChainError, ChainOutput, number, shape} from "treat-like";
import {choices, requiredString} from "../validators";

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
export const baseSecretCreateSchema = shape({
    name: requiredString,
    kind: choices<SecretKind>("telegram", "email")
})

/**
 * Schema to validate Telegram specified Secret params
 */
export const partTelegramSecretCreateSchema = shape({
    botSecret: requiredString,
    chatId: requiredString,
});

/**
 * Schema to validate email specified Secret params
 */
export const partEmailSecretCreateSchema = shape({
    host: requiredString,
    port: number,
    username: requiredString,
    password: requiredString,
    useSSL: boolean,
    useTLS: boolean,
});

/**
 * Telegram specified Secret form types
 */
export type TelegramSecret_CreateForm =
    ChainOutput<typeof baseSecretCreateSchema>
    & ChainOutput<typeof partTelegramSecretCreateSchema>;
export type TelegramSecret_CreateErrors =
    (ChainError<typeof baseSecretCreateSchema> & ChainError<typeof partTelegramSecretCreateSchema>)
    | undefined;

/**
 * Email specified Secret form types
 */
export type EmailSecret_CreateForm =
    ChainOutput<typeof baseSecretCreateSchema>
    & ChainOutput<typeof partEmailSecretCreateSchema>;
export type EmailSecret_CreateErrors =
    (ChainError<typeof baseSecretCreateSchema> & ChainError<typeof partEmailSecretCreateSchema>)
    | undefined;

/**
 * United Secret form types
 */
export type Secret_CreateForm = TelegramSecret_CreateForm & EmailSecret_CreateForm;
export type Secret_CreateErrors = TelegramSecret_CreateErrors & EmailSecret_CreateErrors;
