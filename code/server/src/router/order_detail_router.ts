import express, { Request, Response } from "express";
import OrderDetailController from "../controller/order_detail_router.js";


class OrderDetailRouter{
    //propriétés
    private router = express.Router();
    //méthode
    public getRoutes = () => {
        this.router.get('/', new OrderDetailController().index);
        // créer une variable de route ebn la préfixe d'un :
        this.router.get('/:id', new OrderDetailController().one);
        return this.router;
    };
}

export default OrderDetailRouter;