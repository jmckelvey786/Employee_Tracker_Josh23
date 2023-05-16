const mysql = require('mysql2');
const connection = mysql.createConnection(
    {
        host: "localhost",
        user: "root",
        password: "Dylan2019!",
        database: "employees_db"
    },
    console.log("connected to database")
);

const db = connection.promise()

class QueryDb {
    constructor() { }

    showDepartments() {
        return db.query(
            `SELECT id AS Id, name AS Department
            FROM departments`);
    }

    getDepartments() {
        return db.query(
            `SELECT * FROM departments`);
    }

    addDepartment(response) {
        return db.query(
            `INSERT INTO departments (name) 
            VALUES ('${response.deptName}')`);
    }

    deleteDepartment(response) {
        return db.query(
            `DELETE FROM departments 
            WHERE id = ${response.deptDelete.department_id}`)
    }

    showRoles() {
        return db.query(
            `SELECT roles.id AS Id, departments.name AS Department, roles.title AS Role, roles.salary AS Salary 
            FROM departments 
            JOIN roles 
            ON roles.department_id = departments.id`);
    }

    addRole(response) {
        return db.query(
            `INSERT INTO roles (title, salary, department_id, is_manager) 
            VALUES ("${response.title}", ${response.salary}, ${response.department_id.department_id}, ${response.is_manager})`);
    }

    getRoles() {
        return db.query(
            `SELECT * FROM roles`);
    }

    deleteRole(response) {
        return db.query(
            `DELETE FROM roles 
            WHERE id = ${response.roleDelete.role_id}`)
    }

    showEmployees() {
        return db.query(
            `SELECT * FROM employees`);
    }

    showAllEmployees() {
        return db.query(
            `SELECT employees.id AS Id, first_name AS First, last_name AS Last, roles.title AS Role, departments.name AS Department, roles.salary AS Salary, manager_id AS ManagerId
            FROM employees
            JOIN roles ON employees.role_id = roles.id 
            JOIN departments ON departments.id = roles.department_id
            ORDER BY employees.id`);
    }

    updateEmployeeRole(response) {
        return db.query(
            `UPDATE employees 
            SET role_id = ${response.change_role.role_id} 
            WHERE id = ${response.choose_employee.employee_id}`);
    }

    addEmployee(response) {
        return db.query(
            `INSERT INTO employees (first_name, last_name, manager_id, role_id) 
            VALUES ('${response.first_name}', '${response.last_name}', ${response.manager_id.employee_id}, ${response.role_id.role_id})`);
    }

    deleteEmployee(response) {
        return db.query(
            `DELETE FROM employees 
            WHERE id = ${response.employeeDelete.employee_id}`)
    }

    getManagers() {
        return db.query(
            `SELECT employees.id, first_name, last_name 
            FROM employees 
            LEFT JOIN roles ON roles.id = employees.role_id 
            WHERE roles.is_manager = true`);
    }
}

module.exports = QueryDb;