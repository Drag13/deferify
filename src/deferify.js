const file = require('./file');
const transform = require('./transform');

/**
 * Tries to insert defer tag to scripts inside the file
 * @param {string} path Normalized path to existing file
 * @returns {boolean} Returns true if file was found and updated
 */
function tryDeferify(path) {
    const text = file.read(path);
    const result = transform(text);

    return text.length !== result.length
        ? file.write(path, result) || true // looks wiered but works
        : false;
}

module.exports = tryDeferify;