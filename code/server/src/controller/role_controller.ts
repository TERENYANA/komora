import type { Request,Response } from "express";
import RoleRepository from "../repository/role_repository.js";


class RoleController {
    public index = async (req: Request, res: Response) => {
        //récupérer tous les enregistrements
        const results = await new RoleRepository().selectAll();
        //si la requet SQL renvoie une error 
        if (results instanceof Error) {
            res.status(400).json({
                status: 400,
                message: process.env.NODE_ENV === "prod" ? 'Error' : results
            });
            // status: code de status HTTP
            // json: formater une répons en JSON
            return;
        };



            res.status(200).json({
                status: 200,
                message: 'Ok',
                data: results
            })
        
    }
    public one = async (req: Request, res: Response) => {
        //récupérer tous les enregistrements
        //req.params permet de récupérer les variables de route
        const results = await new RoleRepository().selectOne(req.params);
        //si la requet SQL renvoie une error 
        if (results instanceof Error) {
            res.status(400).json({
                status: 400,
                message: process.env.NODE_ENV === "prod" ? 'Error' : results
            });
            // status: code de status HTTP
            // json: formater une répons en JSON
            return;
        };



            res.status(200).json({
                status: 200,
                message: 'Ok',
                data: results
            })
        
    }
}
export default RoleController;