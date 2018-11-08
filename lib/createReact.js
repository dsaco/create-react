'use strict';
const path = require('path');
const os = require('os');



const commander = require('commander');
const fs = require('fs-extra');
const chalk = require('chalk');
const vfs = require('vinyl-fs');
const map = require('map-stream');

const packageJson = require('../package.json');
const { checkAppName, printSuccess } = require('./utils');
const { dep, eslintDep } = require('./consts');

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

function copyFile(from, to) {
    return new Promise(resolve => {
        vfs.src(from, {dot: true})
            .pipe(vfs.dest(to))
            .on('end', () => {
                resolve();
            })
    })
}

async function createApp(name, useSaga, useMobx, useEslint) {
    
    const root = path.resolve(name);
    const appName = path.basename(root);
    checkAppName(appName);
    fs.ensureDirSync(name);

    console.log( `  Creating a new React app in ${chalk.green(root)}.`);

    await copyFile(['./template/basic/**/*','!./template/basic/node_modules/**/*'], root)
    
    if (useEslint) {
        await copyFile([
            './template/eslint/**/*',
        ], root);
    }

    // const packageJson = {
    //     name: appName,
    //     version: '0.1.0',
    //     private: true,
    //     scripts: {
    //         start: 'webpack-dev-server --config build/webpack.config.dev.js',
    //         build: 'webpack --config build/webpack.config.prod.js',
    //     },
    // }
    
    
    // fs.writeFileSync(
    //     path.join(root, '.gitignore'),
    //     'node_modules' + os.EOL
    // );
    // fs.writeFileSync(
    //     path.join(root, '.gitignore'),
    //     'node_modules' + os.EOL
    // );
    

    // Object.assign(packageJson, dep);
    // if (useEslint) {
    //     Object.assign(packageJson.devDependencies, eslintDep);
        
    // } else {

    // }
    // fs.writeFileSync(
    //     path.join(root, 'package.json'),
    //     JSON.stringify(packageJson, null, 2) + os.EOL
    // );
    // fs.writeFileSync(
    //     path.join(root, 'package.json'),
    //     'JSON.stringify(packageJson, null, 2)' + os.EOL
    // );
    printSuccess(appName);
    
}

