class InputFile {
  constructor(inputFile, textFile) {
    this.inputFile = document.querySelector(inputFile);
    this.textFile = document.querySelector(textFile);

    this.getPathFileFromDirectory = this.getPathFileFromDirectory.bind(this);
    this.getFileNameFromPath = this.getFileNameFromPath.bind(this);
  }

  on(eventName = 'change') {
    const self = this;

    self.inputFile.addEventListener(eventName, self.getPathFileFromDirectory);
  }

  getPathFileFromDirectory(e) {
    const self = this;
    const target = e.target || e.srcElement;
    const text = self.getFileNameFromPath(target.value);

    self.textFile.value = text || '';
  }

  getFileNameFromPath(value) {
    return value && value.replace(/^.*[\\]/, '');
  }
}

export default InputFile;
