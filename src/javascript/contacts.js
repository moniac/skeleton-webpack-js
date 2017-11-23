'use strict';

import Comparison from './components/Comparison';
import isMobile from './plugins/isMobile';

/* HMR */
if (module.hot) {
  let template = require('../contacts.pug'); /* eslint global-require: "off" */
  let html = template({});

  let contactsEl = document.getElementById('contacts');
  let div = document.createElement('div');

  div.innerHTML = html;
  div = div.querySelector('#contacts');
  contactsEl.innerHTML = div.innerHTML;
}
/* HMR */

class Contacts extends Comparison {
  constructor(selectors) {
    super(selectors);

    this.inputDown = isMobile ? 'touchstart' : 'mousedown';
    this.inputMove = isMobile ? 'touchmove' : 'mousemove';
    this.inputUp = isMobile ? 'touchend' : 'mouseup';
  }

  ready(fn) {
    return document.readyState !== 'loading'
      ? fn()
      : document.addEventListener('DOMContentLoaded', fn);
  }
}

const App = new Contacts({
  divider: '#contacts .divider',
  handle: '#contacts .handle',
  beforeImg: '#contacts .beforeImg'
});

App.ready(() => {
  window.addEventListener(App.inputUp, () => {
    App.handleClicked = false;
  });
  App.handle.addEventListener(App.inputDown, () => {
    App.handleClicked = true;
  });
  App.divider.addEventListener(App.inputMove, App.handleMove);
});

/* HMR */
if (module.hot) {
  module.hot.accept();
}
/* HMR */
