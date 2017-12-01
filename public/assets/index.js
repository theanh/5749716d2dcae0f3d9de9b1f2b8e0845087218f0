/* eslint-disable no-unused-vars */
/*eslint-disable no-undef */

const $ = window.$;
const Handlebars = window.Handlebars;
const root = '.root';

// Template rendering.
function render(res) {
  const data = parseResponse(res);

  if (!data) return false;

  const spinPanel = renderSpin(data);
  const betPanel = renderBet(data);

  $( spinPanel ).appendTo('.col1');
  $( betPanel ).appendTo('.col2');

  handleFormSubmit(document.forms.spinRule, 'spin', data);
  handleFormSubmit(document.forms.betRule, 'rule', data);
}

function renderSpin(data) {
  const spins = parseObjectToArray(data.spin);

  return renderTmpl('spin-tmpl', spins);
}

function renderBet(data) {
  const rules = parseObjectToArray(data.rule);

  return renderTmpl('rule-tmpl', rules);
}

// Events handling.
function handleFormSubmit(form, type, record) {
  form.addEventListener('submit', e => {
    e.preventDefault();
    const obj ={};
    for(var i = 0 ; i < form.elements.length ; i++) {
      var item = form.elements.item(i);
      if (item.name) obj[item.name] = item.value;
    }

    return setting.update(record.id, {[type]: obj}, requestHeader)
      .then(res => {
        if ('ok' === res.status) alert('Updated successfully.');
      });
  });
}

// Utils
function parseResponse(res) {
  if (res.status === 'ok') return res.data;

  return null;
}

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
