import $ from 'jquery';
import jQuery from 'jquery';
import Mustache from 'mustache';
import hljs from 'highlight.js/lib';
import {readAlbums, releasesAverage} from './fourth.js';

import 'highlight.js/styles/atom-one-light.css';
import './main.scss';

window.$ = $;
window.jQuery = jQuery;

hljs.initHighlightingOnLoad();
readAlbums();
releasesAverage();