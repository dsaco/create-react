'use strict';
const path = require('path');
const os = require('os');



const commander = require('commander');
const fs = require('fs-extra');
const chalk = require('chalk');

const packageJson = require('../package.json');
const { checkAppName } = require('./utils');
const { dep } = require('./consts');

let projectName

const program = new commander.Command(packageJson.name)
    .version(packageJson.version)
    .arguments('<project-directory>')
    .usage(`${chalk.green('<project-directory>')} [options]`)
    .action(name => {
        projectName = name;        
    })
    .option('--eslint')
    .option('--redux-saga')
    .option('--redux-mobx')
    .on('--help', () => {
        console.log(`
            Only ${chalk.green('<project-directory>')} is required.
            --redux        create with redux
            --redux-mobx   create redux by mobx
            --eslint       add eslint
        `)
    })
    .parse(process.argv);

if (typeof projectName === 'undefined') {
    console.log(`
        Please specify the project directory:
        ${chalk.cyan(program.name())} ${chalk.green('<project-directory>')}

        For example:
            ${chalk.cyan(program.name())} ${chalk.green('my-react-app')}
        
        Run ${chalk.cyan(program.name())} ${chalk.green('--help')} to see all options.
    
    `);
    process.exit(1);
}

createApp(
    projectName, 
    program.reduxSaga,
    program.reduxMobx,
    program.eslint,
);


function createApp(name, useSaga, useMobx, useEslint) {
    
    const root = path.resolve(name);
    const appName = path.basename(root);
    checkAppName(appName);
    fs.ensureDirSync(name);

    console.log(`Creating a new React app in ${chalk.green(root)}.`);

    const packageJson = {
        name: appName,
        version: '0.1.0',
        private: true,
        scripts: {
            start: 'webpack-dev-server --config build/webpack.config.dev.js',
            build: 'webpack --config build/webpack.config.prod.js',
        },
    }
    Object.assign(packageJson, dep);
    fs.writeFileSync(
        path.join(root, 'package.json'),
        JSON.stringify(packageJson, null, 2) + os.EOL
    );
    fs.writeFileSync(
        path.join(root, '.gitignore'),
        'node_modules' + os.EOL
    );
    fs.writeFileSync(
        path.join(root, '.gitignore'),
        'node_modules' + os.EOL
    );
    

    // if ()



    console.log(appName);
    console.log(useSaga);
    console.log(useMobx);
    console.log(useEslint);
}

