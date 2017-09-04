DROP DATABASE IF EXISTS bamazon_db;

create database bamazon_db;

use bamazon_db;

create table products (
    item_id integer(10) auto_increment not null,
    product_name varchar(50) not null,
    department_name varchar(50) not null,
    price decimal(10, 2) null,
    stock_quantity integer(50),
    primary key (item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES
    ('iPhone 1', 'electronics', 100, 5),
    ('iPhone 2', 'electronics', 100, 7),
    ('iPhone 3', 'electronics', 200, 12),
    ('iPhone 4', 'electronics', 300, 50),
    ('iPhone 5', 'electronics', 400, 50),
    ('iPhone 6', 'electronics', 700, 50),
    ('iPhone 7', 'electronics', 900, 50),
    ('iPhone 8', 'electronics', 1100, 50),
    ('iPhone 9', 'electronics', 1300, 50),
    ('iPhone 10', 'electronics', 1600, 50);