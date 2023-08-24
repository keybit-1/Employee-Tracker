const connection = require('../config/connection');

async function viewAllDepartments() {
    try {
        const result = await connection.promise().query('SELECT * FROM department');
        return result[0];
    } catch (error) {
        console.error("Error fetching departments:", error.message);
    }
}

async function viewAllRoles() {
    try {
        const result = await connection.promise().query('SELECT * FROM role');
        return result[0];
    } catch (error) {
        console.error("Error fetching roles:", error.message);
    }
}

async function viewAllEmployees() {
    try {
        const result = await connection.promise().query('SELECT * FROM employee');
        return result[0];
    } catch (error) {
        console.error("Error fetching employees:", error.message);
    }
}

async function addDepartment(name) {
    try {
        const result = await connection.promise().query('INSERT INTO department (name) VALUES (?)', [name]);
        return result[0];
    } catch (error) {
        console.error("Error adding department:", error.message);
    }
}

async function addRole(title, salary, department_id) {
    try {
        const result = await connection.promise().query('INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)', [title, salary, department_id]);
        return result[0];
    } catch (error) {
        console.error("Error adding role:", error.message);
    }
}

async function addEmployee(first_name, last_name, role_id, manager_id = null) {
    try {
        if (manager_id) {
            const result = await connection.promise().query('INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)', [first_name, last_name, role_id, manager_id]);
            return result[0];
        } else {
            const result = await connection.promise().query('INSERT INTO employee (first_name, last_name, role_id) VALUES (?, ?, ?)', [first_name, last_name, role_id]);
            return result[0];
        }
    } catch (error) {
        console.error("Error adding employee:", error.message);
    }
}

module.exports = {
    viewAllDepartments,
    viewAllRoles,
    viewAllEmployees,
    addDepartment,
    addRole,
    addEmployee
    // ... any other functions you have in this file
};


