import express, { Request, Response } from "express";
import ProductController from "../controller/product_controller.js";
import multer from "multer";
import ProductFileMiddleware from '../middleware/product_file_middleware.js';
class ProductRouter {

    //propriétés
    private router = express.Router();

    //dossier de destination des fichiers transférés
    private upload = multer({ dest: `${process.env.ASSETS_DIR}/img` });

    //méthode
    public getRoutes = () => {
        this.router.get('/', new ProductController().index);
        // créer une variable de route ebn la préfixe d'un :
        this.router.get('/:id', new ProductController().one);
        this.router.post('/', this.upload.any(), new ProductFileMiddleware().process, new ProductController().insert);
        this.router.put('/', this.upload.any(), new ProductFileMiddleware().process, new ProductController().update);
        this.router.delete('/', this.upload.any(), new ProductFileMiddleware().process, new ProductController().delete);
        return this.router;
    };
}

export default ProductRouter;