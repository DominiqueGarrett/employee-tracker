const cTable = require("console.table");
const orm = require("./config/orm");
const inquirer = require("inquirer");
const questions = require("./assets/questions");


// starts the program
const init = () => {

    return inquirer.prompt(questions.main)
        .then(async ({ main }) => {

            switch (main) {
                case "View all employees":
                    await renderAllEmployees();
                    break;
                case "View all departments":
                    await renderAllDepartments();
                    break;
                case "View all roles":
                    await renderAllRoles();
                    break;
                case "View all managers":
                    await renderAllManagers();
                    break;
                case "View employees by manager":
                    await renderEmployeesByManger();
                    break;
                case "View total utilized budget per department":
                    await renderTUB();
                    break;
                case "Add employee":
                    await addEmployee();
                    break;
                case "Add department":
                    await addDepartment();
                    break;
                case "Add role":
                    await addRole();
                    break;
                case "Update employee":
                    await updateEmployee();
                    break;
                case "Delete employee":
                    await deleteEmployee();
                    break;
                case "Delete department":
                    await deleteDepartment();
                    break;
                case "Delete role":
                    await deleteRole();
                    break;

                default: console.log("bleh");
                    break;
            };
        })
        .catch(err => console.error(err));
};

// renders all employees to the console
const renderAllEmployees = () => {
    return orm.viewAllEmployee()
        .then(result => console.table(result))
        .catch(err => console.error(err))
        .then(init);
};

// renders all departments to the console
const renderAllDepartments = () => {
    return orm.viewAllDepartments()
        .then(result => console.table(result))
        .catch(err => console.error(err))
        .then(init);
};

// renders all roles to the console
const renderAllRoles = () => {
    return orm.viewAllRoles()
        .then(result => console.table(result))
        .catch(err => console.error(err))
        .then(init);
};

// renders all managers
const renderAllManagers = () => {
    return orm.viewManagers()
        .then(result => console.table(result))
        .catch(err => console.error(err))
        .then(init);
};

const renderEmployeesByManger = async () => {
    try {
        const managers = await orm.viewManagersINQ();
        const managerId = await inquirer.prompt(questions.viewEmployeesByManager(managers));
        const result = await orm.viewEmployeeByManager(managerId.id)
        console.table(result)
        await init();
        
    } catch (error) {
        console.error(error);
    }
}

// renders total utilized budget
const renderTUB = async () => {
    try {
        const dept = await orm.viewDepartmentINQ();
        const deptId = await inquirer.prompt(questions.totalUtilizedBudget(dept));
        const result = await orm.totalUtilizedBudget(deptId.id);
        console.table(result)
        await init();
        
    } catch (error) {
        console.error(error);
    }
};


// asks the add employee prompts to insert a new employee into the database
const addEmployee = async () => {
    try {
        const managers = await orm.viewManagersINQ();
        const roles = await orm.viewRolesINQ();
        const result = await inquirer.prompt(questions.addEmployee(roles, managers))
        await orm.addEmployee(result.first_name, result.last_name, result.role_id, result.manager_id, result.is_manager);
        await console.log(`Succsess! Employee ${result.first_name} ${result.last_name} added.`);
        await init();
    } catch (error) {
        console.log(error.message);
    }
};

// allows the user to add a department
const addDepartment = async () => {
    try {
        const result = await inquirer.prompt(questions.addDepartment);
        await orm.addDepartment(result.name);
        await console.log(`Succsess! Department ${result.name} added.`);
        await init();
    } catch (error) {
        console.error(error.message);
    };
};

// allows the user to add a role
const addRole = async () => {
    try {
        const dept = await orm.viewDepartmentINQ();
        const result = await inquirer.prompt(questions.addRole(dept));
        await orm.addRole(result.title, result.salary, result.department_id);
        await console.log(`Succsess! Role ${result.title} added.`);
        await init();
        
    } catch (error) {
        console.error(error.message);
    };
};

const updateEmployee = async () => {
    try {
        const employees = await orm.viewEmployeeINQ();
        const defaultNames = await inquirer.prompt(questions.updateEmployee(employees
            ));
        const firstName = await orm.employeeFirstNameINQ(defaultNames.id);
        const lastName = await orm.employeeLastNameINQ(defaultNames.id);
        const roles = await orm.viewRolesINQ();
        const managers = await orm.viewManagersINQ();
        const result = await inquirer.prompt(questions.updateEmployeeCont(firstName[0].first_name, lastName[0].last_name, roles, managers));
        await orm.updateEmployee(result.first_name, result.last_name, result.role_id, result.manager_id, result.is_manager, defaultNames.id);
        await console.log(`Succsess! Employee ${result.first_name} ${result.last_name} updated.`);
        await init();
        
    } catch (error) {
        console.error(error.message);
    };
};

const deleteEmployee = async () => {
    try {
        const employees = await orm.viewEmployeeINQ();
        const result = await inquirer.prompt(questions.deleteEmployee(employees));
        await orm.deleteEmployee(result.id);
        await console.log(`Succsess! Employee deleted.`);
        await init();
    
    } catch (error) {
        console.error(error.message)
    };
};

const deleteDepartment = async () => {
    try {
        const dept = await orm.viewDepartmentINQ();
        const result = await inquirer.prompt(questions.deleteDepartment(dept));
        await orm.deleteDepartment(result.id);
        await console.log(`Succsess! Department deleted.`);
        await init();
    
    } catch (error) {
        console.error(error.message)
    };
};

const deleteRole = async () => {
    try {
        const dept = await orm.viewRolesINQ();
        const result = await inquirer.prompt(questions.deleteRole(dept));
        await orm.deleteRole(result.id);
        await console.log(`Succsess! Role deleted.`);
        await init();
    
    } catch (error) {
        console.error(error.message)
    };
};

init();