import { Request, Response, Router } from "express";
import { AuthMiddleware } from '../middleware/index';

class OperatorRouter {
    public router: Router;

    constructor() {
        this.router = Router();
        this.initializeRoutes();
    }

    private initializeRoutes(): void {
        this.router.get('/', AuthMiddleware.validToken, (req: Request, res: Response) => {
            const user = (req as any).user;
            res.render('operator', { username: user.username , clients: {} });
        });
    }
}
export default new OperatorRouter().router;