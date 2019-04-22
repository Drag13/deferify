'use strict';
const file = require('./src/file');
const tryDeferify = require('./src/deferify');

const defaultPath = './dist';

const [rawPathToFile = defaultPath] = process.argv.slice(2);
const normalizedPath = file.normalizePath(rawPathToFile);
const fileList = file.isFile(normalizedPath)
    ? [normalizedPath]
    : file.findFiles(normalizedPath);

if (fileList.length > 0) {
    fileList.forEach(path => tryDeferify(path)
        ? console.log(`LOG: "${path}" updated`)
        : console.log(`LOG: "${path}" doesn't require update`));
} else {
    console.log(`WARNING: No files found: "${normalizedPath}"`);
}