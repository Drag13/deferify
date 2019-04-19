const _fs = require('fs');
const _path = require('path');
const _deferify = require('./deferify');

(function (fs, path, transform) {
    const [rawPathToFile] = process.argv.slice(2);
    const pathToFile = path.join(__dirname, rawPathToFile);
    const file = fs.readFileSync(pathToFile, 'utf8');

    const result = transform(file);
    fs.writeFileSync(pathToFile, result, { encoding: 'utf8' });
}(_fs, _path, _deferify));