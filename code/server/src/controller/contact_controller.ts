import type { Request, Response } from "express"
import ContactRepository from "../repository/contact_repository.js";

class ContactController {
    //récupérer tous les documents
    public index = async (req: Request, res: Response) => {
        const results = await new ContactRepository().selectAll();
        res.status(200).json({ status: 200, message: "OK", data: results });
    };
    
    public one = async (req: Request, res: Response) => {
        const { id } = req.params;
        const results = await new ContactRepository().selectOne(req.params);

        res.status(200).json({
            status: 200,
            message: "ok",
            data: results,
        });
        return;
    };
    public insert = async(req: Request, res: Response) =>{
		   
		const newMessage = await new ContactRepository().insert(req.body);
		if(newMessage instanceof Error){
			 res.status(400).json({
				status: 400,
				message: process.env.NODE_ENV === "prod" ? "Error" : newMessage,
		});
		return;
		}
		        res.status(201).json({
		            status: 201,
		            message: "New Message reÃ§u pour vous contacter",
		            data: newMessage,
		        });
				return;
		    };
		}

export default ContactController