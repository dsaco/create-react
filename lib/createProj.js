const path = require('path');
const fs = require('fs');
const _fs = require('fs-extra');
const { getBase, getDev, getProd, getPkg, getGI } = require('./createFile');
const { getGitIgnore } = require('./getFile');

const cQuick = async (projectName) => {
    await _fs.ensureDir(`${projectName}`);
    await _fs.copy(path.resolve(__dirname, './template/quick'), projectName);
    await fs.writeFileSync(`${projectName}/.gitignore`, getGitIgnore(), 'utf-8');
}
const cStandard = async (projectName) => {
    await _fs.ensureDir(`${projectName}`);
    await _fs.copy(path.resolve(__dirname, './template/standard'), projectName);
    await fs.writeFileSync(`${projectName}/.gitignore`, getGitIgnore(), 'utf-8');
}

const cCustom = async (name, useScss = false, useEslint = false, dataMode = false) => {
    await _fs.ensureDir(`${name}/build`);
    await Promise.all([
        _fs.copy(path.resolve(__dirname, '../template/basic/src'), `${name}/src`),
        fs.writeFileSync(`${name}/build/webpack.config.base.js`, getBase({dataMode}), 'utf-8'),
        fs.writeFileSync(`${name}/build/webpack.config.dev.js`, getDev({useScss, useEslint}), 'utf-8'),
        fs.writeFileSync(`${name}/build/webpack.config.prod.js`, getProd({useScss}), 'utf-8'),
        fs.writeFileSync(`${name}/package.json`, getPkg({useScss, useEslint, dataMode}), 'utf-8'),
        fs.writeFileSync(`${name}/.gitignore`, getGI(), 'utf-8'),
        useEslint ? _fs.copy(path.resolve(__dirname, '../template/.eslintrc.js'), `${name}/.eslintrc.js`) : Promise.resolve(),
    ]);
    if (useScss) {
        await _fs.copy(path.resolve(__dirname, '../template/basic/styles'), `${name}/src/styles`);
        await _fs.copy(path.resolve(__dirname, '../template/basic/HomeScss.jsx'), `${name}/src/pages/Home.jsx`);
        if (dataMode) {
            await _fs.copy(path.resolve(__dirname, `../template/${dataMode}/pages/About.jsx`), `${name}/src/pages/About.jsx`);
            await _fs.copy(path.resolve(__dirname, `../template/${dataMode}/mainScss.jsx`), `${name}/src/main.jsx`);
        } else {
            await _fs.copy(path.resolve(__dirname, `../template/basic/mainScss.jsx`), `${name}/src/main.jsx`);
        }
    }
    if (dataMode) {
        await _fs.copy(path.resolve(__dirname, `../template/${dataMode}/stores`), `${name}/src/stores`);
    }
}

module.exports = {
    cQuick,
    cStandard,
    cCustom,
}