import MySQLService from "../service/mysql_service.js";
import type User from "../model/Role.js";

class SecurityRepository {
    private table = "user";

    //enregistrer un utilisateur

    public register = async (data: Partial<User>): Promise<User | unknown> => {
        //connexion au serveur MySQL
        //récupérer un enregistrement par sa clé primaire
    
        const connection = await new MySQLService().connect();
    
        // roquête SQL
        //ctéer une variable de requete SQL en préfixant le nom d'une variable par:
    
        let sql = `
        INSERT INTO
             ${process.env.MYSQL_DATABASE}.${this.table}
        VALUE 
             ( 
        NULL,
        :firstname,
        :lastname,
        :email,
        :password,
        :number,
        2
               )
            ;
            `;
      
        //exécuter la requête
        // try / catch permet d'exécuter une instruction , si l'instruction échoue , une error est récupéree
        try {
          //créer une transaction SQL
          connection.beginTransaction();
    
          //exécuter la premiere requête
          await connection.execute(sql, data);
    
          //créer une variable SQL stockant le dernier identifiiant créer
          sql = `
               SET @userid = LAST_INSERT_ID();
              `;
    
            await connection.execute(sql, data);
            

            sql = `
            INSERT INTO
             ${process.env.MYSQL_DATABASE}.address
            VALUES
             (NULL, :address)
              ;
             `;
            
            await connection.execute(sql, data);

            sql = `
               SET @addressid = LAST_INSERT_ID();
              `;
    
            await connection.execute(sql, data);
            

          // deuxieme requete SQL de la transaction
          ///1,2,3 >> (NULL,@id,1),(NULL,@id,2),(NULL,@id,3)
          //split [1,2,3]
          //join fait la chaine de caractere
          //  const values = data.address_ids
          //   ?.split(",")
          //     .map((item) => `(@id,${item})`)
          //     .join(",");
    
          sql = `
            INSERT INTO
             ${process.env.MYSQL_DATABASE}.user_address
            VALUES
             (@userid, @addressid)
              ;
             `;
            
          //récupérer les résultat de la requète
          //resultes represente le premier indice du du arrey
          // requetes préparées
          //data permet de définir une valeur aux variable de reequêtes SQL
          const [results] = await connection.execute(sql, data);
    
          //valider la transaction lorsque l'ensemble des requetes d'une transaction ont réussi
          connection.commit();
    
          //si la requête a réussie
          //récupérer le premier indice dan array
          return results;
        } catch (error) {
          //annuler l'ensemble des requetes de la transaction si l'une des requetes a échoué
          connection.rollback();
    
          // si la requète a échoée
          return error;
        }
      };

   
}

export default SecurityRepository;