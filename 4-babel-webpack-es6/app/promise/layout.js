import {renderLayout} from '../utils';

export function layout(data) {
  renderLayout(data, '#what-is-reading-template', '#what-is-reading');
}

export function errorLayout(data) {
  renderLayout(data, '#error-template', '#what-is-reading');
}