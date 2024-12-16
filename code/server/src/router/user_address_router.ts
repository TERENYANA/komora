import express, { Request, Response } from "express";
import UserAddressController from "../controller/user_address_controller.js";


class UserAddressRouter{
    //propriétés
    private router = express.Router();
    //méthode
    public getRoutes = () => {
        this.router.get('/', new UserAddressController().index);
        // créer une variable de route ebn la préfixe d'un :
        this.router.get('/:id', new UserAddressController().one);
        return this.router;
    };
}

export default UserAddressRouter;