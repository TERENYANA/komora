import Joi from "joi";
import User from "../model/User.js";


class RegisterFormValidator {
    // un validateur envoie la validation de votre saisie
    // values(peu import le nom) représente la saisie du formulaire
    public isValid = async (values: Partial<User>) => {
        // contraintes de validation
        const contraints = Joi.object({
            firstname: Joi.string().required(),
            lastname: Joi.string().required(),
            email: Joi.string().email().required(),
            password: Joi.string().required(),
            number: Joi.number().required(),
            address:Joi.string().required()
        });

        try {
            // comparer la saisie avec les contraintes de validation
            return await contraints.validateAsync(values);
        } catch (error) {
            return error;
        }
    };
}

export default RegisterFormValidator;