import type { Request,Response } from "express";
import SecurityRepository from "../repository/security_repository.js";
import  argon2  from "argon2";
import UserRepository from "../repository/user_repository.js";
import type User from "../model/User.js";
import SimpleCrypto from "simple-crypto-js";
import jwt from "jsonwebtoken";




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
//crypter le mot de passe et générer une partie aléatoire de la clé de décryptage
const randomKey = SimpleCrypto.default.generateRandom();
const key =`${process.env.KEY}${randomKey}`;
//crypter le mot de passe 
const crypto = new SimpleCrypto.default(key);
const passwordEncrypted = crypto.encrypt(req.body.password);
console.log(passwordEncrypted);


         res.status(200).json({
            status: 200,
            message: 'Logined secsessfully',
            data: {...user as User, password: passwordEncrypted, key:randomKey},
        });
    
}

    public auth = async (req: Request, res: Response) => {

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


        //recréer la clé de décryptage en récupérent la partie variable de la clé et la clé fixe
         const key = `${process.env.KEY}${req.body.key}`;
         const crypto = new SimpleCrypto.default(key);
         let passwordDecrypted:string;
         try{
            passwordDecrypted = crypto.decrypt(req.body.password)as string;
            console.log(passwordDecrypted);
         }catch(error){
            res.status(401).json({
                status: 401,
                message: process.env.NODE_ENV === "prod" ? 'Error' : "Unauthorized"
            });
            return;
         }
        
         

//vérifier le mot de passe

         const passwordVerify = await argon2.verify((user as User).password,passwordDecrypted);

          if (!passwordVerify) {
            res.status(403).json({
               status: 400,
             message: process.env.NODE_ENV === "prod" ? 'Error' : "Wrong password"
           });
            return
       } 
       
//gérer le JSON Web token
//en production le token va expirer en 30 secondes ,en development/test,10 heures

const token = jwt.sign({user:req.body},process.env.JWT_KEY as string,{
    expiresIn:process.env.NODE_ENV === "prod" ? 30:60*60*10,
});

console.log(token);

//crypter le mot de passe et générer une partie aléatoire de la clé de décryptage
// const randomKey = SimpleCrypto.default.generateRandom();
// const key =`${process.env.KEY}${randomKey}`;
// //crypter le mot de passe 
// const crypto = new SimpleCrypto.default(key);
// const passwordEncrypted = crypto.encrypt(req.body.password);
// console.log(passwordEncrypted);


         res.status(200).json({
            status: 200,
            message: 'User authenti',
            data:{token:token,},
        });
    
}
}

export default SecurityController;

