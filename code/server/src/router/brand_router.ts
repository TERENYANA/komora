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
        return this.router;
    };
}

export default BrandRouter;