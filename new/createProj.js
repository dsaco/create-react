const path = require('path');
const fs = require('fs');
const _fs = require('fs-extra');
const downloadGitRepo = require('download-git-repo');
const chalk = require('chalk');

// const { getBase, getDev, getProd, getPkg, getGI } = require('./createFile');
const { getGI } = require('./getFile');

const cSimple = async (projectName) => {
	await _fs.ensureDir(`${projectName}`);
    await download('dsaco/react-templates#simple', projectName);
    await replacePkgName(`${projectName}/package.json`, projectName)
};
const cStandard = async (projectName) => {
	await _fs.ensureDir(`${projectName}`);
    await download('dsaco/react-templates#standard', projectName);
    await replacePkgName(`${projectName}/package.json`, projectName)
};
const cMine = async (projectName) => {
	await _fs.ensureDir(`${projectName}`);
    await download('dsaco/react-templates#mine', projectName);
    await replacePkgName(`${projectName}/package.json`, projectName)
};
const cAntd = async (projectName) => {
	await _fs.ensureDir(`${projectName}`);
    await download('dsaco/react-templates#ant-admin', projectName);
    await replacePkgName(`${projectName}/package.json`, projectName)
};

function download(url, dest) {
	return new Promise((resolve) => {
		downloadGitRepo(url, dest, (err) => {
            if (err) {
                console.error(
                    `
        ${chalk.red(`Error:`)} ${err.message}
                    `
                );
            } else {
                resolve();
            }
		});
	});
}

async function replacePkgName(path, projectName) {
    const content = await fs.readFileSync(path, 'utf-8')
    await fs.writeFileSync(path, content.replace('react-templates', projectName), 'utf-8')
}

module.exports = {
    cSimple,
    cStandard,
    cMine,
    cAntd,
};
