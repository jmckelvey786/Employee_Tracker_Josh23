INSERT INTO departments(name)
VALUES 
("Marketing"),
("Operations"),
("Kitchen"),
("Bar");
("Cafe");

INSERT INTO roles (title, salary, department_id, is_manager)
VALUES
("Bartender", 20000, 4, false),
("Barista", 20000, 5, false),
("Kitchen Manager", 30000, 3, true),
("Kitchen", 25000, 3, false),
("Bar Manager", 300000, 4, true),
("Cafe Manager", 30000, 5, true),
("Operation Director", 500000, 2, true),
("Marketing Director", 40000, 1, true);



INSERT INTO employees (first_name, last_name, manager_id, role_id)
VALUES

("Annabel", "Isabella", null, 1),
("Billy", "Jones", null, 2),
("Connor", "King", 1, 3),
("Dylan", "Logan", null, 4),
("Ester", "Mila", 2, 5),
("Frank", "Nathaniel", 3, 6),
("Gertrude", "Oscar", 4, 7),
("Harry", "Peters", 5, 8);