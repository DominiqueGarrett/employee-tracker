const inquirer = require("inquirer");

module.exports = {
    main: {
        type: "list",
        name: "main",
        message: "What would you like to do?",
        choices: [
            "View all employees",
            "View all departments",
            "View all roles",
            "View all managers",
            "View employees by manager",
            "View total utilized budget per department",
            new inquirer.Separator(),
            "Add employee",
            "Add department",
            "Add role",
            new inquirer.Separator(),
            "Update employee",
            new inquirer.Separator(),
            "Delete employee",
            "Delete department",
            "Delete role",
            new inquirer.Separator()

        ]
    },

    addEmployee: (roles, managers) => [

        {
            type: "input",
            name: "first_name",
            message: "What is the employee's first name?",
        },
        {
            type: "input",
            name: "last_name",
            message: "What is the employee's last name?"
        },
        {
            type: "list",
            name: "role_id",
            message: "What is the employee's role?",
            choices: roles 
        },
        {
            type: "list",
            name: "manager_id",
            message: "Who is the employee's manager?",
            choices: managers

        },
        {
            type: "confirm",
            name: "is_manager",
            message: "Is this employee a manager?"
        }

    ],

    addDepartment: {

        type: "input",
        name: "name",
        message: "What is the name of the new department?"
    },

    addRole: (dept) => [

        {
            type: "input",
            name: "title",
            message: "What is the title of the new role?"
        },
        {
            type: "input",
            name: "salary",
            message: "What is the salary of this role (no commas please)?"
        },
        {
            type: "list",
            name: "department_id",
            message: "To which department does this role belong?",
            choices: dept
        }
    ],

    updateEmployee: (employees) => [
        {
            type: "list",
            name: "id",
            message: "Who would you like to update?",
            choices: employees
        }
    ],

    updateEmployeeCont: (firstName, lastName, roles, managers) => [

        {
            type: "input",
            name: "first_name",
            default: firstName,
            message: "What is the employee's updated first name?",
        },
        {
            type: "input",
            name: "last_name",
            default: lastName,
            message: "What is the employee's updated last name?"
        },
        {
            type: "list",
            name: "role_id",
            message: "What is the employee's updated role?",
            choices: roles
        },
        {
            type: "list",
            name: "manager_id",
            message: "Who is the employee's updated manager?",
            choices: managers

        },
        {
            type: "confirm",
            name: "is_manager",
            message: "Is this employee a manager?"

        }

    ],

    deleteEmployee: (employees) => [

        {
            type: "list",
            name: "id",
            message: "Which employee would you like to delete?",
            choices: employees
        }

    ],

    deleteDepartment: (dept) => [

        {
            type: "list",
            name: "id",
            message: "Which department would you like to delete?",
            choices: dept
        }

    ],

    deleteRole: (roles) => [

        {
            type: "list",
            name: "id",
            message: "Which role would you like to delete?",
            choices: roles
        }

    ],

    totalUtilizedBudget: (dept) => [

        {
            type: "list",
            name: "id",
            message: "For which department would you like to view the total utilized budget?",
            choices: dept
        }
    ],

    viewEmployeesByManager: (manager) => [

        {
            type: "list",
            name: "id",
            message: "For which manager would you like to view employees?",
            choices: manager
        }
    ]

};
