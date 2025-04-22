import MySQLService from "../service/mysql_service.js";
import type Address from "../model/Address.js";
class AddressRepository {
  private table = "address";
  public selectAll = async (): Promise<Address[] | unknown> => {
    const connection = await new MySQLService().connect();
    const sql = `
            SELECT 
                ${this.table}.*
            FROM
                ${process.env.MYSQL_DATABASE}.${this.table};`;
    try {
      const [results] = await connection.execute(sql);

      return results;
    } catch (error) {
      return error;
    }
  };
  // récupérer les enregistrement selon une liste
  public selectInList = async (list: string): Promise<Address[] | unknown> => {
    //connexion au serveur MYSQL
    const connection = await new MySQLService().connect();

    // SELECT classroom. * FROM
    const sql = `
            SELECT 
                ${this.table}.*
            FROM
                ${process.env.MYSQL_DATABASE}.${this.table}
            WHERE
                ${this.table}.id IN (${list})
                ;`;

    try {
      const [results] = await connection.execute(sql);

      return results;
    } catch (error) {
      return error;
    }
  };
  public selectOne = async (
    data: Partial<Address>
  ): Promise<Address | unknown> => {
    //connexion au serveur MySQL
    //récupérer un enregistrement par sa clé primaire

    const connection = await new MySQLService().connect();

    const sql = `
        SELECT 
            ${this.table}.*
        FROM
            ${process.env.MYSQL_DATABASE}.${this.table}
        WHERE 
             ${this.table}.id = :id;`;
    try {
      const [results] = await connection.execute(sql, data);

      const result = (results as Address[]).shift();
      return result;
    } catch (error) {
      return error;
    }
  };
  public insert = async (data: Partial<Address>): Promise<Address | unknown> => {
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
    :name
           )
        ;
        `;
    //exécuter la requête
    // try / catch permet d'exécuter une instruction , si l'instruction échoue , une error est récupéree
    try {
      //créer une transaction SQL
     

      //exécuter la premiere requête
      await connection.execute(sql, data);

      //créer une variable SQL stockant le dernier identifiiant créer
      sql = `
           SET @id = LAST_INSERT_ID();
          `;

      await connection.execute(sql, data);
      // deuxieme requete SQL de la transaction
      ///1,2,3 >> (NULL,@id,1),(NULL,@id,2),(NULL,@id,3)
      //split [1,2,3]
      //join fait la chaine de caractere
    

     

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

      // si la requète a échoée
      return error;
    }
  };
  public update = async (
    data: Partial<Address>
  ): Promise<Address | unknown> => {
    //connexion au serveur MySQL
    //récupérer un enregistrement par sa clé primaire

    const connection = await new MySQLService().connect();

    // roquête SQL
    //ctéer une variable de requete SQL en préfixant le nom d'une variable par:

    const sql = `
    UPDATE
     ${process.env.MYSQL_DATABASE}.${this.table}
    SET 
       ${this.table}.name = :name
    WHERE
       ${this.table}.id = :id 
    ;
    `
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
      return results;
    } catch (error) {
      // si la requète a échoée
      return error;
    }
  };
  public delete = async (
    data: Partial<Address>
  ): Promise<Address | unknown> => {
    //connexion au serveur MySQL
    //récupérer un enregistrement par sa clé primaire

    const connection = await new MySQLService().connect();

    // roquête SQL
    //ctéer une variable de requete SQL en préfixant le nom d'une variable par:

    const sql = `
    DELETE FROM
     ${process.env.MYSQL_DATABASE}.${this.table}
    WHERE
       ${this.table}.id = :id 
    ;
    `
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
      return results;
    } catch (error) {
      // si la requète a échoée
      return error;
    }
  };
}

export default AddressRepository;
