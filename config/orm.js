// import MySQL connection
const connection = require("../config/connection");

// ORM class to neatly hold all of our SQL query functions
class ORM {
    constructor(connection) {
        this.connection = connection;
    };

    // returns table with all employess and all associated columns
    viewAllEmployee() {

        const queryString = `SELECT employee.id, first_name, last_name, department.name, role.title, salary, is_manager
        FROM employee 
        INNER JOIN role on employee.role_id = role.id 
        INNER JOIN department on role.department_id = department.id;`
        return this.connection.query(queryString);
    };

    // allows the user to view all departments
    viewAllDepartments() {
        const queryString = `SELECT * FROM department;`
        return this.connection.query(queryString);
    };

    // allows the user to view all roles
    viewAllRoles() {
        const queryString = ` SELECT title, salary, department.name
        FROM role
        INNER JOIN department ON role.department_id = department.id;`
        return this.connection.query(queryString);
    };

    // allows the user to view all managers
    viewManagers() {
        const queryString = `SELECT first_name, last_name, role.title, department.name, salary 
        FROM employee 
        INNER JOIN role on employee.role_id = role.id 
        INNER JOIN department on role.department_id = department.id  
        WHERE is_manager = 1;`

        return this.connection.query(queryString);
    };

    viewEmployeeByManager(managerId) {
        const queryString = "SELECT first_name, last_name FROM employee WHERE manager_id = ?"
        return this.connection.query(queryString, [managerId]);
    }

    // allows the user to add an employee
    addEmployee(first_name, last_name, role_id, manager_id, is_manager) {
        const queryString = `INSERT INTO employee (first_name, last_name, role_id, manager_id, is_manager) VALUE (?, ?, ?, ?, ?);`

        return this.connection.query(queryString, [first_name, last_name, role_id, manager_id, is_manager]);
    };


    // allows the user to add a department
    addDepartment(name) {
        const queryString = `INSERT INTO department (name) VALUE (?);`

        return this.connection.query(queryString, [name]);
    };

    // allows the user to add a department
    addRole(title, salary, departmentId) {
        const queryString = `INSERT INTO role (title, salary, department_id) VALUE (?, ?, ?);`

        return this.connection.query(queryString, [title, salary, departmentId]);
    };

    // allows the user to update an employee
    updateEmployee(first_name, last_name, role_id, is_manager, manager_id, id) {
        const queryString = "UPDATE employee SET first_name = ?, last_name = ?, role_id = ?, is_manager = ?, manager_id = ? WHERE id = ?;"
        return this.connection.query(queryString, [first_name, last_name, role_id, manager_id, is_manager, id]);
    };

    deleteEmployee(id) {
        const queryString = "DELETE FROM employee WHERE id = ?;"
        return this.connection.query(queryString, [id]);
    };

    deleteDepartment(id) {
        const queryString = "DELETE FROM department WHERE department.id = ?;"
        return this.connection.query(queryString, [id]);
    };

    deleteRole(id) {
        const queryString = "DELETE FROM role WHERE id = ?;"
        return this.connection.query(queryString, [id]);
    };

    totalUtilizedBudget(id) {
        const queryString = `SELECT department.name, SUM(salary)
        FROM department
        inner JOIN role ON role.department_id = department.id
        WHERE department.id = ?`
        return this.connection.query(queryString, [id]);
    };

    // -----------------------------------------------------------------------------------
    // INQ methods (for inquierer prompt lists. shows the name, but returns value)

    // this method lets the user see the names of employees, but returns the employee id
    viewEmployeeINQ() {
        const queryString = 'SELECT id as value, CONCAT(first_name, " ",last_name) as name FROM employee'
        return this.connection.query(queryString);
    };

    // this method lets the user see the names of departments, but returns department id
    viewDepartmentINQ() {
        const queryString = "SELECT id as value, name FROM department"
        return this.connection.query(queryString);
    };

    // this method lets the user see the names of roles, but returns role id
    viewRolesINQ() {
        const queryString = "SELECT id as value, title as name FROM role;"
        return this.connection.query(queryString);
    };

    // this mehtod lets the user see the names of the managers, but returns manager id
    viewManagersINQ() {
        const queryString = 'SELECT id as value, CONCAT(first_name, " ",last_name) as name FROM employee WHERE is_manager = 1;'
        return this.connection.query(queryString);
    };

    // this method is for grabbing the first name of an employee to populate the default field in the update employee question
    employeeFirstNameINQ(id) {
        const queryString = "SELECT first_name FROM employee WHERE id = ?"
        return this.connection.query(queryString, [id]);
    };

    // this method is for grabbing the last name of an employee to populate the default field in the update employee question
    employeeLastNameINQ(id) {
        const queryString = "SELECT last_name FROM employee WHERE id = ?"
        return this.connection.query(queryString, [id]);
    };

};

module.exports = new ORM(connection)



// ---------------------------------------------------------

// test
// const test = new ORM(connection);

// test.totalUtilizedBudget(3)
// .then(res => console.log(res))
// .catch(error=> console.error(error.message))

// test.deleteEmployee(9)
// .then(res => console.log(res))
// .catch(error=> console.error(error.message))


// test.viewManagersINQ()
// .then(res => console.table(res))
// .catch(err=> console.error(err))

// test.updateEmployee("Anna", "Spitz", 3, 1, null, 13)
// .then(res => {
//     console.log(res)
// })
// .then(connection.end())
// .catch(err => console.error(err))

// test.deptSwitcher("Crew")
// .then(res => {
    // res[0].id -- what we need to return from role switcher function
//     console.log(res[0].id)})
// .then(connection.end())
// .catch(err => err)

// test.addRole("Pirate", 20000, 3)
// .then(results => console.log(results))
// .then(connection.end())
// .catch(err => err)

// test.roleSwitcher("CEO")
// .then(res => {
//     // res[0].id -- what we need to return from role switcher function
//     console.log(res[0].id)})
// .then(connection.end())
// .catch(err => err)

// test.addEmployee("Jim", "Bob", 2, 2)
// .then(results => console.log(results))
// .then(connection.end())
// .catch(err => err)

// test.viewAllEmployee()
// .then(results => console.table(results))
// .catch(err => err)