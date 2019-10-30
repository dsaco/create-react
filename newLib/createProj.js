const path = require('path');
const fs = require('fs');
const _fs = require('fs-extra');

const createProj = async (projectName) => {

    await _fs.ensureDir(`${projectName}`);
    await _fs.copy(path.resolve(__dirname, './template/quick'), projectName);
}

module.exports = {
    createProj,
}