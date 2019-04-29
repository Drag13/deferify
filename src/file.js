/**
 * File module
 *@module file 
 */

const fs = require('fs');
const path = require('path');

/**
 * Checks if file/folder exists
 * @param {string} filePath Absolute path to the file
 * @return {boolean} Returns true if the file exists and accessible
 */
function exists(filePath) {
    try { return fs.existsSync(filePath); }
    catch (e) { }

    return false;
}

/**
 * Normalize the path and transform to absolute
 * @param {string} path Path to the file
 * @returns {string} Returns absolute path to the file with .html extension
 */
function normalizePath(filePath = '') {
    return path.join(process.cwd(), filePath);
}

/**
 * Check if the path leads to file or folder
 * @param {string} filePath 
 * @returns {boolean} Returns true if path leads to the folder
 */
function isFile(filePath) {
    try { return exists(filePath) && !fs.lstatSync(filePath).isDirectory(); }
    catch (e) { }

    return false;
}

/**
 * Search for files in the folder and subfolder
 * @param {string} pathToFolder 
 * @param {string} fileName 
 * @returns {string[]} Returns found pathes
 */
function findFiles(pathToFolder, fileName = 'index.html', files = []) {
    const pathToFile = path.join(pathToFolder, fileName);

    if (isFile(pathToFile)) { files.push(pathToFile); }
    if (exists(pathToFolder)) {
        fs.readdirSync(pathToFolder)
            .map(name => path.join(pathToFolder, name))
            .filter((source) => fs.lstatSync(source).isDirectory())
            .forEach(folder => findFiles(folder, fileName, files));
    }

    return files;
}

/**
 * Updates files using transformer function
 * @param {string[]} fileList 
 */
function updateFiles(fileList, transform) {
    return fileList.reduce((sum, path) => {
        const content = fs.readFileSync(path, { encoding: 'utf8' });
        const result = transform(content);
        return content !== result
            ? fs.writeFileSync(path, result) || sum + 1
            : sum;
    }, 0);
}

module.exports = {
    normalizePath
    , isFile
    , findFiles
    , updateFiles
}
