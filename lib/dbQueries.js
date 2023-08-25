const connection = require('../config/connection');

async function viewAllDepartments() {
    try {
        const [departments] = await connection.promise().query('SELECT * FROM department');
        return departments;
    } catch (error) {
        console.error('Error fetching departments:', error.message);
    }
}

async function viewAllRoles() {
    try {
        const [roles] = await connection.promise().query('SELECT * FROM role');
        return roles;
    } catch (error) {
        console.error('Error fetching roles:', error.message);
    }
}

async function viewAllEmployees() {
    try {
        const query = `
        SELECT 
            e.id, 
            e.first_name, 
            e.last_name, 
            r.title AS job_title, 
            d.name AS department, 
            r.salary, 
            CONCAT(m.first_name, ' ', m.last_name) AS manager 
        FROM employee e
        LEFT JOIN role r ON e.role_id = r.id
        LEFT JOIN department d ON r.department_id = d.id
        LEFT JOIN employee m ON e.manager_id = m.id;
        `;

        const [employees] = await connection.promise().query(query);
        return employees;
    } catch (error) {
        console.error('Error fetching employees:', error.message);
    }
}


async function addDepartment(name) {
    try {
        console.log("Adding department with name:", name);
        const [result] = await connection.promise().query('INSERT INTO department (name) VALUES (?)', [name]);
        console.log("SQL Query Result:", result);
        return result;
    } catch (error) {
        console.error('Error adding department:', error.message);
    }
}

async function addRole(title, salary, department_id) {
    try {
        return await connection.promise().query('INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)', [title, salary, department_id]);
    } catch (error) {
        console.error('Error adding role:', error.message);
    }
}

async function addEmployee(first_name, last_name, role_id, manager_id = null) {
    try {
        if (manager_id) {
            return await connection.promise().query('INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)', [first_name, last_name, role_id, manager_id]);
        } else {
            return await connection.promise().query('INSERT INTO employee (first_name, last_name, role_id) VALUES (?, ?, ?)', [first_name, last_name, role_id]);
        }
    } catch (error) {
        console.error('Error adding employee:', error.message);
    }
}

async function deleteDepartment(id) {
    try {
        await connection.promise().query('DELETE FROM role WHERE department_id = ?', [id]);
        await connection.promise().query('DELETE FROM department WHERE id = ?', [id]);
        console.log('Department deleted successfully!');
    } catch (error) {
        console.error('Error deleting department:', error.message);
    }
}

async function deleteRole(id) {
    try {
        return await connection.promise().query('DELETE FROM role WHERE id = ?', [id]);
    } catch (error) {
        console.error('Error deleting role:', error.message);
    }
}

async function deleteEmployee(id) {
    try {
        return await connection.promise().query('DELETE FROM employee WHERE id = ?', [id]);
    } catch (error) {
        console.error('Error deleting employee:', error.message);
    }
}

async function updateEmployeeRole(employeeId, newRoleId) {
    try {
        return await connection.promise().query('UPDATE employee SET role_id = ? WHERE id = ?', [newRoleId, employeeId]);
    } catch (error) {
        console.error('Error updating employee role:', error.message);
    }
}


module.exports = {
    viewAllDepartments,
    viewAllRoles,
    viewAllEmployees,
    addDepartment,
    addRole,
    addEmployee,
    deleteDepartment,
    deleteRole,
    deleteEmployee,
    updateEmployeeRole
};




