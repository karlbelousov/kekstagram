function getRandomPositiveInteger(a, b) {
  const lower = Math.ceil(Math.min(Math.abs(a), Math.abs(b)));
  const upper = Math.floor(Math.max(Math.abs(a), Math.abs(b)));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
}

function isStringLehgth(string, length) {
  return string.length <= length;
}

function getRandomArrayElement(element) {
  return element[getRandomPositiveInteger(0, element.length - 1)];
}

function isEscapeKey(evt) {
  return evt.key == "Escape";
}

const showAlert = (message) => {
  const alertContainer = document.createElement("div");
  alertContainer.style.zIndex = 100;
  alertContainer.style.position = "absolute";
  alertContainer.style.left = 0;
  alertContainer.style.top = 0;
  alertContainer.style.right = 0;
  alertContainer.style.padding = "10px 3px";
  alertContainer.style.fontSize = "30px";
  alertContainer.style.textAlign = "center";
  alertContainer.style.backgroundColor = "red";
  alertContainer.style.color = "white";
  alertContainer.style.textTransform = "uppercase";

  alertContainer.textContent = message;

  document.body.append(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, 5000);
};

function debounce(callback, timeoutDelay = 500) {
  let timeoutId;

  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
}

export {
  getRandomArrayElement,
  getRandomPositiveInteger,
  isEscapeKey,
  isStringLehgth,
  showAlert,
  debounce,
};
