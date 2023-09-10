import {Router} from 'express';
import librosController  from '../controllers/librosControllers';
import { upload } from '../middleware/middleware.upload';

class LibrosRoutes {
    public router: Router = Router();
    
    constructor(){
        this.config();
    }

    config(): void {
        this.router.get('/', librosController.getLibros);
        this.router.get('/:id', librosController.getLibro);
        this.router.get('/download/:uuid', librosController.download);
        this.router.get('/getFile/:uuid', librosController.getFile);
        this.router.post('/', librosController.postLibro);
        this.router.post('/updateFile/:uuid', upload, librosController.updateFile);
        this.router.post('/upload', upload, librosController.upload);
        this.router.put('/:id', librosController.updateLibro);
        this.router.delete('/:uuid', librosController.deleteLibro);
    }
}

const librosRoutes = new LibrosRoutes();
export default librosRoutes.router;