import {Router} from 'express';
import catalogoController  from '../controllers/catalogoController';

class CatalogoRoutes {
    public router: Router = Router();
    
    constructor(){
        this.config();
    }

    config(): void {
        this.router.get('/:tipo', catalogoController.getCatalogo);
    }
}

const catalogoRoutes = new CatalogoRoutes();
export default catalogoRoutes.router;