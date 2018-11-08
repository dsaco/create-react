const validateProjectName = require('validate-npm-package-name');
const chalk = require('chalk');

function checkAppName(appName) {
    const validationResult = validateProjectName(appName);
    if (!validationResult.validForNewPackages) {
        console.error(
            `Could not create a project called ${chalk.red(`"${appName}"`)} because of npm naming restrictions.`
        )
        process.exit(1);
    }
}

function printSuccess(appName) {
    console.log(
        `

        change directory:
        > cd ${appName}

        install dependencies:
        > npm install

        run the app:
        > npm start
        `
    );
}

module.exports = {
    checkAppName,
    printSuccess,
}