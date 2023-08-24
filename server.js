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
                console.table(departments);
                break;

            case 'View all roles':
                const roles = await viewAllRoles();
                console.table(roles);
                break;

            case 'View all employees':
                const employees = await viewAllEmployees();
                console.table(employees);
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

            // Similarly, you can handle 'Add a role' and 'Add an employee'

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
