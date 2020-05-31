/**
 * Denotes data validation error. Holds validation errors in *details* field
 */
export class ValidationError extends Error {
    public readonly details: any;

    constructor(errors: any) {
        super("invalid entity type");
        this.details = errors
    }
}

/**
 * Denotes authentication error.
 * Invalid credentials or inactive user.
 */
export class AuthError extends Error {
    constructor() {
        super("user is not authenticated");
    }
}

/**
 * Denotes not authorized error.
 * Use is not logged in or has no permissions to perform action.
 */
export class AccessError extends Error {
    constructor() {
        super("user is not authorized");
    }
}

/**
 * Regular not found error
 */
export class NotFoundError extends Error {
    constructor() {
        super("requested resource was not found");
    }
}

export const notFoundError = new NotFoundError();
