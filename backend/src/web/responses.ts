import {Response} from "express";


/**
 *  Sends "unknown error" response
 */
export function responseWithUnknownError(res: Response) {
    res.status(500).json({
        error: "unknown",
    })
}

/**
 *  Sends "validation error" response with validation details
 */
export function responseWithValidationError(res: Response, error: any) {
    res.status(422).json({
        error: "validation",
        details: error,
    })
}

/**
 *  Sends "invalid credentials" response
 */
export function responseWithAuthError(res: Response) {
    res.status(401).json({
        error: "invalid credentials",
    })
}

/**
 *  Sends "not authorized" response
 */
export function responseWithAccessError(res: Response) {
    res.status(403).json({
        error: "not authenticated",
    })
}

