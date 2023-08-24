const inquirer = require('inquirer');
const {
    viewAllDepartments,
    viewAllRoles,
    viewAllEmployees,
    addDepartment,
    addRole,
    addEmployee
    // ... import any other necessary functions
} = require('./lib/dbQueries');
const { mainMenu } = require('./lib/inquirerPrompts');

async function startApp() {
    let inProgress = true;

    while (inProgress) {
        const { action } = await mainMenu();

        switch (action) {
            case 'View all departments':
                const departments = await viewAllDepartments();
                console.table(departments, ['id', 'name']);
                break;

            case 'View all roles':
                const roles = await viewAllRoles();
                console.table(roles, ['id', 'title', 'salary', 'department_id']);
                break;

            case 'View all employees':
                const employees = await viewAllEmployees();
                console.table(employees, ['id', 'first_name', 'last_name', 'role_id', 'manager_id']);
                break;

            case 'Add a department':
                const { name } = await inquirer.prompt({
                    type: 'input',
                    name: 'name',
                    message: 'What is the name of the new department?'
                });
                await addDepartment(name);
                console.log('Department added successfully!');
                break;

            case 'Add a role':
                const roleData = await inquirer.prompt([
                    {
                        type: 'input',
                        name: 'title',
                        message: 'What is the title of the role?'
                    },
                    {
                        type: 'input',
                        name: 'salary',
                        message: 'What is the salary of the role? (Enter numeric value only, e.g., 100000 for 100k)',
                        validate: value => {
                            const valid = !isNaN(parseFloat(value));
                            return valid || 'Please enter a number';
                        },
                        filter: Number
                    },
                    {
                        type: 'input',
                        name: 'department_id',
                        message: 'What is the department ID for this role?'
                    }
                ]);
                await addRole(roleData.title, roleData.salary, roleData.department_id);
                console.log('Role added successfully!');
                break;

            case 'Add an employee':
                const employeeData = await inquirer.prompt([
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
                await addEmployee(employeeData.first_name, employeeData.last_name, employeeData.role_id, employeeData.manager_id);
                console.log('Employee added successfully!');
                break;

            case 'Exit':
                inProgress = false;
                break;

            default:
                console.log('Action not recognized.');
        }
    }

    console.log('Thank you for using the Employee Tracker!');
    process.exit();
}

startApp();



