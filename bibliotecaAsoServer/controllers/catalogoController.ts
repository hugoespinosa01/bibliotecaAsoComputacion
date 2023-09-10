import { Request, Response } from "express";
import pool from "../database";

class CatalogoController {
  
  public async getCatalogo(req: Request, res: Response) {
    const catalogo = await pool.query("SELECT * FROM catalogo WHERE tipo = ?", [req.params.tipo]);
    if(catalogo.length === 0){
        res.send(`No existe catálogo de tuoi: ${req.params.tipo}`);
    }else{
        res.send(catalogo);
    }
  }
};

const catalogoController = new CatalogoController();
export default catalogoController;
