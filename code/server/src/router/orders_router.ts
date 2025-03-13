import express, { Request, Response } from "express";
import OrdersController from "../controller/orders_controller.js";


class OrdersRouter{
    //propriétés
    private router = express.Router();
    //méthode
    public getRoutes = () => {
        this.router.get('/', new OrdersController().index);
        // créer une variable de route ebn la préfixe d'un :
        this.router.get('/:id', new OrdersController().one);
        return this.router;
    };
}

export default OrdersRouter;