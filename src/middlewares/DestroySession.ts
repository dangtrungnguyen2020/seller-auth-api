import { ExpressMiddlewareInterface, InternalServerError } from "routing-controllers";
import { Service } from "typedi";

@Service()
export class DestroySession implements ExpressMiddlewareInterface {
    use(req: any, res: any, next: (err?: any) => any): any {
        req.session.destroy((err: any) => {
            if (err) next(new InternalServerError("Internal Error"));
            next();
        });
    }
}