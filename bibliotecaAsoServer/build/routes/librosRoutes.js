"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const librosControllers_1 = __importDefault(require("../controllers/librosControllers"));
const middleware_upload_1 = require("../middleware/middleware.upload");
class LibrosRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get('/', librosControllers_1.default.getLibros);
        this.router.get('/:id', librosControllers_1.default.getLibro);
        this.router.get('/download/:uuid', librosControllers_1.default.download);
        this.router.get('/getFile/:uuid', librosControllers_1.default.getFile);
        this.router.post('/', librosControllers_1.default.postLibro);
        this.router.post('/updateFile/:uuid', middleware_upload_1.upload, librosControllers_1.default.updateFile);
        this.router.post('/upload', middleware_upload_1.upload, librosControllers_1.default.upload);
        this.router.put('/:id', librosControllers_1.default.updateLibro);
        this.router.delete('/:uuid', librosControllers_1.default.deleteLibro);
    }
}
const librosRoutes = new LibrosRoutes();
exports.default = librosRoutes.router;
