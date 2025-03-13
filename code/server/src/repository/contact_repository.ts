
import MongoDBService from "../service/mongodb_service.js";

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
        return collection.find().toArray();
    };

}

export default ContactRepository;