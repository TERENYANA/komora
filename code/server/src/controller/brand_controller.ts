import type { Request,Response } from "express";
import BrandRepository from "../repository/brand_repository.js";


class BrandController {
    public index = async (req: Request, res: Response) => {
        //récupérer tous les enregistrements
        const results = await new BrandRepository().selectAll();
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
        const results = await new BrandRepository().selectOne(req.params);
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
    public insert = async (req: Request, res: Response) => {
		//créer tous les enregistrements
		//req.body permet de récupérer de la requete HTTP
		const results = await new BrandRepository().insert(req.body);
		//si la requet SQL renvoie une error
		if (results instanceof Error) {
			res.status(400).json({
				status: 400,
				message: process.env.NODE_ENV === "prod" ? "Error" : results,
			});
			// status: code de status HTTP
			// json: formater une répons en JSON
			return;
		}

		res.status(201).json({
			status: 201,
			message: "Brand created",
			data: results,
		});
        return;
	};
    public update = async (req: Request, res: Response) => {
		//créer tous les enregistrements
		//req.body permet de récupérer de la requete HTTP
		const results = await new BrandRepository().update(req.body);
		//si la requet SQL renvoie une error
		if (results instanceof Error) {
			res.status(400).json({
				status: 400,
				message: process.env.NODE_ENV === "prod" ? "Error" : results,
			});
			// status: code de status HTTP
			// json: formater une répons en JSON
			return;
		}

		res.status(201).json({
			status: 200,
			message: "Brand updated",
			data: results,
		});
        return;
	};
    public delete = async (req: Request, res: Response) => {
		//créer tous les enregistrements
		//req.body permet de récupérer de la requete HTTP
		const results = await new BrandRepository().delete(req.body);
		//si la requet SQL renvoie une error
		if (results instanceof Error) {
			res.status(400).json({
				status: 400,
				message: process.env.NODE_ENV === "prod" ? "Error" : results,
			});
			// status: code de status HTTP
			// json: formater une répons en JSON
			return;
		}

		res.status(201).json({
			status: 200,
			message: "Brand deleted",
			data: results,
		});
        return;
	};
    
}
export default BrandController;