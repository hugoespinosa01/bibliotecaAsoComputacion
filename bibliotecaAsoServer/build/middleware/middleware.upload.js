"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.upload = exports.uuidFinal = void 0;
const multer_1 = __importDefault(require("multer"));
const crypto_1 = __importDefault(require("crypto"));
const path_1 = __importDefault(require("path"));
exports.uuidFinal = "";
const storage = multer_1.default.diskStorage({
    destination: path_1.default.join(__dirname, "../../public/uploads"),
    filename: function (req, file, cb) {
        const uuid = crypto_1.default.randomUUID();
        exports.uuidFinal = uuid;
        cb(null, uuid + file.originalname.substring(file.originalname.lastIndexOf(".")));
    },
});
const fileFilter = (req, file, cb) => {
    const fileTypes = ["application/pdf"];
    if (fileTypes.some((fileFilter) => fileFilter === file.mimetype)) {
        return cb(null, true);
    }
    return cb(null, false);
};
const maxSize = 25 * 1024 * 1024;
const upload = (req, res, next) => {
    return (0, multer_1.default)({
        storage,
        fileFilter,
        limits: { fileSize: maxSize },
    }).single("archivo")(req, res, (err) => {
        if (err instanceof multer_1.default.MulterError) {
            return res.status(400).json({
                ok: false,
                message: err.message,
            });
        }
        if (err) {
            return res.status(400).json({
                ok: false,
                message: err.message,
            });
        }
        if (!req.file) {
            return res.status(400).json({
                ok: false,
                message: "No se ha seleccionado ningún archivo",
            });
        }
        ;
        next();
    });
};
exports.upload = upload;
