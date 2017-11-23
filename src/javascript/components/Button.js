class Button {
  constructor(selector) {
    this.element = document.querySelector(selector);
  }

  hasClass(className) {
    return this.classList.contains(className);
  }

  on(eventName, callback) {
    this.element.addEventListener(eventName, callback);
  }
}

export default Button;
