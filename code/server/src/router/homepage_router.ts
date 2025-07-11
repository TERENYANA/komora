import express, { Request, Response } from "express";
import HomepageController from "../controller/homepage_controller.js"
class HomepageRouter{
    //propriétés
    private router = express.Router();
    //méthode
    public getRoutes = () => {
        this.router.get('/', new HomepageController().index);
        
        return this.router;
    };
}

export default HomepageRouter;