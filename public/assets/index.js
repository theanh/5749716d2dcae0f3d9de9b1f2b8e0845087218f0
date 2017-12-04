/* eslint-disable no-unused-vars */
/*eslint-disable no-undef */

const $ = window.$;
const Handlebars = window.Handlebars;
Handlebars.registerHelper('renderRule', (context, options) => {
  switch (`${context}`) {
  case '100':
    return 'Trúng thưởng DRAGON WILD';
  case '200':
    return 'Trúng thưởng 5 free spin';
  case '300':
    return 'Trúng thưởng 10 free spin';
  case '400':
    return 'Trúng thưởng 25 free spin';
  case '500':
    return 'Trúng thưởng BONUS SCATTER';
  case '-1':
    return 'Không trúng thưởng';
  default:
    return `Trúng thưởng Rule #${parseInt(context, 10) + 1}`;
  }
});

const root = '.root';

// Template rendering.
function render(res) {
  const data = parseResponse(res);

  if (!data) return false;

  const spinPanel = renderSpin(data);
  const betPanel = renderBet(data);
  const chancePanel = renderChances(data);
  const items = renderChancesOfItemAppearance(data);

  $( spinPanel ).appendTo('.colSpin');
  $( betPanel ).appendTo('.colRule');
  // $( chancePanel ).appendTo('.colChance');
  // $( items ).appendTo('.colItems');

  // Add slider
  $('.slider').slider({
    formatter: function(value) {
      return `Current value: ${parseFloat(value) * 100}%`;
    }
  });

  handleFormSubmit(document.forms.spinRule, 'spin', data);
  handleFormSubmit(document.forms.betRule, 'rule', data);
  // handleFormSubmit(document.forms.chanceOfDisplayingItem, 'chanceOfDisplayingItem', data);
  // handleFormSubmit(document.forms.chanceOfWinning, 'chanceOfWinning', data);
}

function renderSpin(data) {
  const spins = parseObjectToArray(data.spin);

  return renderTmpl('spin-tmpl', spins);
}

function renderChances(data) {
  const chance = { label: 'chance', value: data.chanceOfWinning};

  return renderTmpl('chances-tmpl', chance);
}

function renderChancesOfItemAppearance(data) {
  const items = parseObjectToArray(data.chanceOfDisplayingItem);

  return renderTmpl('chances-of-item-tmpl', items);
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
