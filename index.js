#! /usr/bin/env node
const _deferify = require('./deferify');
const _file = require('./file');

(function (file, transform) {
    console.log('STARTING: deferify starts');
    const [rawPathToFile] = process.argv.slice(2);

    if (rawPathToFile == undefined || rawPathToFile === '') {
        console.error('ERROR: path to file is empty. Operation aborted.');
        return -1
    }

    const pathToFile = file.normalizePath(rawPathToFile);

    if (!file.exists(pathToFile)) {
        console.error(`ERROR: file "${pathToFile}" not exists or not accessible. Operation aborted.`);
        return -1;
    }

    let fileContent = '';
    try {
        fileContent = file.read(pathToFile);
    } catch (e) {
        console.error(`ERROR: unexpected error during reading file: ${e}. Operation aborted.`);
        return -2;
    }

    const result = transform(fileContent);

    try {
        file.write(pathToFile, result);
    } catch (e) {
        console.error(`ERROR: unexpected error during writing file: ${e}. Operation aborted.`);
        return -3;
    }

    console.log("SUCCESS. Everything is done. Wish you fastest app!");
    return 0;
}(_file, _deferify));