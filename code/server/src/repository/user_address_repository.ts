import Address from "../model/Address.js";
import User from "../model/User.js";
import User_address from "../model/User_address.js";
import MySQLService from "../service/mysql_service.js";
import AddressRepository from "./address_repository.js";
import UserRepository from "./user_repository.js";


class UserAddressRepository {
    private table = "user_address";
    public selectAll = async (): Promise<User_address[] | unknown> => {
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

            for (let i = 0; i < (results as User_address[]).length; i++) {
                const result = (results as User_address[])[i];


                result.adress = (await new AddressRepository().selectOne({
                    id: result.address_id,
                })) as Address;


                for (let i = 0; i < (results as User_address[]).length; i++) {
                    const result = (results as User_address[])[i];
    
    
                    result.user = (await new UserRepository().selectOne({
                        id: result.user_id,
                    })) as User;
    
                    return result;
                }
            }
            //si la requête a réussie
            return results;
        } catch (error) {
            // si la requète a échoée
            return error;
                
        }
        ;
    };

    public selectOne = async (data: Partial <User_address>): Promise<User_address | unknown> => {
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
            const result = (results as User_address[]).shift();
            
            return results;
        } catch (error) {
            // si la requète a échoée
            return error;
            
        }
        ;
    };
}

export default UserAddressRepository;