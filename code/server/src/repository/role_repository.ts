import MySQLService from "../service/mysql_service.js";

class RoleRepository {
    private table = "role";
    public selectAll = async () => {
        //connexion au serveur MySQL
        const connection = await new MySQLService().connect();

        // roquête SQL
        const sql = `
            SELECT 
                ${this.table }.*
             FROM
                ${process.env.MYSQL_DATABASE};`
            //exécuter la requête 
            // try / catch permet d'exécuter une instruction , si l'instruction échoue , une error est récupéree
            try {
                //récupérer les résultat de la requète 
                const results = await connection.execute(sql);
                //si la requête a réussie
                return results; 
            } catch (error) {
                // si la requète a échoée
                return error;
                
            }
        ;
    };
}

export default RoleRepository;