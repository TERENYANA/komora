import MySQLService from "../service/mysql_service.js";
import Address from "../model/Address.js";

class AddressRepository {
    private table = "address";
    public selectAll = async (): Promise<Address[] | unknown> => {


        const connection = await new MySQLService().connect();


        const sql = `
            SELECT 
                ${this.table}.*
             FROM
                ${process.env.MYSQL_DATABASE}.${this.table};`

        try {

            const [results] = await connection.execute(sql);

            return results;
        } catch (error) {

            return error;

        }
        ;
    };

    public selectOne = async (data: Partial<Address>): Promise<Address | unknown> => {
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

            const result = (results as Address[]).shift();
            return results;
            
        } catch (error) {
            return error;

        }
        ;
    };

}

export default AddressRepository;