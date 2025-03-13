import express, { Request, Response } from "express";
import CategoryController from "../controller/category_controller.js";

class CategoryRouter{
    //propriétés
    private router = express.Router();
    //méthode
    public getRoutes = () => {
        this.router.get('/', new CategoryController().index);
        // créer une variable de route ebn la préfixe d'un :
        this.router.get('/:id', new CategoryController().one);
        return this.router;
    };
}

export default CategoryRouter;