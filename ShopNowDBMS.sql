create database auth_system1;
use  auth_system1;

select * from accounts_useraccount;

CREATE TABLE electronics (
    id INT AUTO_INCREMENT PRIMARY KEY,
    url VARCHAR(255),
    name VARCHAR(255),
    price DECIMAL(10, 2),
    what VARCHAR(255),
    quantity INT
);



INSERT INTO accounts_electronics (url, name, price, what, quantity) VALUES
('https://i1.wp.com/images.priceoye.pk/apple-iphone-11-pro-max-pakistan-priceoye-uijqj.jpg?ssl=1', 'IPhone 13', 999.00, 'phone', 10),
('https://images.samsung.com/is/image/samsung/assets/es/galaxy-a52/pcd/a-category/img_bnn_galaxy_device.png?$ORIGIN_PNG$', 'Samsung Galaxy S23', 450.00, 'phone', 15),
('https://i.pinimg.com/originals/dc/21/b9/dc21b9f7f59aa1e57b746e7c1e10648e.jpg', 'MacBook Air', 1500.00, 'laptop', 5);

INSERT INTO accounts_electronics (url, name, price, what, quantity) VALUES
('https://media.extra.com/s/aurora/100322230_800/Apple-iPhone-14-Pro-Max%2C-5G%2C-128GB%2C-Space-Black?locale=en-GB,en-*,*', 'Iphone 14 Pro', 1500.00, 'phone', 10),
('https://tse3.mm.bing.net/th?id=OIP.eWITfWaKP4HWqXacMDJTtQAAAA&pid=Api', 'Samsung S23 Ultra', 1399.00, 'phone', 10),
('https://i5.walmartimages.com/asr/0cb7a843-6f55-4c9a-b71d-fa3408d68464_1.10fc412091e6617966cef69fc422f885.jpeg', 'Lenovo ThinkPad', 999.00, 'laptop', 10),
('https://cdn.arstechnica.net/wp-content/uploads/2015/02/MG_4188.jpg', 'Dell Vostro', 789.00, 'laptop', 10),
('https://i.pinimg.com/originals/82/b3/3c/82b33c2c313795bee9f160ddcd4b3397.jpg', 'Electronics Carry Bag', 50.00, 'accessory', 10),
('https://siri-cdn.appadvice.com/wp-content/appadvice-v2-media/2017/12/best-technology-products_338b6c9cbbf43e07ee7ad6e58c296a1e-xl.jpg', 'JBL Speaker', 899.00, 'accessory', 10),
('https://www.maribestonestop.com/image/prohard/image/data/categories/gbaCla4D1619505838.jpg', 'Boats HeadPhone', 680.00, 'accessory', 10);


select * from electronics;

-- drop table clothing;
-- drop table decorations;
-- drop table electronics;
CREATE TABLE clothing (
    id INT AUTO_INCREMENT PRIMARY KEY,
    url VARCHAR(255),
    name VARCHAR(255),
    price DECIMAL(10, 2),
    whom VARCHAR(255),
    quantity INT
);
INSERT INTO accounts_clothing (url, name, price, whom, quantity) VALUES
('https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf', 'Leather Jacket', 250.00, 'men', 10),
('https://images.unsplash.com/photo-1588359348347-9bc6cbbb689e', 'Sports Jacket', 150.00, 'men', 10);

INSERT INTO accounts_clothing (url, name, price, whom, quantity) VALUES
('https://imagescdn.thecollective.in/img/app/product/7/752089-8517132.jpg?w=900&auto=format', 'Silk Slip Dress', 150.00, 'women', 20),
('https://img.faballey.com/images/product/JMP00070Z/1.JPG', 'Black Cowl', 99.00, 'women', 10),
('https://img.faballey.com/images/product/DRS06600Z/1.JPG', 'Pink Sleeveless Maxi', 50.00, 'women', 10);
INSERT INTO accounts_clothing (url, name, price, whom, quantity) VALUES
('https://ae01.alicdn.com/kf/HTB1ZoCCRVXXXXaMXFXXq6xXFXXXB/LeJin-Children-Boys-Clothing-Set-Sportswear-Sports-Suit-Boys-Casual-Wear-Shorts-in-Summer-in-100.jpg', 'Kid Summer Collection', 399.00, 'kids', 30);

INSERT INTO accounts_clothing (url, name, price, whom, quantity) VALUES
('https://imagescdn.thecollective.in/img/app/product/7/752089-8517132.jpg?w=900&auto=format', 'Silk Slip Dress', 150.00, 'women', 20),
('https://ae01.alicdn.com/kf/HTB1ZoCCRVXXXXaMXFXXq6xXFXXXB/LeJin-Children-Boys-Clothing-Set-Sportswear-Sports-Suit-Boys-Casual-Wear-Shorts-in-Summer-in-100.jpg', 'Kid Summer Collection', 399.00, 'kid', 30);
CREATE TABLE decorations (
    id INT AUTO_INCREMENT PRIMARY KEY,
    url VARCHAR(255),
    name VARCHAR(255),
    price DECIMAL(10, 2),
    what VARCHAR(255),
    quantity INT
);

INSERT INTO accounts_decorations (url, name, price, what, quantity) VALUES
('https://2.bp.blogspot.com/-kKprFiTSe6g/UQfUeJtlWJI/AAAAAAAAAO8/ferEVCo7aao/s1600/DSC00032.JPG', 'Lamps', 99.00, 'lamp', 40),
('https://i5.walmartimages.com/asr/27261df2-b921-4d0e-9873-039a420ecc0e_1.5c2567a6ea883b6be0c42624cd9cfe69.jpeg', 'Lights', 29.00, 'light', 50);

select * from accounts_clothing;
select * from accounts_useraccount;
drop table cart;
CREATE TABLE accounts_cart (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_email varchar(255),
    FOREIGN KEY (user_email) REFERENCES accounts_useraccount(email),
    category ENUM('electronics', 'decorations', 'clothing'),
    product_id int,
    quantity int,
    
    FOREIGN KEY (product_id) REFERENCES electronics(id) ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES decorations(id) ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES clothing(id) ON DELETE CASCADE
);

CREATE TABLE accounts_cart (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_email VARCHAR(254),
    category VARCHAR(20),
    product_id INT,
    quantity INT
);
select * from accounts_cart;

select * from accounts_admin;
drop table accounts_cart;
DELIMITER //

CREATE TRIGGER before_decorations_insert
BEFORE INSERT ON accounts_decorations
FOR EACH ROW
BEGIN
    IF NEW.quantity <= 0 THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Invalid quantity for Decorations.';
    END IF;
END//

DELIMITER ;

DELIMITER //

CREATE TRIGGER before_electronics_insert
BEFORE INSERT ON accounts_electronics
FOR EACH ROW
BEGIN
    IF NEW.quantity <= 0 THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Invalid quantity for Electronics.';
    END IF;
END//

DELIMITER ;
DELIMITER //

CREATE TRIGGER before_clothing_insert
BEFORE INSERT ON accounts_clothing
FOR EACH ROW
BEGIN
    IF NEW.quantity <= 0 THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Invalid quantity for Clothing.';
    END IF;
END//

DELIMITER ;
DELIMITER //

CREATE TRIGGER before_useraccount_insert
BEFORE INSERT ON accounts_useraccount
FOR EACH ROW
BEGIN
    IF CHAR_LENGTH(NEW.name) < 1 THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Name length must be at least 1 characters.';
    END IF;
END//

DELIMITER ;
select * from accounts_decorations;