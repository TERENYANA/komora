import MySQLService from "../service/mysql_service.js";
import Order from "../model/Order.js";
import UserRepository from "./user_repository.js";
import User from "../model/User.js";

class OrderRepository {
    private table = "orders";
    public selectAll = async (): Promise<Order[] | unknown> => {


        const connection = await new MySQLService().connect();


        const sql = `
            SELECT 
                ${this.table}.*
             FROM
                ${process.env.MYSQL_DATABASE}.${this.table};`

        try {

            const [results] = await connection.execute(sql);

            for (let i = 0; i < (results as Order[]).length; i++) {
                const result = (results as Order[])[i];


                result.user = (await new UserRepository().selectOne({
                    id: result.user_id,
                })) as User;

                return results;
            }

            
        } catch (error) {

            return error;

        }
        ;
    };

    public selectOne = async (data: Partial<Order>): Promise<Order | unknown> => {
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

            const result = (results as Order[]).shift();
            return results;

        } catch (error) {
            return error;

        }
        ;
    };
}

export default OrderRepository;