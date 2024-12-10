import express, { Request, Response } from "express";
import RoleController from "../controller/role_controller.js"
class RoleRouter{
    //propriétés
    private router = express.Router();
    //méthode
    public getRoutes = () => {
        this.router.get('/', new RoleController().index);
        // créer une variable de route ebn la préfixe d'un :
        this.router.get('/:id', new RoleController().one);
        return this.router;
    };
}

export default RoleRouter;