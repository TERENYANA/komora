import MySQLService from "../service/mysql_service.js";
import Brand from "../model/Brand.js";
class BrandRepository {
    private table = "brand";
    public selectAll = async (): Promise<Brand[] | unknown> => {
        //connexion au serveur MySQL

        //récupérer un enregistrement par sa clé primaire

        const connection = await new MySQLService().connect();

        // roquête SQL
        const sql = `
            SELECT 
                ${this.table}.*
             FROM
                ${process.env.MYSQL_DATABASE}.${this.table};`
        //exécuter la requête 
        // try / catch permet d'exécuter une instruction , si l'instruction échoue , une error est récupéree
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
        ;
    };

    public selectOne = async (data: Partial<Brand>): Promise<Brand | unknown> => {
        //connexion au serveur MySQL
        //récupérer un enregistrement par sa clé primaire


        const connection = await new MySQLService().connect();

        // roquête SQL
        //SELECT school .* FROM project_dev.school WHERE school.id=1;
        //ctéer une variable de requete SQL en préfixant le nom d'une variable par:
        const sql = `
        SELECT 
            ${this.table}.*
        FROM
            ${process.env.MYSQL_DATABASE}.${this.table}
        WHERE 
             ${this.table}.id = :id;`
            ;

        //exécuter la requête  
        // try / catch permet d'exécuter une instruction , si l'instruction échoue , une error est récupéree
        try {

            //récupérer les résultat de la requète 
            //resultes represente le premier indice du du arrey 
            // requetes préparées 
            //data permet de définir une valeur aux variable de reequêtes SQL
            const [results] = await connection.execute(sql, data);
            //si la requête a réussie
            //récupérer le premier indice dan array
            const result = (results as Brand[]).shift();


            return result;
        } catch (error) {
            // si la requète a échoée
            return error;

        }
        ;
    };
}

export default BrandRepository;