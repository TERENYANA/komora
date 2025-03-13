import type { Request, Response } from "express";
import OrdersRepository from "../repository/orders_repository.js";


class OrdersController {
    public index = async (req: Request, res: Response) => {

        const results = await new OrdersRepository().selectAll();

        if (results instanceof Error) {
            res.status(400).json({
                status: 400,
                message: process.env.NODE_ENV === "prod" ? 'Error' : results
            });

            return;
        };



        res.status(200).json({
            status: 200,
            message: 'Ok',
            data: results
        })

    }
    public one = async (req: Request, res: Response) => {

        const results = await new OrdersRepository().selectOne(req.params);

        if (results instanceof Error) {
            res.status(400).json({
                status: 400,
                message: process.env.NODE_ENV === "prod" ? 'Error' : results
            });

            return;
        };



        res.status(200).json({
            status: 200,
            message: 'Ok',
            data: results
        })

    }
}
export default OrdersController;