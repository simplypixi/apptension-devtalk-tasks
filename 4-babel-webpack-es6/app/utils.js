import {parse, render} from 'mustache';

export function renderLayout(data, templateElement, targetElement) {
  const template = document.querySelector(templateElement).innerHTML;
  parse(template);
  const rendered = render(template, data);
  document.querySelector(targetElement).innerHTML = rendered;
}