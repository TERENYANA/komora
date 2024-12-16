import express, { Request, Response } from "express";
import OrdersDetailsController from "../controller/orders_details_router.js";


class OrdersDetailsRouter{
    //propriétés
    private router = express.Router();
    //méthode
    public getRoutes = () => {
        this.router.get('/', new OrdersDetailsController().index);
        // créer une variable de route ebn la préfixe d'un :
        this.router.get('/:id', new OrdersDetailsController().one);
        return this.router;
    };
}

export default OrdersDetailsRouter;