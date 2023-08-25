const inquirer = require('inquirer');

function mainMenu() {
    return inquirer.prompt([
        {
            type: 'list',
            name: 'action',
            message: 'What would you like to do?',
            choices: [
                'View all departments',
                'View all roles',
                'View all employees',
                'Add a department',
                'Add a role',
                'Add an employee',
                'Delete a department',
                'Delete a role',
                'Delete an employee',
                'Update an employee role',
                'Exit'
            ]
        }
    ]);
}

function promptForRole() {
    return inquirer.prompt([
        {
            type: 'input',
            name: 'title',
            message: 'What is the title of the role?'
        },
        {
            type: 'input',
            name: 'salary',
            message: 'What is the salary of the role? (Enter numeric value only, e.g., 100000 for 100k)',
        },
        {
            type: 'input',
            name: 'department_id',
            message: 'What is the department ID for this role?'
        }
    ]);
}

function promptForEmployee() {
    return inquirer.prompt([
        {
            type: 'input',
            name: 'first_name',
            message: 'What is the first name of the employee?'
        },
        {
            type: 'input',
            name: 'last_name',
            message: 'What is the last name of the employee?'
        },
        {
            type: 'input',
            name: 'role_id',
            message: 'What is the role ID for this employee?'
        },
        {
            type: 'input',
            name: 'manager_id',
            message: 'What is the manager ID for this employee? (Leave empty if no manager)',
            default: null
        }
    ]);
}

function promptForDelete(action) {
    return inquirer.prompt([
        {
            type: 'input',
            name: 'id',
            message: `Enter the ID of the ${action} you want to delete:`
        }
    ]);
}

function promptForUpdateRole() {
    return inquirer.prompt([
        {
            type: 'input',
            name: 'employee_id',
            message: 'Enter the ID of the employee you wish to update:'
        },
        {
            type: 'input',
            name: 'new_role_id',
            message: 'Enter the new role ID for this employee:'
        }
    ]);
}

module.exports = { 
    mainMenu, 
    promptForRole, 
    promptForEmployee, 
    promptForDelete, 
    promptForUpdateRole 
};


