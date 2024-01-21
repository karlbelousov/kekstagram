import { getData, sendData } from "./api.js";
import { isEscapeKey, showAlert } from "./util.js";
import { renderPictures } from "./picture.js";
import "./big-picture.js";
import { setOnFormSubmit, closeModal } from "./form.js";
import "./scale.js";
import "./effects.js";
import { turnFilterOn, filterPictures } from "./filter.js";
import "./avatar.js";

const successMessage = document.querySelector(".success");
const successButton = successMessage.querySelector(".success__button");
const errorMessage = document.querySelector(".error");
const errorButton = errorMessage.querySelector(".error__button");

const onLoadSuccess = (data) => {
  turnFilterOn(data);
  renderPictures(filterPictures());
};

const onLoadError = (error) => {
  showAlert(error);
};

getData(onLoadSuccess, onLoadError);

function onEscKeyDown(evt) {
  if (isEscapeKey) {
    evt.preventDefault();
    closeSuccesssMessage();
    closeErrorMessage();
  }
}

function onSuccessMessageClick() {
  closeSuccesssMessage();
}

function onErrorMessageClick() {
  closeErrorMessage();
}

const openSuccessMessage = () => {
  successMessage.classList.remove("hidden");
  document.body.classList.add("modal-open");
  document.addEventListener("keydown", onEscKeyDown);
  successMessage.addEventListener("click", onSuccessMessageClick);
};

const closeSuccesssMessage = () => {
  successMessage.classList.add("hidden");
  document.body.classList.remove("modal-open");
  document.removeEventListener("keydown", onEscKeyDown);
};

const openErrorMessage = () => {
  errorMessage.classList.remove("hidden");
  document.body.classList.add("modal-open");
  document.addEventListener("keydown", onEscKeyDown);
  errorMessage.addEventListener("click", onErrorMessageClick);
};

const closeErrorMessage = () => {
  errorMessage.classList.add("hidden");
  document.body.classList.remove("modal-open");
  document.removeEventListener("keydown", onEscKeyDown);
};

const onSendDataSuccess = () => {
  closeModal();
  openSuccessMessage();
};

const onSendDataError = () => {
  closeModal();
  openErrorMessage();
};

setOnFormSubmit(async (data) => {
  await sendData(onSendDataSuccess, onSendDataError, data);
});
