import type { Request,Response } from "express";
import AddressRepository from "../repository/address_repository.js";


class AddressController {
    public index = async (req: Request, res: Response) => {
        //récupérer tous les enregistrements
        const results = await new AddressRepository().selectAll();
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
        const results = await new AddressRepository().selectOne(req.params);
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
		const results = await new AddressRepository().insert(req.body);
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
			message: "Address created",
			data: results,
		});
        return;
	};
    public update = async (req: Request, res: Response) => {
		//créer tous les enregistrements
		//req.body permet de récupérer de la requete HTTP
		const results = await new AddressRepository().update(req.body);
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
			message: "Address updated",
			data: results,
		});
        return;
	};
    public delete = async (req: Request, res: Response) => {
		//créer tous les enregistrements
		//req.body permet de récupérer de la requete HTTP
		const results = await new AddressRepository().delete(req.body);
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
			message: "Address deleted",
			data: results,
		});
        return;
	};
}
export default AddressController;