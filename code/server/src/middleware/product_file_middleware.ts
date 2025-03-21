import type { NextFunction, Request, Response } from "express";
import { FindOperators } from "mongodb";
import fs from 'node:fs/promises';
import ProductRepository from "../repository/product_repository.js";
import type Product from "../model/Product.js";
// fs rénome des fichier

class ProductFileMiddleware {
    public process = async (req: Request, res: Response, next: NextFunction) => {
        //  console.log(req.files);
        //console.log(req.body);
        //passer au middleware suivant

        // fieldname: 'imageURL',
        //     originalname: 'girlinorange.jpg',
        //     encoding: '7bit',
        //     mimetype: 'image/jpeg',
        //     destination: 'public/img',
        //     filename: 'a1937ff092705a77edc13487d35a4eda',
        //     path: 'public/img/a1937ff092705a77edc13487d35a4eda',
        //     size: 46174

        //passer au middleware suivant 
        const file = (req.files as Express.Multer.File[])[0];

        //récupérer l'enregistrement par son id 
        const product: Product | unknown = await new ProductRepository().selectOne(req.body);

        // si un fichier a été séléctionnée
        if (file) {
            //ajouter une extansion au nom du fichier
            const filename = `${file.filename}.${file.mimetype.split("/")[1]}`;

            //renomer le fichier transféré
            await fs.rename(file.path, `${file.destination}/${filename}`);
            // console.log(filename);

            // remplir la propriété de body en relation avec le fichier
            req.body[file.fieldname] = filename;
            //récupérer la méthode HTTP 
            //si une modification est effectuée,supprimer l'ancien fichier
            if (req.method === 'PUT') {
                await fs.rm(`${file.destination}/${(product as Product).imageURL}`);
            }
        }
        else {
            if (req.method === "PUT") {
                req.body.imageURL = (product as Product).imageURL;
            }
            // PUT > récupérer le nom de l'ancienne image et l'affecter à la propriété gérant le fichier
            //DELETE >suprime le fichier

            else if (req.method === 'DELETE') {
                try {
                    await fs.rm(`${process.env.ASSETS_DIR}/img/${(product as Product).imageURL}`);
                } catch (err) {
                    console.error("Error image", err);
                }
            }

        }

        
//DELETE > supprimer le fichier 
        next();
    };
}
export default ProductFileMiddleware;