const validateProjectName = require('validate-npm-package-name');
const chalk = require('chalk');
const download = require('download-git-repo');

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
    > cd ${chalk.green(appName)}

    install dependencies:
    > npm install

    run the app:
    > npm start
    `
    );
}

function printHelp() {
    console.log(
    `
    Only ${chalk.green('<project-directory>')} is required.
    `
    );
}

function printNoProName(name) {
    console.log(
    `
    Please specify the project directory:
        ${chalk.cyan(name)} ${chalk.green('<project-directory>')}

    For example:
        ${chalk.cyan(name)} ${chalk.green('my-app-name')}
    
    Run ${chalk.cyan(name)} ${chalk.green('--help')} to see all options.
    `
    );
}

function downloadFile(url, target) {
    return new Promise(resolve => {
        download(url, target, function (err) {
            if (!err) {
                resolve();
            }
        })
    })
    
}

module.exports = {
    checkAppName,
    printSuccess,
    printHelp,
    printNoProName,
    downloadFile,
}