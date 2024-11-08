/*
    promise - exécution d'un code asynchrome
*/
import mysql, { Pool, PoolConnection } from "mysql2/promise";

class MySQLService {
    //propiétté statique 
    //membres (propriétés et méthodes) statique
    //membre qui ne sont pas accessibles non pas avec un objet mais directement par la class
    private static connection: PoolConnection;
// async permet de créer une fonction asynchrone
    public connect = async () => {
        //tester si une connexion n'exist pas 
        //await : à utiliser avec du code asynchrone (promesse)
        //créer un tepms d'attante dans l'exécution du code 
        //récupérer le contenue d'une promesse
        if (!MySQLService.connection) {
            return await mysql.createPool({
                host: process.env.MYSQL_HOST,
                user: process.env.MYSQL_USER,
                password: process.env.MYSQL_PASSWORD,
                database: process.env.MYSQL_DATABASE,
                namedPlaceholders:true,
            }).getConnection();
        }
        // si la connexion exist 
        return MySQLService.connection;
    };
}
export default MySQLService;