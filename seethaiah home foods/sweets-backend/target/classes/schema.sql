CREATE TABLE product (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255),
    price VARCHAR(255),
    old_price VARCHAR(255),
    image VARCHAR(1000),
    vendor VARCHAR(255),
    weight VARCHAR(255),
    badge VARCHAR(255),
    type VARCHAR(255),
    discount INTEGER,
    tag VARCHAR(255)
);
