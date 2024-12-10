import type { Request,Response } from "express";
import RoleRepository from "../repository/role_repository.js";
class HomepageController{
    public index = async (req: Request, res: Response) => {
        //récupérer tous les enregistrements
        const results = await new RoleRepository().selectAll();
        console.log(results);
        // status: code de status HTTP
        // json: formater une répons en JSON

        res.status(200).json({
            status: 200,
            message:'Welcome to my API'
            })
        };
}

export default HomepageController;