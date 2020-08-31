//A Quick demo that produces an endless prompt until you exit from it.
var inquirer = require("inquirer");
var fs = require('fs');


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
        choices:["Add a Manager", "Add a Engineer", "Add a Intern","Go Back to Main Menu"]
        
    }

];

addManager =()=>{

}

addEngineer =()=>{

}

addIntern =()=>{

}


function teamMaker() {
    inquirer.prompt(addEmployees).then((answer) => {
        const choice = answer.addEdit;
        console.log(choice + " is type of " + typeof (choice));
        if (choice.includes("Add a Manager")) {
            addManager();
        } else if (choice.includes("Add a Engineer")) {
            addEngineer();
        } else if (choice.includes("Add a Intern")) {
            addInter();
        } else if (choice.includes("Go Back to Main Menu")) {
            init();
        }
    });
}

function init() {
    inquirer.prompt(mainMenu).then((answer)=>{
    const choice = answer.MainMenu;
    console.log(choice + " is type of " + typeof (choice));    
     if (choice.includes("Create_Team")) {
          teamMaker();  
      }else{
          console.log("Exiting....")
      }
    });
}
let currentPrompt = mainMenu;
init();