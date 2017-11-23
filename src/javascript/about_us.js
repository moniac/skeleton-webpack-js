'use strict';

const about = document.getElementById('about');

function getModule() {
  System.import('./components/mathStuff.js').then(pageModule => {
    const chunk = pageModule;

    about.insertAdjacentText('beforeend', chunk.pow(5, 2));
  });
}

about.addEventListener('click', getModule);
