import multer, { FileFilterCallback } from "multer";
import crypto from "crypto";
import { Request, Response, NextFunction } from "express";
import path from "path";

export let uuidFinal: any = "";

const storage = multer.diskStorage({
  destination: path.join(__dirname, "../../public/uploads"),
  filename: function (
    req: Request,
    file: Express.Multer.File,
    cb: (error: Error | null, destination: string) => void
  ) {
    const uuid = crypto.randomUUID();
    uuidFinal = uuid;
    cb(
      null,
      uuid + file.originalname.substring(file.originalname.lastIndexOf("."))
    );
  },
});

const fileFilter = (
  req: Request,
  file: Express.Multer.File,
  cb: FileFilterCallback
) => {
  const fileTypes = ["application/pdf"];
  if (fileTypes.some((fileFilter) => fileFilter === file.mimetype)) {
    return cb(null, true);
  }
  return cb(null, false);
};

const maxSize = 25 * 1024 * 1024;

export const upload = (req: Request, res: Response, next: NextFunction) => {
  return multer({
    storage,
    fileFilter,
    limits: { fileSize: maxSize },
  }).single("archivo")(req, res, (err) => {
    if (err instanceof multer.MulterError) {
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
    };
    next();
  });
};
