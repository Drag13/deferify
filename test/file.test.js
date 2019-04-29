const assert = require('assert');

const path = require('path');
const { normalizePath } = require('../src/file');

describe('filemodule', function () {
    describe('normalize path', function () {
        it('normalazing empty path should return current folder', function () {
            const currentFolder = process.cwd();
            const normalized = normalizePath();
            assert.equal(currentFolder, normalized);
        });

        it('normalazing folder should return propper folder', function () {
            const testPath = path.join(process.cwd(), 'test');
            const normalized = normalizePath('./test');
            assert.equal(testPath, normalized);
        });
    });
});