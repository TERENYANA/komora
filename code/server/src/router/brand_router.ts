import express, { Request, Response } from "express";
import BrandController from "../controller/brand_controller.js";

class BrandRouter{
    //propriétés
    private router = express.Router();
    //méthode
    public getRoutes = () => {
        this.router.get('/', new BrandController().index);
        // créer une variable de route ebn la préfixe d'un :
        this.router.get('/:id', new BrandController().one);
        this.router.post('/', new BrandController().insert);
        this.router.put('/', new BrandController().update);
        this.router.delete('/', new BrandController().delete);
        return this.router;
    };
}
export default BrandRouter;