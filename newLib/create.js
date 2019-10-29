'use strict';
const path = require('path');

const commander = require('commander');
const chalk = require('chalk');
const inquirer = require('inquirer');

const packageJson = require('../package.json');
const { createProj } = require('./createProj');

let projectName;

const program = new commander
    .Command(chalk.cyan(packageJson.name))
    .version(packageJson.version)
    .arguments('<project-directory>')
    .usage(`${chalk.green('<project-directory>')} ${chalk.magenta('[options]')}`)
    // .option('-m, --mode <type>', `快速模式 ${chalk.magenta('quick')} 、 标准模式 ${chalk.magenta('standard')}` )
    .option('-q, --quick', `${chalk.magenta('快速模式')}` )
    .option('-s, --standard', `${chalk.magenta('标准模式')}` )
    .action((name) => projectName = name)
    .parse(process.argv);

if (typeof projectName === 'undefined') {
    console.log(
        `
    请指定项目目录:
        ${chalk.cyan(packageJson.name)} ${chalk.green('<project-directory>')}
    
    更多详情请输入:
        ${chalk.cyan(packageJson.name)} ${chalk.green('--help')}
        `
    );
    process.exit(1);
}

if (projectName.match(/[^a-zA-Z0-9_\.-]/) || projectName.match(/^[^A-Za-z]/) || projectName.match(/\.$/)) {
    console.error(
        `
    不能创建名为 ${chalk.red(`"${projectName}"`)} 的项目.
        `
    )
    process.exit(1);
}

createApp();

async function createApp() {
    if (program.standard) {

    } else if (program.quick) {
        createProj(projectName);
    } else {
        console.log(program.quick)
        console.log(program.standard)

    }
}