const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");
const Employee = require("./lib/Employee");
const { type } = require("os");
const Team = [];



// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
let mainMenu = [
    {
        type: "list",
        name: "MainMenu",
        message: "What would you like to do?",
        choices: ['Create_Team', 'Exit'],
    },

];

let addEmployees = [
    {
        type: "list",
        name: "addEdit",
        message: "Add/Edit Employess - What would you like to do",
        choices: ["Add a Manager", "Add a Engineer", "Add a Intern","Render a Team List", "Go Back to Main Menu"]

    }

];

addManager = () => {
    const addManager = [
        {
            type: 'input',
            name: 'mgrName',
            message: 'What is the Manager\'s Name?',
        },
        { 
            type: 'input',
            name: 'id',
            message: 'Please enter the ID.',
            validate: function (value) {
                var valid = !isNaN(parseFloat(value));
                return valid || 'Please enter a number';
            },
            filter: Number,
        },
        {
            type: 'input',
            name: 'mgrEmail',
            message: 'What is the Manager\'s Email?',
        },
        {
            type: 'input',
            name: 'officeNumber',
            message: 'Please enter the Manager\'s office number.',
            validate: function (value) {
                var valid = !isNaN(parseFloat(value));
                return valid || 'Please enter a number';
            },
            filter: Number,
        }
    ]

    inquirer.prompt(addManager).then((aManagerObj) => {
       const {mgrName, id, mgrEmail, officeNumber} = aManagerObj;
       let ManagerToAdd = new Manager(mgrName, id, mgrEmail, officeNumber);
        console.log(ManagerToAdd);
        Team.push(ManagerToAdd);
        console.log(Team);
        console.log("manger is type of" + typeof(ManagerToAdd));
        teamMaker();
    });


}

addEngineer = () => {
    const addEngineer = [
        {
            type: 'input',
            name: 'engName',
            message: 'What is the Engineer\'s Name?',
        },
        {
            type: 'input',
            name: 'id',
            message: 'Please enter the ID.',
            validate: function (value) {
                var valid = !isNaN(parseFloat(value));
                return valid || 'Please enter a number';
            },
            filter: Number,
        },
        {
            type: 'input',
            name: 'engEmail',
            message: 'What is the Engineer\'s Email?',
        },
        {
            type: 'input',
            name: 'GitHubUser',
            message: 'Please enter the Engineer\'s GitHub user name.',
        }
    ]

    inquirer.prompt(addEngineer).then((aEngineerObj) => {
        const { engName, id, engEmail, GitHubUser } = aEngineerObj;
        let EngineerToAdd = new Engineer(engName, id, engEmail, GitHubUser);
        console.log(EngineerToAdd);
        Team.push(EngineerToAdd);
        console.log(Team);
        teamMaker();
    });
}

addIntern = () => {
    const addIntern = [
        {
            type: 'input',
            name: 'intrnName',
            message: 'What is the Intern\'s Name?',
        },
        {
            type: 'input',
            name: 'id',
            message: 'Please enter the ID.',
            validate: function (value) {
                var valid = !isNaN(parseFloat(value));
                return valid || 'Please enter a number';
            },
            filter: Number,
        },
        {
            type: 'input',
            name: 'intrnEmail',
            message: 'What is the Intern\'s Email?',
        },
        {
            type: 'input',
            name: 'school',
            message: 'What school did the intern attend?',
        }
    ]

    inquirer.prompt(addIntern).then((aInternObj) => {
        const { intrnName, id, intrnEmail, school } = aInternObj;
        let InternToAdd = new Intern(intrnName, id, intrnEmail, school);
        console.log(InternToAdd);
        Team.push(InternToAdd);
        console.log(Team);
        teamMaker();
    });
}

function renderTeam(){
    console.log("renderTeam function called");
    console.log("Team is type of:" + typeof(Team));
    console.log("rendering team....");
    let teamHTML = render(Team);
    console.log("Team is type of:" + typeof(Team));
    console.log(teamHTML);
    fs.writeFile(outputPath, teamHTML, function (err) {

        if (err) {
            return console.log(err);
        }

        console.log("Success!");

    });

    teamMaker();
}


function teamMaker() {
    inquirer.prompt(addEmployees).then((answer) => {
        const choice = answer.addEdit;
        if (choice.includes("Add a Manager")) {
            addManager();
        } else if (choice.includes("Add a Engineer")) {
            addEngineer();
        } else if (choice.includes("Add a Intern")) {
            addIntern();
        } else if (choice.includes("Render a Team List")){
            renderTeam();
        } else if (choice.includes("Go Back to Main Menu")) {
            init();
        }
    });
}

function init() {
    inquirer.prompt(mainMenu).then((answer) => {
        const choice = answer.MainMenu;
        console.log(choice + " is type of " + typeof (choice));
        if (choice.includes("Create_Team")) {
            teamMaker();
        } else {
            console.log("Exiting....")
        }
    });
}
let currentPrompt = mainMenu;
init();