const assert = require('assert');
const defer = require('../src/transformation').deferify;

const testSuit = [
    {
        input: `<script test="" src="">`,
        expected: `<script test="" src="" defer>`
    }
    , {
        input: `<script src="">`,
        expected: `<script src="" defer>`
    }
    , {
        input: `<script src="zzz"></script><script src="zxc">`,
        expected: `<script src="zzz" defer></script><script src="zxc" defer>`
    }
    , {
        input: `<script src="zzz"></script><script src="sdfsd">`,
        expected: `<script src="zzz" defer></script><script src="sdfsd" defer>`
    }
    , {
        input: `<script>test</`,
        expected: `<script>test</`
    },
    {
        input: `<script defer src="zxc"></script>`,
        expected: `<script defer src="zxc"></script>`
    }
    , {
        input: `<script async src="zxc"></script>`,
        expected: `<script async src="zxc"></script>`
    },
    {
        input: `gghjg <script defer>hhh</script>`,
        expected: `gghjg <script defer>hhh</script>`
    },
    {
        input: ` <script type src=""></script>`,
        expected: ` <script type src="" defer></script>`
    },
    {
        input: `  <app-root></app-root>
        <script type="text/javascript" src="runtime.26209474bfa8dc87a77c.js"></script><script type="text/javascript" src="es2015-polyfills.c5dd28b362270c767b34.js" nomodule></script><script type="text/javascript" src="polyfills.8bbb231b43165d65d357.js"></script><script type="text/javascript" src="main.c0a378aac987222c736c.js"></script></body>`,
        expected: `  <app-root></app-root>
        <script type="text/javascript" src="runtime.26209474bfa8dc87a77c.js" defer></script><script type="text/javascript" src="es2015-polyfills.c5dd28b362270c767b34.js" nomodule defer></script><script type="text/javascript" src="polyfills.8bbb231b43165d65d357.js" defer></script><script type="text/javascript" src="main.c0a378aac987222c736c.js" defer></script></body>`,
    },
    {
        input: undefined,
        expected: ''
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