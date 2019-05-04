/**
 * cli function
 * @param {string[]} args cli arguments
 * @param {any} fileModule module to work with filesystem
 * @param {any} transformModule module to transformHtml
 * @param {any} defaults constants
 */
function cli(args
    , { normalizePath, isFile, findFiles, updateFiles }
    , { deferify }
    , { defaultPath, defaultFile }) {

    console.log(`LOG: deferify starts`);

    const [rawPathToFile = defaultPath] = args;
    const normalizedPath = normalizePath(rawPathToFile);

    const fileList = isFile(normalizedPath)
        ? [normalizedPath]
        : findFiles(normalizedPath);

    const filesUpdated = updateFiles(fileList, deferify, defaultFile);

    console.log(`LOG: deferify done. Updated ${filesUpdated}`);

    return 0;
}

module.exports = cli;