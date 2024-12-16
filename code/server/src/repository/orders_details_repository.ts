import MySQLService from "../service/mysql_service.js";
import Orders_details from"../model/Orders_details.js"
import OrdersRepository from "./orders_repository.js";
import Orders from "../model/Orders.js";

class OrdersDetailsRepository {
    private table = "orders_details";
    public selectAll = async (): Promise<Orders_details[] | unknown> => {


        const connection = await new MySQLService().connect();


        const sql = `
            SELECT 
                ${this.table}.*
             FROM
                ${process.env.MYSQL_DATABASE}.${this.table};`

        try {

            const [results] = await connection.execute(sql);

            for (let i = 0; i < (results as Orders_details[]).length; i++) {
                const result = (results as Orders_details[])[i];


                result.orders = (await new OrdersRepository().selectOne({
                    id: result.orders_id,
                })) as Orders;

                return results;
            }
        } catch (error) {

            return error;

        }
        ;
    };

    public selectOne = async (data: Partial<Orders_details>): Promise<Orders_details | unknown> => {
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

            const result = (results as Orders_details[]).shift();
            return results;
            
        } catch (error) {
            return error;

        }
        ;
    };
}

export default OrdersDetailsRepository;