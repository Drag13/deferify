const assert = require('assert');
const defer = require('../deferify');

const testSuit = [
    {
        input: `<script test src="">`,
        expected: `<script test src="" defer>`
    }
    , {
        input: `<script src="">`,
        expected: `<script src="" defer>`
    }
    , {
        input: `<script src="zzz"></script><script src="zxc">`,
        expected: `<script src="zzz" defer></script><script src="zxc" defer>`
    }
    ,{
        input: `<script src="zzz"></script><script src="sdfsd">`,
        expected: `<script src="zzz" defer></script><script src="sdfsd" defer>`
    }
    ,{
        input: `<script>test</`,
        expected: `<script>test</`
    },
    {
        input: `<script defer src="zxc"></script>`,
        expected: `<script defer src="zxc"></script>`
    }
    ,{
        input: `<script async src="zxc"></script>`,
        expected: `<script async src="zxc"></script>`
    },
    {
        input: `gghjg <script defer>hhh</script>`,
        expected: `gghjg <script defer>hhh</script>`
    }
];

describe('basic scenario', function () {
    testSuit.forEach(test => {
        it(`for input: "${test.input}", expected: "${test.expected}"`, () => {
            const result = defer(test.input);
            assert.strictEqual(result, test.expected, `fails with result: ${result}`);
        });
    });
});