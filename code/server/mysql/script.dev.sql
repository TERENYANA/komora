-- créer une base de données
-- ATTENTION uniquement en dévelopment
DROP DATABASE IF EXISTS komora_dev;
CREATE DATABASE komora_dev;

-- créer les tables
-- commencer par les tables n'ayant pas de clés étrangères
-- CREATE TABLE komora_dev;

CREATE TABLE komora_dev.role(
    id TINYINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(50)    
);



CREATE TABLE komora_dev.brand(
    id TINYINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(50) NOT NULL
);

CREATE TABLE komora_dev.address(
    id TINYINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(300) NOT NULL 
);

CREATE TABLE komora_dev.category(
    id TINYINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(50) NOT NULL UNIQUE,
    parent_id TINYINT UNSIGNED,
    FOREIGN KEY (parent_id) REFERENCES category(id )
);



CREATE TABLE komora_dev.user(
    id TINYINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    firstname VARCHAR(50) NOT NULL,
    lastname VARCHAR(50) NOT NULL,
    email VARCHAR(50) NOT NULL UNIQUE,
    password CHAR(60) NOT NULL,
    number VARCHAR(15) NOT NULL,
    address VARCHAR(300) NOT NULL,
    city VARCHAR(50)  NOT NULL,
    role_id TINYINT UNSIGNED ,
    FOREIGN KEY(role_id) REFERENCES role(id)
);

CREATE TABLE komora_dev.user_address(
user_id TINYINT UNSIGNED,
address_id TINYINT UNSIGNED ,
FOREIGN KEY (address_id) REFERENCES address(id),
FOREIGN KEY (user_id) REFERENCES user(id),
-- clé primaire composite
PRIMARY KEY (address_id, user_id)
);



CREATE TABLE komora_dev.orders(
    id TINYINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    totalprice DECIMAL (10, 2) NOT NULL,
    date DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL,
    user_id  TINYINT UNSIGNED,
    FOREIGN KEY (user_id) REFERENCES user(id)
);

CREATE TABLE komora_dev.product(
    id TINYINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(50) NOT NULL,
    description TEXT NOT NULL,
    price DECIMAL(10,2) UNSIGNED NOT NULL,
    imageURL VARCHAR (255) NOT NULL,
    weight  DECIMAL(10,3) UNSIGNED,
    stock INT UNSIGNED,
    category_id TINYINT UNSIGNED,
    brand_id TINYINT UNSIGNED,
    FOREIGN KEY(category_id) REFERENCES category(id),
    FOREIGN KEY(brand_id) REFERENCES brand(id)
);


CREATE TABLE komora_dev.order_detail(
    id TINYINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    quantity TINYINT NOT NULL,
    product_id TINYINT UNSIGNED,
    orders_id TINYINT UNSIGNED,
    FOREIGN KEY(product_id) REFERENCES product(id),
    FOREIGN KEY(orders_id) REFERENCES orders(id)
);

-- créer des enregistrements
-- commencer par les tables n'ayant pas de clés etragères
-- pour la PK, utiliser NULL pour l'auto-incrémentation

INSERT INTO komora_dev.role
VALUES
    (NULL, 'admin'),
    (NULL, 'user')
    ;

INSERT INTO komora_dev.brand
VALUES
    (NULL, 'Lays'),
    (NULL, 'Cichorium'),
    (NULL, 'Torchyn')
    ;

INSERT INTO komora_dev.address
VALUES
    (NULL, 'Freedom Square'),
    (NULL, 'Funny Square'),
    (NULL, 'Cold Square'),
    (NULL, 'Main Street'),
    (NULL, 'Garden Avenue'),
    (NULL, 'Baker Street')
;

INSERT INTO komora_dev.category
VALUES
    (NULL, 'Products', NULL),
    (NULL, 'Honey & Jam', NULL),
    (NULL, 'Chocolate', NULL),
    (NULL, 'Bakery', NULL),
    (NULL, 'Daily', 1),
    (NULL, 'Meat', 5),
    (NULL, 'Fish', 5),
    (NULL, 'Dairy', 1),
    (NULL, 'Ethnic', 1),
    (NULL, 'Cereals', 1),
    (NULL, 'Fizzy drinks', 1),
    (NULL, 'Alcohol', 1),
    (NULL, 'Sweets', 1),
    (NULL, 'Snacks', 1),
    (NULL, 'Chemicals', 1)
;

INSERT INTO komora_dev.user
VALUES
    (NULL, 'Roman', 'Kovalchuk', 'omniagapao@gmail.com', '12345678', '+353871096850', 'Liberty Square', 'Thurles', 1 ),
    (NULL, 'Yana', 'Yuskiv', 'jmniagapao47@gmail.com', '7676787', '+788776656577', 'Sun Square', 'Paris', 2 ),
    (NULL, 'Julia', 'Teren', 'jul@gmail.com','6776678877', '+8776545987', 'Candy Square', 'Paris', 2 ),
    (NULL, 'Andriy', 'Shevchenko', 'andriy.shev@gmail.com', 'password123', '+380671234567', 'Shevchenko Avenue', 'Kyiv', 1),
    (NULL, 'Elena', 'Morozova', 'elena.moroz@gmail.com', 'elena2024', '+74951234567', 'Red Square', 'Moscow', 2),
    (NULL, 'Lucas', 'Dubois', 'lucas.dubois@gmail.com', 'lucas@123', '+33611223344', 'Rue de Rivoli', 'Paris', 2),
    (NULL, 'Sophie', 'Martin', 'sophie.martin@gmail.com', 'sophie!321', '+33456789012', 'La Canebière', 'Marseille', 2),
    (NULL, 'Carlos', 'Garcia', 'carlos.garcia@gmail.com', 'carlos456', '+34678901234', 'Gran Via', 'Madrid', 2),
    (NULL, 'Maria', 'Fernandez', 'maria.fernandez@gmail.com', 'maria654', '+34987654321', 'Calle Mayor', 'Barcelona', 2),
    (NULL, 'Tom', 'Smith', 'tom.smith@gmail.com', 'tompassword', '+441234567890', 'Baker Street', 'London', 2),
    (NULL, 'Emily', 'Brown', 'emily.brown@gmail.com', 'emily789', '+447890123456', 'Oxford Street', 'London', 2),
    (NULL, 'David', 'Chen', 'david.chen@gmail.com', 'david1234', '+85212345678', 'Nathan Road', 'Hong Kong', 2),
    (NULL, 'Yuki', 'Tanaka', 'yuki.tanaka@gmail.com', 'yuki098', '+81312345678', 'Shibuya', 'Tokyo', 2),
    (NULL, 'Lina', 'Berg', 'lina.berg@gmail.com', 'lina!pass', '+49123456789', 'Alexanderplatz', 'Berlin', 2)
 ;

INSERT INTO komora_dev.user_address
VALUES
    (1,6),
    (2,3),
    (3,5),
    (4,4),
    (1,2),
    (1,3)
;

INSERT INTO komora_dev.orders
VALUES
    (NULL,49.99, '2024-10-30 14:20:00', 1),
    (NULL,29.50, '2024-10-29 10:15:00', 2),
    (NULL,75.20, '2024-10-28 18:30:00', 3),
    (NULL,120.00, '2024-10-27 12:00:00', 4),
    (NULL,15.99, '2024-10-26 09:45:00', 5),
    (NULL,59.95, '2024-10-25 13:10:00', 6),
    (NULL,23.75, '2024-10-24 11:25:00', 7),
    (NULL,89.30, '2024-10-23 17:55:00', 8),
    (NULL,150.00, '2024-10-22 15:40:00', 9),
    (NULL,199.99, '2024-10-21 19:00:00', 10),
    (NULL,45.60, '2024-10-20 08:05:00', 11)
;

INSERT INTO komora_dev.product
VALUES
    (NULL,'Chips Nature', 'Chips nature croustillantes', 1.50, 'https://example.com/chips.jpg', 0.15, 100, 1, 1),
    (NULL,'Salade de Chicorée', 'Salade de chicorée fraîche', 2.99, 'https://example.com/chicoree.jpg', 0.50, 50, 2, 2),
    (NULL,'Sauce Tomate', 'Sauce tomate épicée', 3.25, 'https://example.com/sauce_tomate.jpg', 0.30, 75, 3, 3),
    (NULL,'Chips au Paprika', 'Chips croquantes au goût intense de paprika', 1.75, 'https://example.com/chips_paprika.jpg', 0.150, 120, 1, 1),
    (NULL,'Chicorée Bio', 'Chicorée biologique pour les salades', 3.50, 'https://example.com/chicoree_bio.jpg', 0.40, 60, 2, 2),
    (NULL,'Sauce Barbecue', 'Sauce barbecue fumée idéale pour les grillades', 2.99, 'https://example.com/sauce_bbq.jpg', 0.350, 80, 3, 3),
    (NULL,'Chips Saveur Fromage', 'Chips croustillantes à la saveur intense de fromage', 1.85, 'https://example.com/chips_fromage.jpg', 0.15, 90, 1, 1),
    (NULL,'Chicorée en Poudre', 'Chicorée en poudre pour boissons chaudes', 2.50, 'https://example.com/chicoree_poudre.jpg', 0.200, 100, 2, 2),
    (NULL,'Ketchup Epicé', "Ketchup avec un mélange d\'épices piquantes", 2.75, 'https://example.com/ketchup_epice.jpg', 0.30, 150, 3, 3),
    (NULL,'Chips Sel et Vinaigre', 'Chips au goût audacieux de sel et de vinaigre', 1.90, 'https://example.com/chips_sel_vinaigre.jpg', 0.15, 110, 1, 1),
    (NULL,'Chicorée Rôtie', 'Chicorée rôtie pour une saveur plus intense', 3.20, 'https://example.com/chicoree_rotie.jpg', 0.25, 70, 2, 2)
    ;

INSERT INTO komora_dev.order_detail
VALUES
    (NULL,5,1,1),
    (NULL,7,9,2),
    (NULL,5,1,3),
    (NULL,13,4,1),
    (NULL,9,1,5),
    (NULL,3,8,1),
    (NULL,5,7,6)
;




-- modifier des enregistrements
-- UPDATE projet_dev.school
-- SET permet de cibler les colonnes à mettre à jour , et leur affectuer une nouvelle valeur 
-- SET 
-- school.manager = 
-- WHERE permet de créer une condition ,cibler une colonne et une valeur
-- supprimer un enregistrement
-- DELETE FROM projet_dev.school

