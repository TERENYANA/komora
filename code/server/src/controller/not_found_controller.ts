import type { Request,Response } from "express";
class NotFoundController{
    public index = (req: Request, res: Response) => {
        // status: code de status HTTP
        // json: formater une répons en JSON

        res.status(404).json({
            status: 404,
            message:'Not Found'
            })
        };
}

export default NotFoundController;