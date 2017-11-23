export default class Comparison {
  constructor({ divider, handle, beforeImg }) {
    this.divider = document.querySelector(divider);
    this.handle = document.querySelector(handle);
    this.beforeImg = document.querySelector(beforeImg);

    this.handleClicked = false;
    this.containerOffsetLeft = this.divider.offsetLeft;
    this.containerWidth = this.divider.offsetWidth;

    this.handleMove = this.handleMove.bind(this);
  }

  handleMove(e) {
    const self = this;

    if (self.handleClicked) {
      self.relativeX = e.pageX || e.touches[0].pageX;
      self.slidePercent = `${(self.relativeX - self.containerOffsetLeft) /
        self.containerWidth *
        100}%`;

      return self.resizeBeforeImage(self.slidePercent);
    }

    return self.handleClicked;
  }

  resizeBeforeImage(slidePercent) {
    this.beforeImg.style.width = slidePercent;
    this.handle.style.left = slidePercent;
  }
}
