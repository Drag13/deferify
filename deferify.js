/**
 * @param {string} html 
 */
function insert(html) {
    if (!html) { return ''; }
    const result = html.replace(/(<script\b[^src][^defer][^async][^>]*)>/gm, '$1 defer>');
    return result;
}

module.exports = insert;