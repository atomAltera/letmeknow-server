import {NextFunction, Request, RequestHandler, Response} from "express";

/**
 * Async controller wrapper for error handling end json reposing
 * @param controller
 */
export function h(controller: RequestHandler<any>): RequestHandler {
    return async function (req: Request, res: Response, next: NextFunction) {
        try {
            const data = await controller(req, res, next);

            if (data && (typeof data === "object")) {
                res.json(data);
            } else {
                res.end();
            }

        } catch (e) {
            next(e)
        }
    }
}
