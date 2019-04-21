#! /usr/bin/env node
const _deferify = require('./deferify');
const _file = require('./file');
const defaultPathToFile = '/dist';

(function (file, transform) {
    console.log('STARTING: deferify starts');
    let [rawPathToFile] = process.argv.slice(2);
    rawPathToFile = rawPathToFile || defaultPathToFile;

    const pathToFile = file.normalizePath(rawPathToFile);

    if (file.isFile(pathToFile)) {
        return tryUpdateFile(pathToFile) ? 0 : -1;
    } else {
        const files = file.getAllIndexFiles(pathToFile);
        console.log(files);
        files.forEach(tryUpdateFile);
    }

    function tryUpdateFile(filePath) {

        if (!file.exists(filePath)) {
            console.error(`ERROR: file "${filePath}" not exists or not accessible. Operation aborted.`);
            return false;
        }

        let fileContent = '';
        try {
            fileContent = file.read(filePath);
        } catch (e) {
            console.error(`ERROR: unexpected error during reading file: ${e}. Operation aborted.`);
            return false;
        }

        const result = transform(fileContent);

        try {
            file.write(filePath, result);
        } catch (e) {
            console.error(`ERROR: unexpected error during writing file: ${e}. Operation aborted.`);
            return false;
        }

        console.log("SUCCESS. Everything is done. Wish you fastest app!");

        return true;
    }
}(_file, _deferify));