'use strict';
const path = require('path');

const commander = require('commander');
const fs = require('fs');
const _fs = require('fs-extra');
const chalk = require('chalk');
const inquirer = require('inquirer');
const download = require('download-git-repo');

const packageJson = require('../package.json');
const { checkAppName, printSuccess, printHelp, printNoProName, downloadFile } = require('./utils');
const { getBase, getDev, getProd, getPkg } = require('./createFile');

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

    const { mode } = await inquirer.prompt([
        {
            type: 'list',
            name: 'mode',
            choices: [
                { name: '快速模式' },
                { name: '标准模式' },
                { name: '自定义模式' },
            ],
            filter: function(val) {
                return val.split(/\s/)[0];
            },
            message: '请选择模式',
        }
    ]);
    if (mode === '快速模式') {
        await _fs.ensureDir(`${name}/build`);
        await Promise.all([
            _fs.copy(path.resolve(__dirname, '../template/basic/src'), `${name}/src`),
            fs.writeFileSync(`${name}/build/webpack.config.base.js`, getBase(), 'utf-8'),
            fs.writeFileSync(`${name}/build/webpack.config.dev.js`, getDev(), 'utf-8'),
            fs.writeFileSync(`${name}/build/webpack.config.prod.js`, getProd(), 'utf-8'),
            fs.writeFileSync(`${name}/package.json`, getPkg(), 'utf-8'),
            _fs.copy(path.resolve(__dirname, '../template/.gitignore'), `${name}/.gitignore`),
        ]);
    } else if (mode === '标准模式') {
        const dataMode = 'saga';
        const useScss = true;
        const useEslint = true;
        await _fs.ensureDir(`${name}/build`);
        await Promise.all([
            _fs.copy(path.resolve(__dirname, '../template/basic/src'), `${name}/src`),
            fs.writeFileSync(`${name}/build/webpack.config.base.js`, getBase({dataMode}), 'utf-8'),
            fs.writeFileSync(`${name}/build/webpack.config.dev.js`, getDev({useScss, useEslint}), 'utf-8'),
            fs.writeFileSync(`${name}/build/webpack.config.prod.js`, getProd({useScss}), 'utf-8'),
            fs.writeFileSync(`${name}/package.json`, getPkg({useScss, useEslint, dataMode}), 'utf-8'),
            _fs.copy(path.resolve(__dirname, '../template/.gitignore'), `${name}/.gitignore`),
        ]);
        if (useEslint) {
            await _fs.copy(path.resolve(__dirname, '../template/.eslintrc.js'), `${name}/.eslintrc.js`);
            await _fs.copy(path.resolve(__dirname, '../template/saga/stores'), `${name}/src/stores`);
            await _fs.copy(path.resolve(__dirname, '../template/saga/pages/About.jsx'), `${name}/src/pages/About.jsx`);
            await _fs.copy(path.resolve(__dirname, '../template/saga/main.jsx'), `${name}/src/main.jsx`);
        }
    } else if (mode === '自定义模式') {
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

        await _fs.ensureDir(`${name}/build`);
        await Promise.all([
            _fs.copy(path.resolve(__dirname, '../template/basic/src'), `${name}/src`),
            fs.writeFileSync(`${name}/build/webpack.config.base.js`, getBase({dataMode}), 'utf-8'),
            fs.writeFileSync(`${name}/build/webpack.config.dev.js`, getDev({useScss, useEslint}), 'utf-8'),
            fs.writeFileSync(`${name}/build/webpack.config.prod.js`, getProd({useScss}), 'utf-8'),
            fs.writeFileSync(`${name}/package.json`, getPkg({useScss, useEslint, dataMode}), 'utf-8'),
            _fs.copy(path.resolve(__dirname, '../template/.gitignore'), `${name}/.gitignore`),
        ]);
        if (useEslint) {
            await _fs.copy(path.resolve(__dirname, '../template/.eslintrc.js'), `${name}/.eslintrc.js`);
        }
        if (dataMode === 'saga') {
            await _fs.copy(path.resolve(__dirname, '../template/saga/stores'), `${name}/src/stores`);
            await _fs.copy(path.resolve(__dirname, '../template/saga/pages/About.jsx'), `${name}/src/pages/About.jsx`);
            await _fs.copy(path.resolve(__dirname, '../template/saga/main.jsx'), `${name}/src/main.jsx`);
        } else if (dataMode === 'thunk') {
            await _fs.copy(path.resolve(__dirname, '../template/thunk/stores'), `${name}/src/stores`);
            await _fs.copy(path.resolve(__dirname, '../template/thunk/pages/About.jsx'), `${name}/src/pages/About.jsx`);
            await _fs.copy(path.resolve(__dirname, '../template/thunk/main.jsx'), `${name}/src/main.jsx`);
        } else if (dataMode === 'mobx') {
            await _fs.copy(path.resolve(__dirname, '../template/mobx/stores'), `${name}/src/stores`);
            await _fs.copy(path.resolve(__dirname, '../template/mobx/pages/About.jsx'), `${name}/src/pages/About.jsx`);
            await _fs.copy(path.resolve(__dirname, '../template/mobx/main.jsx'), `${name}/src/main.jsx`);
        }
    }
    printSuccess(appName);
}
