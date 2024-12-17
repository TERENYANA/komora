import type { Request, Response } from "express";
import OrderRepository from "../repository/order_repository.js";


class OrderController {
    public index = async (req: Request, res: Response) => {

        const results = await new OrderRepository().selectAll();

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

        const results = await new OrderRepository().selectOne(req.params);

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
export default OrderController;