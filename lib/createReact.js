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

    const { mode } = await inquirer.prompt([
        {
            type: 'list',
            name: 'mode',
            choices: [ 
                { name: 'Quick start' },
                { name: 'Manually select features' },
            ],
            filter: function(val) {
                return val.split(/\s/)[0];
            },
            message: 'Please pick a preset',
        }
    ]);
    if (mode === 'Manually') {
        const { options } = await inquirer.prompt([
            {
                type: 'checkbox',
                name: 'options',
                choices: [
                    { name: 'create with redux', value: 'useRedux' },
                    { name: 'create with eslint', value: 'useEslint' },
                ]
            }
        ]);
        const useRedux = options.indexOf('useRedux') !== -1;
        const useEslint = options.indexOf('useEslint') !== -1;
        let redux;
        if (useRedux) {
            redux = await inquirer.prompt([
                {
                    type: 'list',
                    name: 'redux',
                    choices: [ 
                        { name: 'redux-saga' },
                        { name: 'redux-thunk' },
                    ],
                    filter: function(val) {
                        return val.split('-')[1];
                    },
                    message: 'Please pick one redux manager',
                }
            ]).then(({redux}) => redux)
        }

        if (useEslint) {
            url += `#eslint`;
            if (redux) {
                url += `-${redux}`;
            }
        } else {
            if (redux) {
                url += `#${redux}`;
            }
        }
    }
    await downloadFile(url, name);
    printSuccess(appName);
}

