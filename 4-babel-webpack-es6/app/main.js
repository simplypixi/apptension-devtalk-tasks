import skrollr from 'skrollr';

import * as stringRepeating from "./string-repeating";
import promiseExample from './promise';
import arrayFinding from './array-finding';
import {run as runMemeGenerator} from './memeGenerator';

import './styles/main.scss';

const s = skrollr.init();

promiseExample();
arrayFinding();
runMemeGenerator();
