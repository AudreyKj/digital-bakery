CREATE DATABASE bakery;


CREATE TABLE orders(
  order_id SERIAL primary key,
  created_at VARCHAR UNIQUE
);
