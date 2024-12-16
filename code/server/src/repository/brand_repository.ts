import MySQLService from "../service/mysql_service.js";
import Brand from "../model/Brand.js";

class BrandRepository {
    private table = "brand";
    public selectAll = async (): Promise<Brand[] | unknown> => {


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

    public selectOne = async (data: Partial<Brand>): Promise<Brand | unknown> => {
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

            const result = (results as Brand[]).shift();
            return results;
            
        } catch (error) {
            return error;

        }
        ;
    };
}

export default BrandRepository;