import MySQLService from "../service/mysql_service.js";
import type orders from "../model/Orders.js";
import UserRepository from "./user_repository.js";
import type User from "../model/User.js";
import type Orders from "../model/Orders.js";

class OrdersRepository {
    private table = "orders";
    public selectAll = async (): Promise<Orders[] | unknown> => {


        const connection = await new MySQLService().connect();


        const sql = `
            SELECT 
                ${this.table}.*
             FROM
                ${process.env.MYSQL_DATABASE}.${this.table}
             LEFT JOIN 
                ${process.env.MYSQL_DATABASE}.user
             ON
                user.id = ${this.table}.user_id
            ;
            `;

            try {
                //récupérer les résultat de la requète 
                //resultes represente le premier indice du du arrey 
                const [results] = await connection.execute(sql);
                //si la requête a réussie
                return results;
            } catch (error) {
                // si la requète a échoée
                return error;
    
            }

    };

    public selectOne = async (data: Partial<Orders>): Promise<Orders | unknown> => {
        //connexion au serveur MySQL
        //récupérer un enregistrement par sa clé primaire


        const connection = await new MySQLService().connect();


        const sql = `
        SELECT 
            ${this.table}.*
        FROM
            ${process.env.MYSQL_DATABASE}.${this.table}
        WHERE 
             ${this.table}.id = :id;`
            ;


        try {

            const [results] = await connection.execute(sql, data);

            const result = (results as Orders[]).shift() as Orders;

            result.user = (await new UserRepository().selectOne({
                id: result.user_id,
            })) as User;

            return result;

        } catch (error) {
            return error;

        }

    };
}

export default OrdersRepository;