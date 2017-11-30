/* eslint-disable no-unused-vars */
/*eslint-disable no-undef */

const $ = window.$;
const Handlebars = window.Handlebars;
const root = '.root';

function parseResponse(res) {
  if (res.status === 'ok') return res.data;

  return null;
}

function render(res) {
  const data = parseResponse(res);

  if (!data) return false;

  const spinPanel = renderSpin(data);
  const betPanel = renderBet(data);

  $( spinPanel ).appendTo('.col1');
  $( betPanel ).appendTo('.col2');
}

function renderSpin(data) {
  const spins = parseObjectToArray(data.spin);
  return renderTmpl('spin-tmpl', spins);
}

function renderBet(data) {
  const rules = parseObjectToArray(data.rule);
  return renderTmpl('rule-tmpl', rules);
}

// Utils
function renderTmpl(id, data) {
  const source   = document.getElementById(id).innerHTML;
  const template = Handlebars.compile(source);

  return template(data);
}

function parseObjectToArray(obj) {
  const arr = [];
  for (var key in obj) {
    if (obj.hasOwnProperty(key)) {
      arr.push({label: key, value: obj[key]});
    }
  }

  return arr;
}
