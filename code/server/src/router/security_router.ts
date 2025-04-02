import express, { Request, Response } from "express";
import SecurityController from "../controller/security_controller.js";
import RegisterFormValidatorMiddleware from "../middleware/register_form_validator_middleware.js";
class SecurityRouter{
    //propriétés
    private router = express.Router();
    //méthode
    public getRoutes = () => {
        this.router.get('/', new SecurityController().register);
        // créer une variable de route ebn la préfixe d'un :
        this.router.post('/register',new RegisterFormValidatorMiddleware().validate, new SecurityController().register);
        this.router.post('/login', new SecurityController().login);
        this.router.post('/auth', new SecurityController().auth);
        return this.router;
    };

}

export default SecurityRouter;