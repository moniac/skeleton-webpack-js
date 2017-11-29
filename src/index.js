'use strict';

import Button from './javascript/components/Button';
import InputFile from './javascript/components/InputFile';

/* HMR */
if (module.hot) {
  let template = require('./index.pug'); /* eslint global-require: "off" */
  let html = template({});

  let rootEl = document.getElementById('root');
  let div = document.createElement('div');

  div.innerHTML = html;
  div = div.querySelector('#root');
  rootEl.innerHTML = div.innerHTML;
}
/* HMR */

class App {
  constructor(query) {
    this.form = document.querySelector(query);

    this.addAnimation = this.addAnimation.bind(this);
    this.animatedType = '';
    this.form.addEventListener('animationend', this.removeAnimation.bind(this));
    this.getData = this.getData.bind(this);
  }

  addAnimation(animatedType) {
    this.animatedType = animatedType;
    this.form.classList.add(animatedType, 'animated');
  }

  removeAnimation() {
    this.form.classList.remove(this.animatedType, 'animated');
  }

  getData() {
    event.preventDefault();

    const name = document.querySelector('.root__form .name');
    const phone = document.querySelector('.root__form .phone');
    const email = document.querySelector('.root__form .email');
    const textResume = document.querySelector('.root__form .textresume');
    const lastJob = document.querySelector('.root__form .last_job');

    const client = {
      name: name.value,
      phone: phone.value,
      email: email.value,
      textResume: textResume.value,
      lastJob: lastJob.value
    };

    console.log(client);
  }

  ready(fn) {
    return document.readyState !== 'loading'
      ? fn()
      : document.addEventListener('DOMContentLoaded', fn);
  }
}

const Main = new App('#root .root__form');

Main.ready(() => {
  const button = new Button('.root__form .button');
  const inputFile = new InputFile('#resume', '.root__form .textresume');

  Main.form.addEventListener('submit', Main.getData);

  button.on('click', () => Main.addAnimation('swing'));
  inputFile.on();

  // Not is necessary to import jquery because it is inside ProvidePlugin
  $('#root .root__form').css('padding', '20px 40px');
});

/* HMR */
if (module.hot) {
  module.hot.accept();
}
/* HMR */
