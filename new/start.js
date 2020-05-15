'use strict';
const fs = require('fs');

const commander = require('commander');
const chalk = require('chalk');
const inquirer = require('inquirer');
const validateProjectName = require('validate-npm-package-name');

const packageJson = require('../package.json');
const { cSimple, cBasic, cStandard, cMine, cAntd } = require('./createProj');

let projectName;

const program = new commander.Command(chalk.cyan(packageJson.name))
	.version(packageJson.version)
	.arguments('<project-directory>')
	.usage(
		`${chalk.green('<project-directory>')} ${chalk.magenta('[options]')}`
	)
	.action((name) => (projectName = name))
	// .option('-m, --mode <type>', `快速模式 ${chalk.magenta('quick')} 、 标准模式 ${chalk.magenta('standard')}` )
	.option('--simple', `${chalk.magenta('快速模式(默认)')}`)
	.option('--basic', `${chalk.magenta('基本模式')}`)
	.option('--standard', `${chalk.magenta('标准模式')}`)
	.option('--antd', `${chalk.magenta('antd-admin')}`)
	.option('--mine', `${chalk.magenta('我的模式')}`)
	// .option('-c, --custom', `${chalk.magenta('自定义模式')}`)
	.parse(process.argv);

if (typeof projectName === 'undefined') {
	console.log(
		`
        请指定项目目录:
            ${chalk.cyan(packageJson.name)} ${chalk.green(
			'<project-directory>'
		)}

        更多详情请输入:
            ${chalk.cyan(packageJson.name)} ${chalk.green('--help')}
            `
	);
	process.exit(1);
}

function checkAppName(appName) {
	const result = validateProjectName(appName);
	if (!result.validForNewPackages) {
		console.error(
			`
        不能创建名为 ${chalk.red(`"${projectName}"`)} 的项目.
            `
		);
		[...(result.errors || []), ...(result.warnings || [])].forEach(
			(error) => {
				console.log(`	${chalk.red('*')} ${error}`);
			}
		);
		process.exit(1);
	}
}

function printSuccess(appName) {
	console.log(
		`
	${chalk.cyan('创建成功')}

	cd ${chalk.blue(appName)} && npm i

	npm start
		`
	);
}

checkAppName(projectName);

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
	});
	if (ok) {
		if (program.simple) {
			await cSimple(projectName);
		} else if (program.basic) {
			await cBasic(projectName);
		} else if (program.mine) {
			await cMine(projectName);
		} else if (program.standard) {
			await cStandard(projectName);
		} else if (program.antd) {
			await cAntd(projectName);
		} else {
			const { type } = await inquirer.prompt([
				{
					type: 'list',
					name: 'type',
					choices: [
						{ name: 'simple' },
						{ name: 'basic' },
						{ name: 'standard' },
						{ name: 'antd-admin' },
						{ name: 'mine' },
					],
					filter: (val) => val,
					message: '请选择一个创建方式',
				},
			]);
			switch (type) {
				case 'simple':
					await cSimple(projectName);
					break;
				case 'basic':
					await cBasic(projectName);
					break;
				case 'standard':
					await cStandard(projectName);
					break;
				case 'antd-admin':
					await cAntd(projectName);
					break;
				case 'mine':
					await cMine(projectName);
					break;
			}
		}
		printSuccess(projectName);
		if (program.custom) {
			// const { options } = await inquirer.prompt([
			//     {
			//         type: 'checkbox',
			//         name: 'options',
			//         choices: [
			//             { name: '状态管理', value: 'useDataManage' },
			//             { name: '代码检测', value: 'useEslint' },
			//             { name: '样式预处理', value: 'useScss' },
			//         ]
			//     }
			// ]);
			// const useDataManage = options.indexOf('useDataManage') !== -1;
			// const useEslint = options.indexOf('useEslint') !== -1;
			// const useScss = options.indexOf('useScss') !== -1;
			// const useUi = options.indexOf('useUi') !== -1;
			// let dataMode;
			// if (useDataManage) {
			//     dataMode = await inquirer.prompt([
			//         {
			//             type: 'list',
			//             name: 'dataMode',
			//             choices: [
			//                 { name: 'redux-saga' },
			//                 { name: 'redux-thunk' },
			//                 { name: 'react-mobx' },
			//             ],
			//             filter: (val) => val,
			//             message: '请选择一个状态管理方式',
			//         }
			//     ]).then(({dataMode}) => dataMode.split('-').pop());
			// }
			// cCustom(projectName, useScss, useEslint, dataMode);
			console.log('暂不支持 = 。=');
		}
	} else {
		console.error(`
        ${chalk.red(`"${projectName}"`)} 项目已存在.
		`);
		process.exit(1);
	}
}
