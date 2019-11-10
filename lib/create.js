'use strict';
const fs = require('fs');

const commander = require('commander');
const chalk = require('chalk');
const inquirer = require('inquirer');

const packageJson = require('../package.json');
const { cQuick, cStandard, cCustom } = require('./createProj');

let projectName;

const program = new commander
    .Command(chalk.cyan(packageJson.name))
    .version(packageJson.version)
    .arguments('<project-directory>')
    .usage(`${chalk.green('<project-directory>')} ${chalk.magenta('[options]')}`)
    // .option('-m, --mode <type>', `快速模式 ${chalk.magenta('quick')} 、 标准模式 ${chalk.magenta('standard')}` )
    .option('-q, --quick', `${chalk.magenta('快速模式(单选)')}` )
    .option('-s, --standard', `${chalk.magenta('标准模式(单选)')}` )
    .option('-c, --custom', `${chalk.magenta('自定义模式(单选、默认)')}` )
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
    const ok = await new Promise((resolve) => {
        fs.access(projectName, fs.constants.F_OK, (error) => {
            if (error) {
                resolve(true);
            } else {
                resolve(false);
            }
        });
    })
    if (ok) {
        if (program.standard) {
            cStandard(projectName);
        } else if (program.quick) {
            cQuick(projectName);
        } else {
            const { options } = await inquirer.prompt([
                {
                    type: 'checkbox',
                    name: 'options',
                    choices: [
                        { name: '状态管理', value: 'useDataManage' },
                        { name: '代码检测', value: 'useEslint' },
                        { name: '样式预处理', value: 'useScss' },
                    ]
                }
            ]);
            const useDataManage = options.indexOf('useDataManage') !== -1;
            const useEslint = options.indexOf('useEslint') !== -1;
            const useScss = options.indexOf('useScss') !== -1;
            const useUi = options.indexOf('useUi') !== -1;
            let dataMode;
            if (useDataManage) {
                dataMode = await inquirer.prompt([
                    {
                        type: 'list',
                        name: 'dataMode',
                        choices: [
                            { name: 'redux-saga' },
                            { name: 'redux-thunk' },
                            { name: 'react-mobx' },
                        ],
                        filter: (val) => val,
                        message: '请选择一个状态管理方式',
                    }
                ]).then(({dataMode}) => dataMode.split('-').pop());
            }
            cCustom(projectName, useScss, useEslint, dataMode);
        }
    } else {
        console.error(
            `
        ${chalk.red(`"${projectName}"`)} 项目已存在.
            `
        )
        process.exit(1);
    }
}