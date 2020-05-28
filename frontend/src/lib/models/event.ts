/**
 * Event model
 */
export interface Event {
    id: string;
    createdAt: Date;
    userId: string;

    name: string;
    description: string;

    isActive: boolean;

    channels: {
        secretId: string;
        template: string;
        isActive: boolean;
    }[];
}
