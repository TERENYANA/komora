import supertest from "supertest";
import { describe, it, expect, should } from "vitest";
import Server from "../../src/core/server";
import jwt from "jsonwebtoken";
describe("student controller tests suite", async () => {
	//utiliser un admin
	const admin = {
		id: 2,
		firstname: "Yana",
		lastname: "Yuskiv",
		email: "yanayuskiv6447@gmail.com",
		password:
			"3a73bac7492c46086a019a479dd39d8ebae355b92797e07f8f16008a2e0f15acaU48TFIFwLdimmXyNlA0UenJx7b/hOb0U+HSYcZtzuc=49cd01095ac02512772b5e0894457a5d6122703172ebfe3b3855bbb4aa4bf560",
		number: "+33780158257",
		role_id: 1,
		address_ids: "3",
		role: {
			id: 1,
			name: "admin",
		},
		addresses: [
			{
				id: 3,
				name: "Mountjoy Square, Dublin 1, Ireland",
			},
		],
		key: "a1616485002f9f93c6ce106bf58eabd2",
	};
	const token = jwt.sign({ user: admin }, process.env.JWT_KEY as string, {
		expiresIn: 30,
	});

	const values = {
		name: "TOTOTEST",
		description: "TOTOTEST",
		price: "1.00",
		imageURL: "Programming-Memes-1494686345.jpg",
		weight: "1.000",
		stock: 1,
		category_id: 1,
		brand_id: 1,
	};
	it("should return 200 code status", async () => {
		//arrenge -organiser des tests
		const expected = 200;
		//act
		const sut = await supertest(new Server().create()).get("/product");
		const actual = sut.status;
		//assert
		expect(actual).toBe(expected);
	});

	it("should get one product ", async () => {
		const expected = 1;
		const sut = await supertest(new Server().create()).get("/product/1");
		const actual = sut.body.data.id;
		expect(actual).toBe(expected);
	});
	it("should create one product", async () => {
		const expected = 201;
		const sut = await supertest(new Server().create())
			.post("/product")
			.auth(token, { type: "bearer" })
			.field("name", values.name)
			.field("description", values.description)
			.field("price", values.price)
			.field("imageURL", `${process.env.ASSETS_DIR}/img/${values.imageURL}`)
			.field("weight", values.weight)
			.field("stock", values.stock)
			.field("category_id", values.category_id)
			.field("brand_id", values.brand_id);
		const actual = sut.status;
		// console.log(sut);
		/* 
si le formulaire possède un fishier :utiliser les méthodes field et attach
si la formulaire ne possede pas de fishier :utiliser la méthode send
*/

		expect(actual).toBe(expected);
	});
});

// "email",Math.random() + values.email
