DROP TABLE IF EXISTS commanders;
DROP TABLE IF EXISTS tanks;

CREATE TABLE countries (
    country_id SERIAL PRIMARY KEY,
    country_name VARCHAR(20)
);
CREATE TABLE tanks (
    tank_id SERIAL PRIMARY KEY,
    tank_name VARCHAR(30),
    tank_class VARCHAR(20),
    country_id INT REFERENCES countries(country_id)
);

CREATE TABLE commanders (
    comm_id SERIAL PRIMARY KEY,
    title VARCHAR(50),
    password VARCHAR(200), 
    country_id INT REFERENCES countries(country_id), 
    tank_id INT REFERENCES tanks(tank_id)
);

INSERT INTO countries
(country_name)
VALUES
('USA'),
('Germany'),
('Russia'),
('Sweden'),
('Aquarius');

INSERT INTO tanks
(tank_name, tank_class, country_id)
VALUES
('M4 Sherman', 'Medium', 1),
('Leopard 1', 'Medium', 2),
('T-55', 'Medium', 3),
('Stridsvagn 103', 'Tank Destroyer', 4),
('Tiger II', 'Heavy', 2),
('T-34', 'Medium', 3),
('fish', 'fake', 5);
