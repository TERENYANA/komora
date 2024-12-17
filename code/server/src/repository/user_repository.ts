import MySQLService from "../service/mysql_service.js";
import User from "../model/User.js";
import RoleRepository from "./role_repository.js";
import Role from "../model/Role.js";
import Order from "../model/Order.js";
import OrderRepository from "./order_repository.js";
import { join } from "node:path";
import AddressRepository from "./address_repository.js";
import Address from "../model/Address.js";

class UserRepository {
    private table = "user";
    public selectAll = async (): Promise<User[] | unknown> => {


        const connection = await new MySQLService().connect();


        const sql = `
            SELECT 
                ${this.table}.*,
                GROUP_CONCAT(address.id) AS address_ids
             FROM
                ${process.env.MYSQL_DATABASE}.${this.table}
             LEFT JOIN
                ${process.env.MYSQL_DATABASE}.user_address
            ON
                user_address.user_id = ${this.table}.id
            LEFT JOIN
                ${process.env.MYSQL_DATABASE}.address
            ON
                user_address.address_id =address.id
            GROUP BY 
                ${this.table}.id
            ;`
            ;


        try {

            const [results] = await connection.execute(sql);
            for (let i = 0; i < (results as User[]).length; i++) {
                const result = (results as User[])[i];


                result.role = (await new RoleRepository().selectOne({
                    id: result.role_id,
                })) as Role;

                result.addresses = (await new AddressRepository().selectInList(result.address_ids)) as Address[];


            }

            return results;
        } catch (error) {

            return error;

        }
        ;
    };

    public selectOne = async (data: Partial<User>): Promise<User | unknown> => {
        //connexion au serveur MySQL
        //récupérer un enregistrement par sa clé primaire


        const connection = await new MySQLService().connect();

        const sql = `
        SELECT 
            ${this.table}.*,
            GROUP_CONCAT(address.id) AS address_ids
         FROM
            ${process.env.MYSQL_DATABASE}.${this.table}

        JOIN
            ${process.env.MYSQL_DATABASE}.user_address
        ON
            user_address.user_id = ${this.table}.id
        JOIN
            ${process.env.MYSQL_DATABASE}.address
        ON
            user_address.address_id =address.id
                WHERE 
             ${this.table}.id = :id
        GROUP BY 
            ${this.table}.id
        ;`
            ;



        try {
            const [results] = await connection.execute(sql, data);

            const result = (results as User[]).shift() as User;

            result.role = (await new RoleRepository().selectOne({
                id: result.role_id,
            })) as Role;

            result.addresses = (await new AddressRepository().selectInList(result.address_ids)) as Address[];


            return result;

        } catch (error) {
            return error;

        }
        ;
    };
}

export default UserRepository;