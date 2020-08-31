const Employee = require("./Employee");

class Engineer extends Employee{
    constructor(name, id, email, GitHubUser){
        super(name,id,email); 
        this.github = GitHubUser;
        this.role = "Engineer";
    }

    getGithub(){
        return this.github;
    }

}

module.exports = Engineer;