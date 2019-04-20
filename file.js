const fs = require('fs');
const path = require('path');

module.exports = {

    /**
     * Checks if files exists without exceptions
     * @param {string} filePath Absolute and normalized path to the file
     * @return {boolean} Returns true if the file exists and accessible
     */
    exists: function (filePath) {
        try {
            return fs.existsSync(filePath);
        } catch (e) { }
        return false;
    },

    /**
     * Reads the file from disk
     * @param {path} filePath Absolute path to the file
     * @param {encoding} encoding
     * @returns {string} Returns file content as text
     */
    read: function (filePath, encoding = 'utf8') {
        if (filePath == null || filePath === '') {
            throw new Error('Path to the file can\'t be empty');
        }

        return fs.readFileSync(filePath, { encoding });
    },

    /**
     * Write file to the disk
     * @param {string} filePath Absolute path to the file
     * @param {string} content Content to write
     * @param {string} encoding Default encoding is set to UTF8
     */
    write: function (filePath, content, encoding = 'utf8') {
        if (filePath == null || filePath === '') {
            throw new Error('Path to the file can\'t be empty');
        }

        return fs.writeFileSync(filePath, content, { encoding });
    },

    /**
     * Normalize path and adds .html if needed
     * @param {string} path Path to the file
     * @returns {string} Returns absolute path to the file with .html extension
     */
    normalizePath: function (filePath) {
        if (filePath == null || filePath === '') {
            throw new Error('Path to the file can\'t be empty');
        }

        filePath = filePath.indexOf('.') === -1 ? `${filePath}.html` : filePath;
        return path.join(process.cwd(), filePath);
    }
}