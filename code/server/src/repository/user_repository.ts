import MySQLService from "../service/mysql_service.js";
import User from "../model/User.js";
import RoleRepository from "./role_repository.js";
import Role from "../model/Role.js";
import Orders from "../model/Orders.js";
import OrdersRepository from "./orders_repository.js";

class UserRepository {
    private table = "user";
    public selectAll = async (): Promise<User[] | unknown> => {


        const connection = await new MySQLService().connect();


        const sql = `
            SELECT 
                ${this.table}.*
             FROM
                ${process.env.MYSQL_DATABASE}.${this.table};`

        try {

            const [results] = await connection.execute(sql);
            for (let i = 0; i < (results as User[]).length; i++) {
                const result = (results as User[])[i];


                result.role = (await new RoleRepository().selectOne({
                    id: result.role_id,
                })) as Role;


                for (let i = 0; i < (results as User[]).length; i++) {
                    const result = (results as User[])[i];


                    result.orders = (await new UserRepository().selectOne({
                        id: result.orders_id,
                    })) as Orders;

                    return result;
                }
            }
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
            ${this.table}.*
        FROM
            ${process.env.MYSQL_DATABASE}.${this.table}
        WHERE 
             ${this.table}.id = :id;`
            ;


        try {
            const [results] = await connection.execute(sql, data);

            const result = (results as User[]).shift() as User;

            result.role = (await new RoleRepository().selectOne({
                id: result.role_id,

            })) as Role;
            return result;

        } catch (error) {
            return error;

        }
        ;
    };
}

export default UserRepository;