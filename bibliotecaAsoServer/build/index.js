"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const librosRoutes_1 = __importDefault(require("./routes/librosRoutes"));
const catalogoRoutes_1 = __importDefault(require("./routes/catalogoRoutes"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
class Server {
    constructor() {
        this.port = 3000;
        this.app = (0, express_1.default)();
        this.config();
        this.routes();
    }
    ;
    /**
     * Configuración del servidor
     */
    config() {
        this.app.set('port', process.env.PORT || this.port);
        this.app.use((0, morgan_1.default)('dev'));
        this.app.use((0, cors_1.default)());
        this.app.use(express_1.default.json());
        this.app.use(express_1.default.urlencoded({ extended: false }));
    }
    /**
     * Rutas del servidor
     */
    routes() {
        this.app.use('/api/libros', librosRoutes_1.default);
        this.app.use('/api/catalogo', catalogoRoutes_1.default);
    }
    /**
     * Inicializa el servidor
     */
    start() {
        this.app.listen(this.app.get('port'), () => {
            console.log('Servidor corriendo en el puerto', this.app.get('port'));
        });
    }
}
const server = new Server();
server.start();
