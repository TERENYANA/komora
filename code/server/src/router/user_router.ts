import express, { Request, Response } from "express";
import UserController from "../controller/user_controller.js";


class UserRouter{
    //propriétés
    private router = express.Router();
    //méthode
    public getRoutes = () => {
        this.router.get('/', new UserController().index);
        // créer une variable de route ebn la préfixe d'un :
        this.router.get('/:id', new UserController().one);
        return this.router;
    };
}

export default UserRouter;