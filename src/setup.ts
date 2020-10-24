const inquirer = require('inquirer');
const fs = require('fs');
let baseConfig = fs.readFileSync("./config_base.txt", "utf8");

let prompts = [{
    type: "input",
    name: "token",
    message: "Please enter your user token."
}];

(async function() {
    console.log("Setting up AutoReply configuration...");
    const answers = await inquirer.prompt(prompts);
    baseConfig = baseConfig.replace("{{token}}", answers.token);
    fs.writeFileSync("./config.json", baseConfig);
    console.log("REMEMBER TO NEVER SHARE YOUR TOKEN WITH ANYONE!");
    console.log("Configuration has been written, enjoy!");
})();