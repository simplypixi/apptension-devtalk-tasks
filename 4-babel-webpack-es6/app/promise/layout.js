import {parse, render} from 'mustache';

export default function layout(data) {
  const template = document.querySelector('#what-is-reading-template').innerHTML;
  parse(template);   // optional, speeds up future uses
  const rendered = render(template, data);
  console.debug({template}, {rendered}, {data});
  document.querySelector('#what-is-reading').innerHTML = rendered;
}