import type { Request,Response } from "express";
import SecurityRepository from "../repository/security_repository.js";
import  argon2  from "argon2";
import UserRepository from "../repository/user_repository.js";
import type User from "../model/User.js";




class SecurityController {

    public register = async (req: Request, res: Response) => {
        console.log(req.body);
        //récupérer tous les enregistrements
        const results = await new SecurityRepository().register({ ...req.body, password: await argon2.hash(req.body.password)}
        );
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


            res.status(201).json({
                status: 201,
                message: 'User created',
                data: results
            })
        
    }

    public login = async (req: Request, res: Response) => {

        // console.log(req.body);
        //récupérer tous les enregistrements

        
        const results = await new UserRepository().selectOneByEmail(req.body.email);

        

        console.log(results);

     
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

         //si la requet SQL renvoie une error 
         if (!results) {
            res.status(403).json({
                status: 403,
                message: process.env.NODE_ENV === "prod" ? 'Error' : " User doesn't exists "
            });
            // status: code de status HTTP
            // json: formater une répons en JSON
            return;
        };

        const user = await new UserRepository().selectOne(results as User);

        const passwordVerify = await argon2.verify((user as User).password,req.body.password);

         if (!passwordVerify) {
            res.status(403).json({
                status: 400,
                message: process.env.NODE_ENV === "prod" ? 'Error' : "Wrong password"
            });
            return
         } 

         res.status(201).json({
            status: 201,
            message: 'Logined secsessfully',
            data: user
        });
    
}
}

export default SecurityController;

