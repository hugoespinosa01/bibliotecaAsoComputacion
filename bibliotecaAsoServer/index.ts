import express, {Application}from "express";
import librosRoutes from "./routes/librosRoutes";
import catalogoRoutes from "./routes/catalogoRoutes";
import morgan from "morgan";
import cors from "cors";

class Server {
    public app: Application;
    public port: number = 3000;
    
    constructor() {
        this.app = express();
        this.config();
        this.routes();
    };

    /**
     * Configuración del servidor
     */
    config():void{
        this.app.set('port', process.env.PORT || this.port);
        this.app.use(morgan('dev'));
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(express.urlencoded({extended: false}));
    }

    /**
     * Rutas del servidor
     */
    routes():void{
        this.app.use('/api/libros', librosRoutes);
        this.app.use('/api/catalogo', catalogoRoutes);
    }
    
    /**
     * Inicializa el servidor
     */
    start():void {
        this.app.listen(this.app.get('port'), () => {
            console.log('Servidor corriendo en el puerto', this.app.get('port'));
        });
    }
}

const server = new Server();
server.start();