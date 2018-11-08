#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const program = require('commander');
const chalk = require('chalk');
const map = require('map-stream');
const vfs = require('vinyl-fs');

program
    .usage('<ProjectName> [options]')
    .option('--all', 'create react with redux and router')
    .parse(process.argv)
    .on('--help', printHelp);

const appName = program.args[0];

if (!appName) {
    program.help();
} else {
    const dest = path.join(process.cwd(), appName);
    if (fs.existsSync(appName)) {
        console.error(chalk.red(`${appName} is not empty`));
        process.exit(1);
    }
    fs.mkdirSync(dest);


    test();

    if (program.all) {
        vfs.src('./template/all/**/*', {dot: true})
            .pipe(map(function(file, cb) {
                console.log(file.path);
                cb(null, file);
            }))
            .pipe(vfs.dest(dest));
    } else {
        vfs.src('./template/basic/**/*')
            .pipe(map(function(file, cb) {
                console.log(file.path);
                cb(null, file);
            }))
            .pipe(vfs.dest(dest));

    }


}

async function test() {
    await delay();
    console.log('ok');
}

function delay() {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve();
        },5000);
    })    
}




function printHelp() {
    console.log();
    console.log('Examples:');
    console.log('ds-rcli <ProjectName>   create a basic react application');
    console.log('ds-rcli <ProjectName>   create react application with react-redux and react-router');
    console.log();
}