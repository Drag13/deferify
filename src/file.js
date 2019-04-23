const fs = require('fs');
const path = require('path');

/**
 * Normalize the path and transform to absolute
 * @param {string} path Path to the file
 * @returns {string} Returns absolute path to the file with .html extension
 */
function normalizePath(filePath = '') {
    return path.join(process.cwd(), filePath);
}

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
 * Reads the file from disk
 * @param {path} filePath Absolute path to the file
 * @param {encoding} encoding
 * @returns {string} Returns file content as text
 */
function read(filePath, encoding = 'utf8') {
    return fs.readFileSync(filePath, { encoding });
}

/**
 * Write file to the disk
 * @param {string} filePath Absolute path to the file
 * @param {string} content Content to write
 * @param {string} encoding Default encoding is set to UTF8
 * @returns {boolean} Returns true if witten
 */
function write(filePath, content, encoding = 'utf8') {
    fs.writeFileSync(filePath, content, { encoding });
    return true;
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

module.exports = {
    normalizePath,
    isFile,
    read,
    write,
    findFiles
}
