const path = require('path');
const fs = require('fs');
const _fs = require('fs-extra');
const downloadGitRepo = require('download-git-repo');
const chalk = require('chalk');

// const { getBase, getDev, getProd, getPkg, getGI } = require('./createFile');
const { getGI } = require('./getFile');

const cSimple = async (projectName) => {
	await _fs.ensureDir(`${projectName}`);
	await download('dsaco/react-templates', projectName);

	// await

	// await _fs.copy(path.resolve(__dirname, './template/quick'), projectName);
	// await fs.writeFileSync(`${projectName}/.gitignore`, getGitIgnore(), 'utf-8');
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

module.exports = {
	cSimple,
};
