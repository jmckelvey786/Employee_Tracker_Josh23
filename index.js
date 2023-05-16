const mysql = require('mysql2');
const inquirer = require('inquirer');
const cTable = require('console.table');
const queryDb = require('./queries/queryDb');

const dbQuery = new queryDb();

function initiateProgram() {
    inquirer
        .prompt([
            {
                type: "list",
                message: "What would you like to do?",
                name: "select",
                choices: ["View All Departments", "View All Employees", "View All Roles", "View Budget By Department", "Add a Department", "Add a Role", "Add an Employee", "Update an Employee Role", "Delete a Department", "Delete a Role", "Delete an Employee", "Quit"]
            }
        ])
        .then((response) => {
            switch (response.select) {
                case "View All Departments":
                    showDepartments();
                    break;
                case "View All Employees":
                    showEmployees();
                    break;
                case "View All Roles":
                    showRoles();
                    break;
                case "Add a Department":
                    addDepartment();
                    break;
                case "Add a Role":
                    addRole();
                    break;
                case "Add an Employee":
                    addEmployee();
                    break;
                case "Update an Employee Role":
                    updateEmployeeRole();
                    break;
                case "Delete a Department":
                    deleteDepartment();
                    break;
                case "Delete a Role":
                    deleteRole();
                    break;
                case "Delete an Employee":
                    deleteEmployee();
                    break;
                case "Quit":
                    console.log("Goodbye!")
                    return
            }
        })
}

async function showDepartments() {
    const [departments] = await dbQuery.showDepartments();
    console.table("DEPARTMENTS", departments)
    initiateProgram()
}

async function showEmployees() {
    const [employees] = await dbQuery.showEmployees();
    console.table("EMPLOYEES", employees);
    initiateProgram();
}

async function showRoles() {
    const [roles] = await dbQuery.showRoles();
    console.table("ROLES", roles)
    initiateProgram()
}

async function addDepartment() {
    const response = await inquirer
        .prompt([
            {
                type: "text",
                message: "What is the name of the department?",
                name: "deptName"
            }
        ])
    dbQueries.addDepartment(response)
    showDepartments()
}

async function addRole() {
    const departmentArray = await getDepartments();
    const response = await inquirer
        .prompt([
            {
                type: "text",
                message: "What is the name of the role?",
                name: "title"
            },
            {
                type: "number",
                message: "What is the salary of the role?",
                name: "salary"
            },
            {
                type: "list",
                message: "What is the department for this role?",
                name: "department_id",
                choices: departmentArray
            },
            {
                type: "confirm",
                message: "Is this a manager role?",
                name: "is_manager"
            }
        ])
    dbQuery.addRole(response)
    showRoles();
}

async function addEmployee() {
    const roleArray = await getRoles();
    const managerArray = await getManagers();
    const response = await inquirer
        .prompt([
            {
                type: "text",
                message: "What is the first name of the employee?",
                name: "first_name"
            },
            {
                type: "text",
                message: "What is the last name of the employee?",
                name: "last_name"
            },
            {
                type: "list",
                message: "Who is the manager of the employee?",
                name: "manager_id",
                choices: managerArray
            },
            {
                type: "list",
                message: "What is the role of the employee?",
                name: "role_id",
                choices: roleArray
            },
        ])
    dbQuery.addEmployee(response);
    showEmployees();
}

async function updateEmployeeRole() {
    const employeeArray = await showAllEmployees();
    const roleArray = await getRoles();
    const response = await inquirer
        .prompt([
            {
                type: "list",
                message: "Which employee would you like to update?",
                name: "choose_employee",
                choices: employeeArray
            },
            {
                type: "list",
                message: "Which role would you like the employee to have?",
                name: "change_role",
                choices: roleArray
            }
        ])
    await dbQuery.updateEmployeeRole(response);
    showEmployees();
}

async function deleteDepartment() {
    const departmentArray = await getDepartments();
    const response = await inquirer
        .prompt([
            {
                type: "list",
                message: "Which department would you like to delete?",
                name: "deptDelete",
                choices: departmentArray
            }
        ])
    await dbQuery.deleteDepartment(response);
    showDepartments();
}

async function deleteRole() {
    const roleArray = await getRoles();
    const response = await inquirer
        .prompt([
            {
                type: "list",
                message: "Which role would you like to delete?",
                name: "roleDelete",
                choices: roleArray
            }
        ])
    await dbQuery.deleteRole(response);
    viewRoles();
}

async function deleteEmployee() {
    const employeeArray = await showAllEmployees();
    const response = await inquirer
        .prompt([
            {
                type: "list",
                message: "Which employee would you like to delete?",
                name: "employeeDelete",
                choices: employeeArray
            }
        ])
    await dbQuery.deleteEmployee(response);
    showEmployees();
}

async function getRoles() {
    const [roleArray] = await dbQuery.getRoles()
    const newRoleArray = roleArray.map((result) => {
        return {
            name: result.title,
            value: {
                role_id: result.id,
                role_name: result.title,
            }
        }
    })
    return newRoleArray
}


async function getDepartments() {
    const [departments] = await dbQuery.getDepartments()
    const newDeptArray = departments.map((result) => {
        return {
            name: result.name,
            value: {
                department_id: result.id,
                department_name: result.name
            }
        }
    })
    return newDeptArray
}

async function getManagers() {
    const [managerArray] = await dbQuery.getManagers();
    const newManagerArray = managerArray.map((result) => {
        return {
            name: result.first_name + ' ' + result.last_name,
            value: {
                employee_id: result.id,
                employee_firstName: result.first_name,
                employee_lastName: result.last_name
            }
        }
    })
    return newManagerArray
}

async function showEmployees() {
    const [employeeArray] = await dbQuery.showEmployees()
    const newEmployeeArray = employeeArray.map((result) => {
        return {
            name: result.first_name + ' ' + result.last_name,
            value: {
                employee_id: result.id,
                employee_firstName: result.first_name,
                employee_lastName: result.last_name,
                employee_roleId: result.role_id
            }
        }
    })
    return newEmployeeArray
}

initiateProgram()