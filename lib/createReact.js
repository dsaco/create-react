'use strict';
const path = require('path');

const commander = require('commander');
const fs = require('fs-extra');
const chalk = require('chalk');
const inquirer = require('inquirer');

const packageJson = require('../package.json');
const { checkAppName, printSuccess, printHelp, printNoProName, downloadFile } = require('./utils');

let projectName

const program = new commander.Command(packageJson.name)
    .version(packageJson.version)
    .arguments('<project-directory>')
    .usage(`${chalk.green('<project-directory>')} [options]`)
    .action(name => {
        projectName = name;        
    })
    .on('--help', printHelp)
    .parse(process.argv);

if (typeof projectName === 'undefined') {
    printNoProName(program.name());
    process.exit(1);
}

createApp(projectName);

async function createApp(name) {
    
    const root = path.resolve(name);
    const appName = path.basename(root);
    checkAppName(appName);
    fs.ensureDirSync(name);

    let url = 'dsaco/react-templates';

    let branch = '';

    const { mode } = await inquirer.prompt([
        {
            type: 'list',
            name: 'mode',
            choices: [ 
                { name: 'Quick start' },
                { name: 'Standard' },
                { name: 'Manually select features' },
            ],
            filter: function(val) {
                return val.split(/\s/)[0];
            },
            message: '请选择模式',
        }
    ]);
    if (mode === 'Manually') {
        const { options } = await inquirer.prompt([
            {
                type: 'checkbox',
                name: 'options',
                choices: [
                    { name: 'create with data manage', value: 'useDataManage' },
                    { name: 'create with eslint', value: 'useEslint' },
                ]
            }
        ]);
        const useDataManage = options.indexOf('useDataManage') !== -1;
        const useEslint = options.indexOf('useEslint') !== -1;
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
                    filter: function(val) {
                        return val;
                    },
                    message: '请选择一个状态管理方式',
                }
            ]).then(({dataMode}) => dataMode)
        }
        if (dataMode) {
            if (!branch) {
                branch = '#';
            }
            branch += `$${dataMode}`;
        }
        if (useEslint) {
            if (!branch) {
                branch = '#';
            }
            branch += `$eslint`;
        }
    } else if (mode === 'Standard'){
        branch += '#$redux-saga$eslint';
    }
    url += branch;
    await downloadFile(url, name);
    printSuccess(appName);
}

