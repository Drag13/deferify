'use strict';
const defaults = require('./src/defaults');
const cli = require('./src/cli');
const fileModule = require('./src/file');
const transformModule = require('./src/transformation');

cli(process.argv.slice(2), fileModule, transformModule, defaults);