/**
 * @param {string} html 
 */
function updateScripts(html, transformScript) {
    return html
        .split('<script')
        .map((line, i) => !!i ? transformScript(line) : line)
        .join('<script');
}

/**
 * Inserts defer attribute inside script tag if needed
 * @param {string} line 
 * @returns Returns new line
 */
function insertDeferAttr(line) {
    const isTransformable =
        line.includes('src') &&
        line.includes('>') &&
        !line.includes('defer') &&
        !line.includes('async');

    return isTransformable ? line.replace(/([^>]*)(>)/, '$1 defer>') : line;
}

function deferify(html) {
    return html != null ? updateScripts(html, insertDeferAttr) : '';
}

module.exports = { deferify };