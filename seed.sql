-- Seed data for restaurant_db

CREATE DATABASE IF NOT EXISTS restaurant_db;
USE restaurant_db;

CREATE TABLE IF NOT EXISTS menu_items (
  id INT AUTO_INCREMENT PRIMARY KEY,
  restaurant_id INT NOT NULL,
  name VARCHAR(255) NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  FOREIGN KEY (restaurant_id) REFERENCES restaurants(id)
);

CREATE TABLE IF NOT EXISTS orders (
  id INT AUTO_INCREMENT PRIMARY KEY,
  menu_item_id INT NOT NULL,
  quantity INT NOT NULL,
  FOREIGN KEY (menu_item_id) REFERENCES menu_items(id)
);

-- Sample restaurants
INSERT INTO restaurants (name) VALUES
('Tasty Grill'),
('Burger House'),
('Pasta Palace');

-- Sample menu items (restaurant_id corresponds to inserted restaurants above)
INSERT INTO menu_items (restaurant_id, name, price) VALUES
(1, 'Classic Burger', 8.50),
(1, 'Grilled Chicken Salad', 9.75),
(2, 'Cheeseburger', 7.00),
(2, 'Veggie Burger', 6.50),
(3, 'Spaghetti Carbonara', 11.00),
(3, 'Penne Arrabbiata', 10.00);

-- Sample orders (one order contains one item for simplicity)
INSERT INTO orders (menu_item_id, quantity) VALUES
(1, 3),  -- 3 Classic Burgers ordered
(3, 2),  -- 2 Cheeseburgers ordered
(5, 1),  -- 1 Spaghetti Carbonara ordered
(2, 4),  -- 4 Grilled Chicken Salads ordered
(4, 1),  -- 1 Veggie Burger ordered
(6, 2);  -- 2 Penne Arrabbiata ordered
