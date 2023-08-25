const chalk = require('chalk');
const figlet = require('figlet');
const inquirer = require('inquirer');
const clear = require('clear');

const {
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
} = require('./lib/dbQueries');
const {
    mainMenu,
    promptForRole,
    promptForEmployee,
    promptForDelete,
    promptForUpdateRole
} = require('./lib/inquirerPrompts');

console.log(
    chalk.cyan(
        figlet.textSync('Employee Tracker', {
            font: 'Standard',
            horizontalLayout: 'default',
            verticalLayout: 'default'
        })
    )
);

async function startApp() {
    // Clear the console
    console.clear();

    // Display ASCII art banner
    console.log(
        chalk.yellow(
            figlet.textSync('Employee Tracker', { horizontalLayout: 'full' })
        )
    );

    let inProgress = true;

    while (inProgress) {
        const { action } = await mainMenu();

        try {
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
                    console.table(employees, ['id', 'first_name', 'last_name', 'job_title', 'department', 'salary', 'manager']);
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
                    const roleData = await promptForRole();
                    await addRole(roleData.title, roleData.salary, roleData.department_id);
                    console.log('Role added successfully!');
                    break;

                case 'Add an employee':
                    const employeeData = await promptForEmployee();
                    await addEmployee(employeeData.first_name, employeeData.last_name, employeeData.role_id, employeeData.manager_id);
                    console.log('Employee added successfully!');
                    break;

                case 'Delete a department':
                    const deptId = await promptForDelete('department');
                    await deleteDepartment(deptId.id);
                    console.log('Department deleted successfully!');
                    break;

                case 'Delete a role':
                    const roleId = await promptForDelete('role');
                    await deleteRole(roleId.id);
                    console.log('Role deleted successfully!');
                    break;

                case 'Delete an employee':
                    const empId = await promptForDelete('employee');
                    await deleteEmployee(empId.id);
                    console.log('Employee deleted successfully!');
                    break;

                case 'Update an employee role':
                    const { employee_id, new_role_id } = await promptForUpdateRole();
                    await updateEmployeeRole(employee_id, new_role_id);
                    console.log('Employee role updated successfully!');
                    break;

                case 'Exit':
                    inProgress = false;
                    break;

                default:
                    console.log('Action not recognized.');
            }
        } catch (error) {
            console.error(`Error: ${error.message}`);
        }
    }

    console.log('Thank you for using the Employee Tracker!');
    process.exit();
}

startApp();





