import { Router, Request, Response } from 'express';
import { ControllerRegister } from '../controllers/controllerRegister';

class RegisterRouter {
    public router: Router;

    constructor() {
        this.router = Router();
        this.initializeRoutes();
    }

    private initializeRoutes(): void {
        this.router.get('/', (_req: Request, res: Response) => {
            res.render('register')
        });
        this.router.post('/', ControllerRegister.register.bind(ControllerRegister));
    }
}
export default new RegisterRouter().router;