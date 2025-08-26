import { Router, Request, Response } from 'express';
import { AuthMiddleware } from '../middleware/index';
import { ControllerUploadList } from '../controllers/index';


class UploadListRouter {
  public router: Router;

  constructor() {
    this.router = Router();
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.get(
      '/',
      AuthMiddleware.validToken, ControllerUploadList.getAllUploads);


    this.router.post(
      '/deleteAll',
      AuthMiddleware.validToken, ControllerUploadList.deleteAllUploads);

       this.router.post(
    '/delete/:fileName', AuthMiddleware.validToken, ControllerUploadList.deleteOneUpload )
  }
}

export default new UploadListRouter().router;
