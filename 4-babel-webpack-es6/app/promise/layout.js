import {parse, render} from 'mustache';

export function layout(data) {
  const template = document.querySelector('#what-is-reading-template').innerHTML;
  parse(template);   // optional, speeds up future uses
  const rendered = render(template, data);
  document.querySelector('#what-is-reading').innerHTML = rendered;
}

export function errorLayout(data) {
  const template = document.querySelector('#error-template').innerHTML;
  parse(template);   // optional, speeds up future uses
  const rendered = render(template, data);
  document.querySelector('#what-is-reading').innerHTML = rendered;
}