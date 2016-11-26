import {parse, render} from 'mustache';

export function renderLayout(data, templateElemet, targetElement) {
  const template = document.querySelector(templateElemet).innerHTML;
  parse(template);
  const rendered = render(template, data);
  document.querySelector(targetElement).innerHTML = rendered;
}
