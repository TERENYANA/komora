import express, { Request, Response } from "express";
import ProductController from "../controller/product_controller.js";


class ProductRouter{
    //propriétés
    private router = express.Router();
    //méthode
    public getRoutes = () => {
        this.router.get('/', new ProductController().index);
        // créer une variable de route ebn la préfixe d'un :
        this.router.get('/:id', new ProductController().one);
        return this.router;
    };
}

export default ProductRouter;