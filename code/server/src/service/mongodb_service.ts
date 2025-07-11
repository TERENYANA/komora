import { MongoClient } from "mongodb";

class MongoDBService {

    //connexion au derveur MongoDB
    public connect = () => {
        //mongodb://<user>://<user>:<password>@<host>:<port>/?authSource=admin
        const connection = `mongodb://${process.env.MONGODB_USER}:${process.env.MONGODB_PASSWORD}@${process.env.MONGODB_HOST}:27017/?authSource=admin`;
//connexion au serveur
        const client = new MongoClient(connection);
//séllectioner la base de données
        return client.db(process.env.MONGODB_DATABASE);
    };
}
export default MongoDBService;