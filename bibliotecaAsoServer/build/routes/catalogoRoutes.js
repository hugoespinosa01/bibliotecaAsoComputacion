"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const catalogoController_1 = __importDefault(require("../controllers/catalogoController"));
class CatalogoRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get('/:tipo', catalogoController_1.default.getCatalogo);
    }
}
const catalogoRoutes = new CatalogoRoutes();
exports.default = catalogoRoutes.router;
