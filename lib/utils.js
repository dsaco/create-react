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

module.exports = {
    checkAppName
}