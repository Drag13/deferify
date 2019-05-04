const fs = require('fs');
const path = require('path');
const assert = require('assert');
const cli = require('../../src/cli');
const fileModule = require('../../src/file');
const transformModule = require('../../src/transformation');
const defaults = require('../../src/defaults');

describe('CLI tests', function () {
    it('for empty arguments and non existed file, result should be 0', function () {
        const encoding = { encoding: 'utf8' };
        const pathToResult = path.join(process.cwd(), './test/cli/dist/index.html');
        const pathToExpected = path.join(process.cwd(), './test/cli/dist/index.expected.html');

        cli(['./test/cli/']
            , fileModule
            , transformModule
            , defaults
        );

        const result = fs.readFileSync(pathToResult, encoding);
        const expected = fs.readFileSync(pathToExpected, encoding);

        assert.equal(result, expected);
    });
});