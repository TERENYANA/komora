import MySQLService from "../service/mysql_service.js";
import type User from "../model/User.js";
import RoleRepository from "./role_repository.js";
import type Role from "../model/Role.js";
import AddressRepository from "./address_repository.js";
import type Address from "../model/Address.js";

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
             JOIN
                ${process.env.MYSQL_DATABASE}.role
             ON
                role.id = ${this.table}.role_id
             LEFT JOIN
                ${process.env.MYSQL_DATABASE}.user_address
             ON
                user_address.user_id = ${this.table}.id
             LEFT JOIN
                ${process.env.MYSQL_DATABASE}.address
             ON
                user_address.address_id=address.id
             GROUP BY 
                ${this.table}.id
            ;`;
    try {
      const [results] = await connection.execute(sql);
      for (let i = 0; i < (results as User[]).length; i++) {
        const result = (results as User[])[i];

        result.role = (await new RoleRepository().selectOne({
          id: result.role_id,
        })) as Role;

        result.addresses = (await new AddressRepository().selectInList(
          result.address_ids
        )) as Address[];
      }
      return results;
    } catch (error) {
      return error;
    }
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

        LEFT JOIN
            ${process.env.MYSQL_DATABASE}.user_address
        ON
            user_address.user_id = ${this.table}.id
        LEFT JOIN
            ${process.env.MYSQL_DATABASE}.address
        ON
            user_address.address_id = address.id
        WHERE 
             ${this.table}.id = :id
        GROUP BY 
            ${this.table}.id
        ;`;
    try {
      const [results] = await connection.execute(sql, data);

      const result = (results as User[]).shift() as User;

      result.role = (await new RoleRepository().selectOne({
        id: result.role_id,
      })) as Role;

      result.addresses = (await new AddressRepository().selectInList(
        result.address_ids
      )) as Address[];

      return result;
    } catch (error) {
      return error;
    }
  };

  // choose one user by it's email
  public selectOneByEmail = async (email: string) : Promise<User | unknown> => {
    //connexion au serveur MySQL
    //récupérer un enregistrement par sa clé primaire

    const connection = await new MySQLService().connect();

    const sql = `
        SELECT 
            ${this.table}.*
        FROM
            ${process.env.MYSQL_DATABASE}.${this.table}
        WHERE 
             ${this.table}.email = :email
        ;`;
    try {
      const [results] = await connection.execute(sql, { email: email });

      const result = (results as User[]).shift() as User;



      return result;
    } catch (error) {
      return error;
    }
  };

  public update = async (data: Partial<User>): Promise<User | unknown> => {
    //connexion au serveur MySQL
    //récupérer un enregistrement par sa clé primaire

    const connection = await new MySQLService().connect();

    // roquête SQL
    //ctéer une variable de requete SQL en préfixant le nom d'une variable par:

    let sql = `
        UPDATE
         ${process.env.MYSQL_DATABASE}.${this.table}
        SET 
    ${this.table}.firstname = :firstname ,
    ${this.table}.lastname = :lastname ,
    ${this.table}.email = :email,
    ${this.table}.password = :password,
    ${this.table}.number = :number,
    ${this.table}.role_id = :role_id
        WHERE
           ${this.table}.id = :id 
        ;
        `;
    //exécuter la requête
    // try / catch permet d'exécuter une instruction , si l'instruction échoue , une error est récupéree

    try {
      //créer une transaction SQL
      connection.beginTransaction();

      //éxécuter la première roquete
      await connection.execute(sql, data);

      //deuxième roquete
      sql = `
        DELETE FROM
         ${process.env.MYSQL_DATABASE}.user_address
        WHERE
           user_address.user_id = :id
        ;
        `;
      await connection.execute(sql, data);

      // deuxieme requete SQL de la transaction
      ///1,2,3 >> (NULL,@id,1),(NULL,@id,2),(NULL,@id,3)
      //split [1,2,3]
      //join fait la chaine de caractere
      const values = data.address_ids
        ?.split(",")
        .map((item) => `(:id,${item})`)
        .join(",");

      sql = `
        INSERT INTO
         ${process.env.MYSQL_DATABASE}.user_address
        VALUES
         ${values}
          ;
         `;
      //récupérer les résultat de la requète
      //resultes represente le premier indice du du arrey
      // requetes préparées
      //data permet de définir une valeur aux variable de reequêtes SQL
      const [results] = await connection.execute(sql, data);
      //si la requête a réussie

      //valider la transaction lorsque l'ensemble des requetes d'une transaction ont réussi
      connection.commit();

      //récupérer le premier indice dan array

      return results;
    } catch (error) {
      //annuler l'ensemble des requetes de la transaction si l'une des requetes a échoué
      connection.rollback();

      // si la requète a échoée
      return error;
    }
  };

  public delete = async (data: Partial<User>): Promise<User | unknown> => {
    //connexion au serveur MySQL
    //récupérer un enregistrement par sa clé primaire

    const connection = await new MySQLService().connect();

    // roquête SQL
    //ctéer une variable de requete SQL en préfixant le nom d'une variable par:

    let sql = `

    DELETE FROM
     ${process.env.MYSQL_DATABASE}.user_address
    
    WHERE
      user_address.user_id = :id 
    ;
    `;
    //exécuter la requête
    // try / catch permet d'exécuter une instruction , si l'instruction échoue , une error est récupéree
    try {
      connection.beginTransaction();
      //executer la première roquète
      await connection.execute(sql, data);
      sql = `
    DELETE FROM
     ${process.env.MYSQL_DATABASE}.${this.table}
    WHERE
       ${this.table}.id = :id 
    ;
    `;

      //récupérer les résultat de la requète
      //resultes represente le premier indice du du arrey
      // requetes préparées
      //data permet de définir une valeur aux variable de reequêtes SQL
      const [results] = await connection.execute(sql, data);

      //si la requête a réussie
      //récupérer le premier indice dan array
      connection.commit();
      return results;
    } catch (error) {
      connection.rollback();
      // si la requète a échoée
      return error;
    }
  };
}


export default UserRepository;
