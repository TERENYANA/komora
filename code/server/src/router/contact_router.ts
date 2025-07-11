import express, { Request, Response } from "express";
import ContactController from "../controller/contact_controller.js";

class ContactRouter{
    //propriétés
    private router = express.Router();
    //méthode
    public getRoutes = () => {
        this.router.get('/', new ContactController().index);
        this.router.get('/:_id', new ContactController().one);
        this.router.post("/", new ContactController().insert);
        return this.router;
    };
}

export default ContactRouter;