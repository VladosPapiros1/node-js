import { Request, Response, Router  } from "express";
import { ControllerLogin } from "../controllers/index";

class LoginRouter {
    public router: Router;

    constructor() {
        this.router = Router();
        this.initializeRoutes();
    }

    private initializeRoutes(): void {
         this.router.get('/', (_req: Request, res: Response) => {
            res.render('login')
        });
        this.router.post('/', ControllerLogin.login.bind(ControllerLogin));
    }
}
export default new LoginRouter().router;