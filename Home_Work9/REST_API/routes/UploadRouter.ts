import { Router } from 'express';
import { AuthMiddleware } from '../middleware/index';
import { UploadController } from '../controllers/index'; 
import { UploadMulter } from '../middleware/index';
  
class UploadRouter {
  public router: Router;
 
  constructor() {
    this.router = Router();
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
   

    const upload = UploadMulter.getMulterInstance();

   
    this.router.get('/', AuthMiddleware.validToken, UploadController.showUploadPage);

    
    this.router.post('/', AuthMiddleware.validToken, upload.single('file'), UploadController.handleUpload);

  }
}

export default new UploadRouter().router;
