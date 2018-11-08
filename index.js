#!/usr/bin/env node

'use strict';

const chalk = require('chalk');

const currentNodeVersion = process.versions.node;
const semver = currentNodeVersion.split('.');
const major = semver[0];

if (major < 8) {
    console.error(
        chalk.red(
            `
            You are running Node 
            ${currentNodeVersion}

            Create React App requires Node 8 or higher.
            Please update your version of Node.
            `
        )
    );
    process.exit(1);
}

require('./lib/createReact');
