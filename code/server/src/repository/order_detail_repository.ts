import MySQLService from "../service/mysql_service.js";
import type Order_detail from "../model/Order_detail.js"
import OrderRepository from "./orders_repository.js";
import type Order from "../model/Orders.js";
import ProductRepository from "./product_repository.js";
import type Product from "../model/Product.js";


class OrderDetailRepository {
    private table = "order_detail";
    public selectAll = async (): Promise<Order_detail[] | unknown> => {


        const connection = await new MySQLService().connect();


        const sql = `
            SELECT 
                ${this.table}.*
            FROM
                ${process.env.MYSQL_DATABASE}.${this.table}
            LEFT JOIN 
                ${process.env.MYSQL_DATABASE}.product
            ON
                product.id = ${this.table}.product_id
            LEFT JOIN 
                ${process.env.MYSQL_DATABASE}.orders
            ON
                orders.id = ${this.table}.orders_id;`;

        try {

            const [results] = await connection.execute(sql);

            for (let i = 0; i < (results as Order_detail[]).length; i++) {
                const result = (results as Order_detail[])[i];


                result.order = (await new OrderRepository().selectOne({
                    id: result.order_id,
                })) as Order;

                result.product = (await new ProductRepository().selectOne({
                    id: result.product_id,
                })) as Product;
            }
            return results;

        } catch (error) {

            return error;

        }

    };
    public selectOne = async (data: Partial<Order_detail>): Promise<Order_detail | unknown> => {
        //connexion au serveur MySQL
        //récupérer un enregistrement par sa clé primaire


        const connection = await new MySQLService().connect();


        const sql = `
        SELECT 
            ${this.table}.*
        FROM
            ${process.env.MYSQL_DATABASE}.${this.table}
        LEFT JOIN 
                ${process.env.MYSQL_DATABASE}.orders
        ON
                orders.id = ${this.table}.orders_id
        WHERE 
             ${this.table}.id = :id;`
            ;


        try {

            const [results] = await connection.execute(sql, data);

            const result = (results as Order_detail[]).shift();
            return result;

        } catch (error) {
            return error;

        }

    };
}

export default OrderDetailRepository;