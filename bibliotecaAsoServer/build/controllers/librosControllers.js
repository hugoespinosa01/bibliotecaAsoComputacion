"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = __importDefault(require("../database"));
const middleware_upload_1 = require("../middleware/middleware.upload");
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
class LibrosController {
    getLibros(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const libros = yield database_1.default.query("SELECT * FROM libros");
            if (libros.length === 0) {
                return res.send("No hay libros en la base de datos");
            }
            else {
                return res.send(libros);
            }
        });
    }
    getLibro(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const libro = yield database_1.default.query("SELECT * FROM libros WHERE id = ?", [
                req.params.id,
            ]);
            if (libro.length === 0) {
                res.send(`No existe el libro con id: ${req.params.id}`);
            }
            else {
                res.send(libro[0]);
            }
        });
    }
    hola(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            res.send("Hola");
        });
    }
    postLibro(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const body = req.body;
            body.archivo = middleware_upload_1.uuidFinal;
            yield database_1.default.query("INSERT INTO libros set ?", [body]);
            if (res.status(200) || res.status(201)) {
                res.send("Libro agregado");
            }
            else {
                res.send("Error al agregar el libro");
            }
        });
    }
    upload(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            res.json({
                message: "Libro subido",
            });
        });
    }
    download(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            return res.download(__dirname + "../../../public/uploads/" + req.params.uuid + ".pdf");
        });
    }
    getFile(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            return res.sendFile(path_1.default.resolve(__dirname + "../../../public/uploads/" + req.params.uuid + ".pdf"));
        });
    }
    updateLibro(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const body = req.body;
            body.archivo = middleware_upload_1.uuidFinal;
            yield database_1.default.query("UPDATE libros set ? WHERE id = ?", [body, req.params.id]);
            res.send("Libro " + req.params.id + " actualizado");
        });
    }
    deleteLibro(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const pathSource = path_1.default.join(__dirname, "../../public/uploads/" + req.params.uuid + ".pdf");
            fs_1.default.unlinkSync(pathSource);
            yield database_1.default.query("DELETE FROM libros WHERE archivo = ?", [req.params.uuid]);
            res.json({
                message: "Libro eliminado",
            });
        });
    }
    updateFile(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const pathSource = path_1.default.join(__dirname, "../../public/uploads/" + req.params.uuid + ".pdf");
            fs_1.default.unlinkSync(pathSource);
            res.json({
                message: "Libro actualizado",
            });
        });
    }
}
const librosController = new LibrosController();
exports.default = librosController;
