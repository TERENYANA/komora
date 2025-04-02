
import { NextFunction, Request, Response } from "express";
import RegisterFormValidator from "../validator/register_form_validator.js";


class RegisterFormValidatorMiddleware{
    public validate = async (req: Request, res: Response, next: NextFunction) => {
        //envoyer la saisie au validateur
        const isValid = await new RegisterFormValidator().isValid(req.body)
        //si une erreur de validateur est renvoyer
        if (isValid instanceof Error) {
            res.status(401).json({
                status: 401,
              message: process.env.NODE_ENV === "prod" ? 'Error' : isValid
            });
             return
        }

        next();
    }


}
export default RegisterFormValidatorMiddleware;