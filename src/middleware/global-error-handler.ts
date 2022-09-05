import { ExpressErrorMiddlewareInterface, Middleware } from "routing-controllers";

@Middleware({ type: "after" })
export class GlobalErrorHandler implements ExpressErrorMiddlewareInterface {
	error(err: any, req: any, res: any, next: () => any) {
    res.status(err.statusCode || err.httpCode).json(err);
		next();
	}
}