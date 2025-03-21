-- créer une base de données
-- ATTENTION uniquement en dévelopment
DROP DATABASE IF EXISTS komora_dev;

-- créer une base de données
CREATE DATABASE komora_dev;
USE komora_dev;

-- créer les tables
-- commencer par les tables n'ayant pas de clés étrangères
-- CREATE TABLE komora_dev;

-- Create tables (starting with no foreign keys)
CREATE TABLE role (
    id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(50) NOT NULL UNIQUE
);

CREATE TABLE brand (
    id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(50) NOT NULL UNIQUE
);

CREATE TABLE address (
    id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(300) NOT NULL 
);

CREATE TABLE category (
    id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(50) NOT NULL UNIQUE
);

CREATE TABLE user (
    id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    firstname VARCHAR(50) NOT NULL,
    lastname VARCHAR(50) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(250) NOT NULL,
    number VARCHAR(15) NOT NULL,
    role_id INT UNSIGNED NOT NULL,
    FOREIGN KEY (role_id) REFERENCES role(id)
);

CREATE TABLE user_address (
    user_id INT UNSIGNED,
    address_id INT UNSIGNED,
    FOREIGN KEY (user_id) REFERENCES user(id),
    FOREIGN KEY (address_id) REFERENCES address(id),
    PRIMARY KEY (user_id, address_id)
);

CREATE TABLE orders (
    id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    totalprice DECIMAL(10, 2) NOT NULL,
    date DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL,
    user_id INT UNSIGNED NOT NULL,
    FOREIGN KEY (user_id) REFERENCES user(id) 
);

CREATE TABLE product (
    id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(150) NOT NULL,
    description TEXT NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    imageURL VARCHAR(255) NOT NULL,
    weight DECIMAL(10, 3) UNSIGNED,
    stock INT UNSIGNED DEFAULT 0,
    category_id INT UNSIGNED NOT NULL,
    brand_id INT UNSIGNED NOT NULL,
    FOREIGN KEY (category_id) REFERENCES category(id),
    FOREIGN KEY (brand_id) REFERENCES brand(id) 
);

CREATE TABLE order_detail (
    id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    quantity TINYINT NOT NULL CHECK (quantity > 0),
    product_id INT UNSIGNED,
    orders_id INT UNSIGNED NOT NULL,
    FOREIGN KEY (product_id) REFERENCES product(id),
    FOREIGN KEY (orders_id) REFERENCES orders(id)
);

-- Insert data (starting with tables without foreign keys)
INSERT INTO role
VALUES
    (NULL, 'admin'),
    (NULL, 'user');

INSERT INTO brand
VALUES
    (NULL, 'Komora Shop'),
    (NULL, 'Galychyna'),
    (NULL, 'Torchyn'),
    (NULL, 'Hlibny Dar'),
    (NULL, 'Slavutich');

INSERT INTO address
VALUES
    (NULL, 'Abbey Street Lower, Dublin 1, Ireland'),
    (NULL, 'Merrion Street Upper, Dublin 2, Ireland'),
    (NULL, 'Mountjoy Square, Dublin 1, Ireland'),
    (NULL, 'Grafton Street, Dublin 2, Ireland'),
    (NULL, 'Leeson Street Upper, Dublin 4, Ireland');

INSERT INTO category
VALUES
    (NULL, 'Honey & Jam'),
    (NULL, 'Bakery'),
    (NULL, 'Groceries'),
    (NULL, 'Dairy'),
    (NULL, 'Ethnic'),
    (NULL, 'Cereals'),
    (NULL, 'Soft Drinks'),
    (NULL, 'Snacks');

INSERT INTO user
VALUES
    (NULL, 'Juliia', 'Terentiak', 'uterentiak@gmail.com', '$argon2i$v=19$m=16,t=2,p=1$Z21zaXVOQnFDWHBJV1lWMg$eI2exEPqicb8N2qFy4qCog', '+330751566772', 2),
    (NULL, 'Yana', 'Yuskiv', 'yanayuskiv6447@gmail.com', '$argon2i$v=19$m=16,t=2,p=1$Z21zaXVOQnFDWHBJV1lWMg$omD5dfkMVcRU0vse/at0Kg', '+33780158257', 1), 
    (NULL, 'Emma', 'Murphy', 'emma.murphy567@gmail.com', '$argon2i$v=19$m=16,t=2,p=1$Z21zaXVOQnFDWHBJV1lWMg$SikYy9Nd3QBAHGOLEaodqw', '+353852345678', 2),  
    (NULL, 'Sean', 'Doyle', 'sean.doyle890@gmail.com', '$argon2i$v=19$m=16,t=2,p=1$Z21zaXVOQnFDWHBJV1lWMg$40vt6eL9LplLLRBPn8IFXQ', '+353861456789', 2);

INSERT INTO user_address
VALUES
    (1, 2),
    (2, 3),
    (3, 4),
    (4, 1);

INSERT INTO orders
VALUES
    (NULL, 38.97, '2024-10-30 14:20:00', 1), 
    (NULL, 28.98, '2024-10-29 10:15:00', 2), 
    (NULL, 69.95, '2024-10-28 18:30:00', 3);

INSERT INTO product
VALUES
    (NULL, 'Lipovyi Med - Linden Honey', 'Known for its light color and floral aroma, this honey is highly valued for its medicinal properties, especially for colds and sore throats.', 12.99, 'https://example.com/images/linden_honey.jpg', 0.500, 100, 1, 1),  
    (NULL, 'Hirskyi Med - Carpathian Mountain Honey', 'Collected from wildflowers in the Carpathian Mountains, this honey has a rich and diverse taste, depending on the flowers available.', 14.49, 'https://example.com/images/carpathian_honey.jpg', 0.500, 80, 1, 1),  
    (NULL, 'Hrechanyi Med - Buckwheat Honey', 'Dark and rich in flavor, this honey has strong antioxidant properties and a distinctive malty taste.', 13.99, 'https://example.com/images/buckwheat_honey.jpg', 0.500, 90, 1, 1),
    (NULL, 'Pampushky', 'Soft, fluffy garlic bread rolls often served with borscht.', 3.99, 'images/pampushky.jpg', 0.250, 50, 2, 1),  
    (NULL, 'Varenyky', 'Dumplings made with yeast or unleavened dough, filled with sweet or savory fillings.', 5.49, 'images/varenyky.jpg', 0.300, 100, 2, 1), 
    (NULL, 'Blini', 'Thin pancakes served with sour cream, jam, or caviar.', 4.99, 'images/blini.jpg', 0.200, 80, 2, 1),
    (NULL, 'Kovbasa', 'Traditional Ukrainian smoked sausage made from pork and spices.', 9.99, 'images/kovbasa.jpg', 0.500, 50, 3, 1),  
    (NULL, 'Salo', 'Cured pork fat, often served with garlic and black bread.', 6.49, 'images/salo.jpg', 0.400, 70, 3, 1),  
    (NULL, 'Pelmeni', 'Russian dumplings filled with minced meat, usually beef or pork.', 7.99, 'images/pelmeni.jpg', 0.500, 100, 3, 1), 
    (NULL, 'Vobla', 'Dried and salted fish, a popular snack in Ukraine and Russia.', 5.99, 'images/vobla.jpg', 0.300, 50, 3, 1),  
    (NULL, 'Forshmak', 'Traditional Jewish-Russian spread made from herring, apples, and onions.', 7.49, 'images/forshmak.jpg', 0.250, 40, 3, 1),  
    (NULL, 'Ikra', 'Salted fish roe, often served as a delicacy with bread or blini.', 15.99, 'images/ikra.jpg', 0.200, 30, 3, 1), 
    (NULL, 'Ryazhenka', 'A traditional Ukrainian fermented baked milk with a creamy, caramelized flavor.', 3.99, 'images/ryazhenka.jpg', 0.500, 50, 4, 2),  
    (NULL, 'Kefir', 'A probiotic-rich fermented milk drink, popular in Eastern European cuisine.', 2.99, 'images/kefir.jpg', 1.000, 80, 4, 2),  
    (NULL, 'Smetana', 'A thick, tangy sour cream used in soups, sauces, and desserts.', 4.49, 'images/smetana.jpg', 0.400, 60, 4, 2),  
    (NULL, 'Tvorog', 'A fresh, crumbly farmer’s cheese commonly used in Slavic cuisine.', 5.99, 'images/tvorog.jpg', 0.500, 40, 4, 2),
    (NULL, 'Adjika', 'A spicy Georgian sauce made from red peppers, garlic, and herbs, perfect for meat and vegetables.', 4.99, 'images/adjika.jpg', 0.250, 60, 5, 3),  
    (NULL, 'Tkemali', 'A sour plum sauce from Georgia, used as a condiment for grilled meats and potatoes.', 5.49, 'images/tkemali.jpg', 0.300, 50, 5, 3),  
    (NULL, 'Horseradish Sauce (Hren)', 'A strong and spicy condiment made from grated horseradish, popular in Slavic cuisine.', 3.99, 'images/hren.jpg', 0.200, 70, 5, 3), 
    (NULL, 'Grechka (Buckwheat)', 'A nutritious, gluten-free cereal made from buckwheat, often enjoyed as a porridge or side dish.', 3.49, 'images/grechka.jpg', 0.400, 80, 6, 4),  
    (NULL, 'Kasha', 'A traditional Eastern European dish made from buckwheat, usually served as a savory side or breakfast porridge.', 3.99, 'images/kasha.jpg', 0.500, 100, 6, 4),  
    (NULL, 'Barley Groats', 'A wholesome cereal made from barley, perfect for hearty soups, stews, or as a nutritious side dish.', 2.99, 'images/barley_groats.jpg', 0.400, 90, 6, 4),
    (NULL, 'Kvas', 'A traditional fermented Slavic beverage made from rye bread, slightly sweet with a tangy taste.', 2.49, 'images/kvas.jpg', 0.500, 120, 7, 5),  
    (NULL, 'Kompot', 'A sweet fruit drink made by boiling fresh fruit, often served chilled as a refreshing beverage.', 3.49, 'images/kompot.jpg', 1.000, 90, 7, 5),  
    (NULL, 'Tarhun', 'A popular Soviet-era green tarragon soda with a unique herbal flavor and sweetness.', 1.99, 'images/tarhun.jpg', 0.500, 150, 7, 5),  
    (NULL, 'Sprite', 'A well-known lemon-lime soda, refreshing with a crisp and sweet flavor.', 1.29, 'images/sprite.jpg', 0.330, 200,7, 5),
    (NULL, 'Sunflower Seeds', 'Roasted sunflower seeds, a crunchy and salty snack, perfect for munching on the go.', 1.99, 'images/sunflower_seeds.jpg', 0.150, 200, 8, 1),  
    (NULL, 'Potato Chips', 'Crispy, thinly sliced potatoes fried to perfection with a salty flavor.', 2.49, 'images/potato_chips.jpg', 0.200, 150, 8, 1),  
    (NULL, 'Puffed Corn', 'Light and crispy puffed corn snack, perfect for satisfying your snack cravings with a mild salty taste.', 2.79, 'images/puffed_corn.jpg', 0.250, 120, 8, 1),  
    (NULL, 'Cheese Balls', 'Crunchy corn-based cheese-flavored snack, a popular treat for kids and adults alike.', 3.29, 'images/cheese_balls.jpg', 0.200, 180, 8, 2);

INSERT INTO order_detail
VALUES
    (NULL, 3, 1, 1),
    (NULL, 2, 2, 2), 
    (NULL, 5, 3, 3);




-- modifier des enregistrements
-- UPDATE projet_dev.school
-- SET permet de cibler les colonnes à mettre à jour , et leur affectuer une nouvelle valeur 
-- SET 
-- school.manager = 
-- WHERE permet de créer une condition ,cibler une colonne et une valeur
-- supprimer un enregistrement
-- DELETE FROM projet_dev.school

