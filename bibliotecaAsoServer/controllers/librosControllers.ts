import { Request, Response } from "express";
import pool from "../database";
import { uuidFinal } from "../middleware/middleware.upload";
import fs from "fs";
import path from "path";

class LibrosController {

  public async getLibros(req: Request, res: Response){
    const libros = await pool.query("SELECT * FROM libros");
    if(libros.length === 0){
      return res.send("No hay libros en la base de datos");
    }else{
      return res.send(libros);
    }
  }

  public async getLibro(req: Request, res: Response) {
    const libro = await pool.query("SELECT * FROM libros WHERE id = ?", [
      req.params.id,
    ]);
    if (libro.length === 0) {
      res.send(`No existe el libro con id: ${req.params.id}`);
    } else {
      res.send(libro[0]);
    }
  }

  public async hola(req: Request, res: Response) {
    res.send("Hola");
  }

  public async postLibro(req: Request, res: Response) {
    const body = req.body;
    body.archivo = uuidFinal;
    await pool.query("INSERT INTO libros set ?", [body]);
    if (res.status(200) || res.status(201)) {
      res.send("Libro agregado");
    } else {
      res.send("Error al agregar el libro");
    }
  }

  public async upload(req: Request, res: Response) {
    res.json({
      message: "Libro subido",
    });
  }

  public async download(req: Request, res: Response) {
    return res.download(
      __dirname + "../../../public/uploads/" + req.params.uuid + ".pdf"
    );
  }

  public async getFile(req: Request, res: Response) {
    return res.sendFile(
      path.resolve(
        __dirname + "../../../public/uploads/" + req.params.uuid + ".pdf"
      )
    );
  }

  public async updateLibro(req: Request, res: Response) {
    const body = req.body;
    body.archivo = uuidFinal;
    await pool.query("UPDATE libros set ? WHERE id = ?", [body, req.params.id]);
    res.send("Libro " + req.params.id + " actualizado");
  }

  public async deleteLibro(req: Request, res: Response) {
    const pathSource = path.join(
      __dirname,
      "../../public/uploads/" + req.params.uuid + ".pdf"
    );
    fs.unlinkSync(pathSource);
    await pool.query("DELETE FROM libros WHERE archivo = ?", [req.params.uuid]);
    res.json({
      message: "Libro eliminado",
    });
  }

  public async updateFile(req: Request, res: Response) {
    const pathSource = path.join(
      __dirname,
      "../../public/uploads/" + req.params.uuid + ".pdf"
    );
    fs.unlinkSync(pathSource);
    res.json({
      message: "Libro actualizado",
    });
  }
}

const librosController = new LibrosController();
export default librosController;
