import $ from 'jquery';
import jQuery from 'jquery';
import Mustache from 'mustache';
import hljs from 'highlight.js/lib';
import albums from './fourth-albums.js';

import 'highlight.js/styles/atom-one-light.css';
import './main.scss';

window.$ = $;
window.jQuery = jQuery;

hljs.initHighlightingOnLoad();
albums();
//