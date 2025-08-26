import { Request, Response, Router } from "express";
import { AuthMiddleware } from '../middleware/index';

class ChatRouter {
    public router: Router;

    constructor() {
        this.router = Router();
        this.initializeRoutes();
    }

    private initializeRoutes(): void {
        this.router.get('/', AuthMiddleware.validToken, (req: Request, res: Response) => {
            const user = (req as any).user;
            res.render('chat', { 
                username: user.username, 
                role: user.role,
                id: user.id 
            });
        });
    }
}

export default new ChatRouter().router;
