window.jQuery = require('jquery');
window.$ = require('jquery');
require('./main.scss');

import {split} from 'ramda';

//TEST
const spaceSplit = split(' ');
console.info(spaceSplit('Hello world'));
