import express, { Request, Response } from "express";
import NotFoundController from "../controller/not_found_controller.js"

class NotFoundRouter{
    //propriétés
    private router = express.Router();
    //méthode
    public getRoutes = () => {
        this.router.get('/', new NotFoundController().index);
        
        return this.router;
    };
}

export default NotFoundRouter;