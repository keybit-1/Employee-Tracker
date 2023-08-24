const connection = require('../config/connection');

function viewAllDepartments() {
    return connection.promise().query('SELECT * FROM department');
}

function viewAllRoles() {
    return connection.promise().query('SELECT * FROM role');
}

function viewAllEmployees() {
    return connection.promise().query('SELECT * FROM employee');
}

function addDepartment(name) {
    return connection.promise().query('INSERT INTO department (name) VALUES (?)', [name]);
}

function addRole(title, salary, department_id) {
    return connection.promise().query('INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)', [title, salary, department_id]);
}

function addEmployee(first_name, last_name, role_id, manager_id = null) {
    if (manager_id) {
        return connection.promise().query('INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)', [first_name, last_name, role_id, manager_id]);
    } else {
        return connection.promise().query('INSERT INTO employee (first_name, last_name, role_id) VALUES (?, ?, ?)', [first_name, last_name, role_id]);
    }
}

module.exports = {
    addDepartment,
    addRole,
    addEmployee,
    // ... any other functions you have in this file
};
