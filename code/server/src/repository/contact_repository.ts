
import { type Document,ObjectId, type WithId } from "mongodb";
import MongoDBService from "../service/mongodb_service.js";
import type Contact from "../model/Contact.js";

class ContactRepository {
    //récupérere toutes des documents 
    private collection = "contact";
    public selectAll = () => {
        //connection au serveur MongoDB
        const connection = new MongoDBService().connect();
        // console.log(connection);
        //sélectionner la collection
        const collection = connection.collection(this.collection);
        //récupérer les documents
        return collection.find({}).toArray();
    };
    public selectOne = async (
        contactData: Partial<Contact>,
    ): Promise<WithId<Document> | null> => {
        // <ObjectId | undefined> => {
        // Promise< ObjectId | undefined>
        const connect = new MongoDBService().connect();
        // console.log("mongoconnected");
        try {
            const collect = connect.collection(this.collection);
            const contact = await collect.findOne(
                { _id: new ObjectId(contactData._id) },
                // { projection: { email: 1, _id: 0 } }
            );
            // ({ name: contactData.name });
            // console.log("Contact found:", contact)

            // return contact? contact.email : "contact not found";
            // return contact? contact.name : contact;
            return contact;
            // return  contact?._id;
        } catch (error) {
            console.error("Error", error);
            throw error;
        }
    };

    public insert = async (
            contactData: Partial<Contact>,
        ): Promise<Contact | unknown> => {
        const db = new MongoDBService().connect();
        try{
            const result= await db.collection(this.collection).insertOne({
                sujet: contactData.subject,
                name: contactData.name,
                email: contactData.email,
                comments: contactData.message,
            });
            return result;
        }catch(error){
            console.error("Erreur lors de l'insertion du contact :", error);
			throw error;
        }
    };


}

export default ContactRepository;