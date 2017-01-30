import {renderLayout} from '../utils';

export function layout(data) {
  renderLayout(data, '#meme-generator-template', '#meme-generator');
}

export function errorLayout(data) {
  renderLayout(data, '#error-template', '#meme-generator');
}