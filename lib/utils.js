const validateProjectName = require('validate-npm-package-name');
const chalk = require('chalk');
const download = require('download-git-repo');

function checkAppName(appName) {
    const validationResult = validateProjectName(appName);
    if (!validationResult.validForNewPackages) {
        console.error(
            `
由于npm的命名限制 不能创建名为 ${chalk.red(`"${appName}"`)} 的项目.
            `
        )
        process.exit(1);
    }
}

function printSuccess(appName) {
    console.log(
    `
项目创建成功

进入目录并安装依赖:
    > cd ${chalk.green(appName)} && npm i

启动项目:
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
请指定项目目录:
    ${chalk.cyan(name)} ${chalk.green('<project-directory>')}

更多详情请输入:
    ${chalk.cyan(name)} ${chalk.green('--help')}
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
