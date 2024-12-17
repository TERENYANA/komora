import express, { Request, Response } from "express";
import OrderController from "../controller/order_controller.js";


class OrderRouter{
    //propriétés
    private router = express.Router();
    //méthode
    public getRoutes = () => {
        this.router.get('/', new OrderController().index);
        // créer une variable de route ebn la préfixe d'un :
        this.router.get('/:id', new OrderController().one);
        return this.router;
    };
}

export default OrderRouter;