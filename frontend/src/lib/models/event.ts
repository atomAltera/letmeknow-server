import {array, boolean, byDefault, ChainError, ChainOutput, check, shape} from "treat-like";
import {eventKeySchema, optionalString, requiredString, systemIdSchema} from "../validators";

/**
 * Channel sub model
 */
export interface Channel {
    secretId: string;
    template: string;
    isActive: boolean;
}

/**
 * Event model
 */
export interface Event {
    id: string;
    createdAt: Date;
    userId: string;

    key: string;
    name: string;
    icon: string;
    description: string;

    isActive: boolean;

    channels: Channel[];
}

/**
 * Schema to validation Channel params
 */
export const channelSchema = shape({
    secretId: systemIdSchema,
    template: requiredString,
    isActive: byDefault(true).then(boolean),
})

/**
 * Schema to validate Event params
 */
export const eventSchema = shape({
    key: requiredString.then(eventKeySchema),
    name: requiredString,
    icon: optionalString,
    description: optionalString,

    isActive: byDefault(true).then(boolean),

    channels: array(channelSchema).then(check(list => list.length > 0, "no_channels_provided")),
})

/**
 * Channel form types
 */
export type Channel_Form = ChainOutput<typeof channelSchema>;
export type Channel_Errors = ChainError<typeof channelSchema> | undefined;

/**
 * Event form types
 */
export type Event_Form = ChainOutput<typeof eventSchema>;
export type Event_Errors = ChainError<typeof eventSchema> | undefined;
export type Event_PartialForm = Partial<Omit<Event_Form, "channels">> & {channels?: Partial<Channel_Form>}
