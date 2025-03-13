import express, { Request, Response } from "express";
import AddressController from "../controller/address_controller.js";

class AddressRouter{
    //propriétés
    private router = express.Router();
    //méthode
    public getRoutes = () => {
        this.router.get('/', new AddressController().index);
        // créer une variable de route ebn la préfixe d'un :
        this.router.get('/:id', new AddressController().one);
        return this.router;
    };
}

export default AddressRouter;