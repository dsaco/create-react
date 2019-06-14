const path = require('path');
const fs = require('fs');
const _fs = require('fs-extra');
const { getBase, getDev, getProd, getPkg, getGI } = require('./createFile');

const createDir = async (name, useScss = false, useEslint = false, dataMode = false, uiLib = false) => {
    if (uiLib === 'ant') {
        useScss = true;
    }
    await _fs.ensureDir(`${name}/build`);
    await Promise.all([
        _fs.copy(path.resolve(__dirname, '../template/basic/src'), `${name}/src`),
        fs.writeFileSync(`${name}/build/webpack.config.base.js`, getBase({dataMode, uiLib}), 'utf-8'),
        fs.writeFileSync(`${name}/build/webpack.config.dev.js`, getDev({useScss, useEslint}), 'utf-8'),
        fs.writeFileSync(`${name}/build/webpack.config.prod.js`, getProd({useScss}), 'utf-8'),
        fs.writeFileSync(`${name}/package.json`, getPkg({useScss, useEslint, dataMode, uiLib}), 'utf-8'),
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
    if (uiLib) {
        await _fs.copy(path.resolve(__dirname, `../template/${uiLib}/pages/App.jsx`), `${name}/src/pages/App.jsx`);
    }
}

module.exports = {
    createDir,
}
