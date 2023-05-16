DROP DATABASE IF EXISTS employees_db;
CREATE DATABASE employees_db;
DROP TABLE IF EXISTS employees;
USE employees_db;
DROP TABLE IF EXISTS departments;
DROP TABLE IF EXISTS roles;


CREATE TABLE departments (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(30) NOT NULL
);

CREATE TABLE roles (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(50) NOT NULL,
    salary INT NOT NULL,
    department_id INT,
    INDEX department_index(department_id),
    is_manager BOOLEAN NOT NULL, 
    FOREIGN KEY (department_id)
    REFERENCES departments(id)
    ON DELETE SET NULL
);

CREATE TABLE employees (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INT,
    manager_id INT,
    INDEX manager_index(manager_id),
    FOREIGN KEY (manager_id)
    REFERENCES employees(id)
    ON DELETE SET NULL,
    INDEX role_index (role_id),
    FOREIGN KEY (role_id)
    REFERENCES roles(id)
    ON DELETE SET NULL  
);
