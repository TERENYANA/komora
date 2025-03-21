import express, { Request, Response } from "express";
import SecurityController from "../controller/security_controller.js";
class SecurityRouter{
    //propriétés
    private router = express.Router();
    //méthode
    public getRoutes = () => {
        this.router.get('/', new SecurityController().register);
        // créer une variable de route ebn la préfixe d'un :
        this.router.post('/register', new SecurityController().register);
        this.router.post('/login', new SecurityController().login);
        return this.router;
    };

}

export default SecurityRouter;