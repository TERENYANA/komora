import MySQLService from "../service/mysql_service.js";
import type Product from "../model/Product.js";
import CategoryRepository from "./category_repository.js";
import type Category from "../model/Category.js";
import BrandRepository from "./brand_repository.js";
import type Brand from "../model/Brand.js";

class ProductRepository {
	private table = "product";
	public selectAll = async (): Promise<Product[] | unknown> => {
		//connexion au serveur MySQL

		//récupérer un enregistrement par sa clé primaire
		const connection = await new MySQLService().connect();
		// roquête SQL
		const sql = `
            SELECT 
                ${this.table}.*
             FROM
                ${process.env.MYSQL_DATABASE}.${this.table}
             LEFT JOIN 
                ${process.env.MYSQL_DATABASE}.category
             ON
                category.id = ${this.table}.category_id
             LEFT JOIN 
                ${process.env.MYSQL_DATABASE}.brand
             ON
                brand.id = ${this.table}.brand_id
            ;`;
		//exécuter la requête
		// try / catch permet d'exécuter une instruction , si l'instruction échoue , une error est récupéree
		try {
			//récupérer les résultat de la requète
			//resultes represente le premier indice du du arrey
			const [results] = await connection.execute(sql);
			for (let i = 0; i < (results as Product[]).length; i++) {
				const result = (results as Product[])[i];

				result.category = (await new CategoryRepository().selectOne({
					id: result.category_id,
				})) as Category;

				result.brand = (await new BrandRepository().selectOne({
					id: result.brand_id,
				})) as Brand;

				//si la requête a réussie
			}
			return results;
		} catch (error) {
			// si la requète a échoée
			return error;
		}
	};
	public selectOne = async (
		data: Partial<Product>,
	): Promise<Product | unknown> => {
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
             LEFT JOIN 
                ${process.env.MYSQL_DATABASE}.category
             ON
                category.id = ${this.table}.category_id
             LEFT JOIN 
                ${process.env.MYSQL_DATABASE}.brand
             ON
                brand.id = ${this.table}.brand_id
              WHERE
                 ${this.table}.id = :id

              ;
                `;
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
			const result = (results as Product[]).shift();
			return result;
		} catch (error) {
			// si la requète a échoée
			return error;
		}
	};
	public selectByCategory = async (
		data: Partial<Category>,
	): Promise<Category | unknown> => {
		//connexion au serveur MySQL

		//récupérer un enregistrement par sa clé primaire

		const connection = await new MySQLService().connect();

		// roquête SQL
		const sql = `
            SELECT 
                ${this.table}.*
             FROM
                ${process.env.MYSQL_DATABASE}.${this.table}
             LEFT JOIN 
                ${process.env.MYSQL_DATABASE}.category
             ON
                category.id = ${this.table}.category_id
             LEFT JOIN 
                ${process.env.MYSQL_DATABASE}.brand
             ON
                brand.id = ${this.table}.brand_id
            WHERE
              ${this.table}.category_id=:id
            ;`;
		//exécuter la requête
		// try / catch permet d'exécuter une instruction , si l'instruction échoue , une error est récupéree
		try {
			//récupérer les résultat de la requète
			//resultes represente le premier indice du du arrey
			const [results] = await connection.execute(sql, data);
			for (let i = 0; i < (results as Product[]).length; i++) {
				const result = (results as Product[])[i];

				result.category = (await new CategoryRepository().selectOne({
					id: result.category_id,
				})) as Category;

				result.brand = (await new BrandRepository().selectOne({
					id: result.brand_id,
				})) as Brand;

				//si la requête a réussie
			}
			return results;
		} catch (error) {
			// si la requète a échoée
			return error;
		}
	};
	//creer un enregistrement
	public insert = async (
		data: Partial<Product>,
	): Promise<Product | unknown> => {
		//connexion au serveur MySQL
		//récupérer un enregistrement par sa clé primaire
		const connection = await new MySQLService().connect();
		// roquête SQL
		//ctéer une variable de requete SQL en préfixant le nom d'une variable par:
		const sql = `
    INSERT INTO
     ${process.env.MYSQL_DATABASE}.${this.table}
    VALUE 
     ( 
       NULL,
       :name,
       :description,
       :price,
       :imageURL,
       :weight,
       :stock,
       :category_id,
       :brand_id
       )
    ;
    `;
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
	public update = async (
		data: Partial<Product>,
	): Promise<Product | unknown> => {
		//connexion au serveur MySQL
		//récupérer un enregistrement par sa clé primaire

		const connection = await new MySQLService().connect();

		// roquête SQL
		//ctéer une variable de requete SQL en préfixant le nom d'une variable par:

		const sql = `
    UPDATE
     ${process.env.MYSQL_DATABASE}.${this.table}
    SET 
       ${this.table}.name = :name,
       ${this.table}.description = :description,
       ${this.table}.price = :price,
       ${this.table}.imageURL = :imageURL,
       ${this.table}.weight = :weight,
       ${this.table}.stock = :stock,
       ${this.table}.category_id = :category_id,
       ${this.table}.brand_id = :brand_id
    WHERE
       ${this.table}.id = :id 
    ;
    `;
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
		data: Partial<Product>,
	): Promise<Product | unknown> => {
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
    `;
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
export default ProductRepository;
