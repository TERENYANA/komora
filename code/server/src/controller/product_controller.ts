import type { Request,Response } from "express";

import ProductRepository from "../repository/product_repository.js";class ProductController {
	public index = async (req: Request, res: Response) => {
		//récupérer tous les enregistrements
		const results = await new ProductRepository().selectAll();
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

		res.status(200).json({
			status: 200,
			message: "Ok",
			data: results,
		});
        return;
	};

	public one = async (req: Request, res: Response) => {
		//récupérer tous les enregistrements
		//req.params permet de récupérer les variables de route
		const results = await new ProductRepository().selectOne(req.params);
	
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

		res.status(200).json({
			status: 200,
			message: "Ok",
			data: results,
		});
	};

	public insert = async (req: Request, res: Response) => {
		//créer tous les enregistrements
		//req.body permet de récupérer de la requete HTTP
		const results = await new ProductRepository().insert(req.body);
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
			message: "Product created",
			data: results,
		});
        return;
	};

    public update = async (req: Request, res: Response) => {
		//créer tous les enregistrements
		//req.body permet de récupérer de la requete HTTP
		const results = await new ProductRepository().update(req.body);
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
			message: "Product updated",
			data: results,
		});
        return;
	};

    public delete = async (req: Request, res: Response) => {
		//créer tous les enregistrements
		//req.body permet de récupérer de la requete HTTP
		const results = await new ProductRepository().delete(req.body);
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
			message: "Product deleted",
			data: results,
		});
        return;
	};
}
export default ProductController;