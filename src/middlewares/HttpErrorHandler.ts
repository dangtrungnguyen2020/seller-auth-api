import { ExpressErrorMiddlewareInterface, Middleware } from "routing-controllers";
import { Service } from "typedi";

@Service()
@Middleware({ type: 'after' })
export class HttpErrorHandler implements ExpressErrorMiddlewareInterface {
    error(err: any, req: any, res: any, next: (err: any) => any) {
        return res.status(err.httpCode || 500).send({
            message: err.message || 'Internal Server Error'
        });
    }
}