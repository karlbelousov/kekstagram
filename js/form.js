import { isEscapeKey, isStringLehgth } from "./util.js";
import { resetScale } from "./scale.js";
import { resetEffects } from "./effects.js";
import { sendData } from "./api.js";
const form = document.querySelector(".img-upload__form");
const fileField = form.querySelector("#upload-file");
const imgUploadOverlay = form.querySelector(".img-upload__overlay");
const cancelButton = form.querySelector(".img-upload__cancel");
const hashtagsField = form.querySelector(".text__hashtags");
const commentField = form.querySelector(".text__description");
const submitButton = form.querySelector(".img-upload__submit");

const MAX_HASHTAG_COUNT = 5;
const MIN_HASHTAG_LENGTH = 2;
const MAX_HASHTAG_LENGTH = 20;
const UNVALID_SYMBOLS = /[^a-zA-Z0-9а-яА-ЯёЁ]/g;

const pristine = new Pristine(form, {
  classTo: "img-upload__element",
  errorTextParent: "img-upload__element",
  errorTextClass: "img-upload__error",
});

function openModal() {
  imgUploadOverlay.classList.remove("hidden");
  document.body.classList.add("modal-open");
  document.addEventListener("keydown", onEscKeyDown);
}

function closeModal() {
  resetScale();
  resetEffects();
  form.reset();
  pristine.reset();
  imgUploadOverlay.classList.add("hidden");
  document.body.classList.remove("modal-open");
  document.removeEventListener("keydown", onEscKeyDown);
}

function isTextFieldFocused() {
  return (
    document.activeElement === hashtagsField ||
    document.activeElement === commentField
  );
}

function onEscKeyDown(evt) {
  if (isEscapeKey(evt) && !isTextFieldFocused()) {
    evt.preventDefault();
    closeModal();
  }
}

function onCloseButtonClick() {
  closeModal();
}

function onFileInputChange() {
  openModal();
}

const startsWithHash = (string) => string[0] === "#";

const hasValidLength = (string) =>
  string.length >= MIN_HASHTAG_LENGTH && string.length <= MAX_HASHTAG_LENGTH;

const hasValidSymbols = (string) => !UNVALID_SYMBOLS.test(string.slice(1));

const isValidTag = (tag) =>
  startsWithHash(tag) && hasValidLength(tag) && hasValidSymbols(tag);

const hasValidCount = (tags) => tags.length <= MAX_HASHTAG_COUNT;

const hasUniqueTags = (tags) => {
  const lowerCaseTags = tags.map((tag) => tag.toLowerCase());
  return lowerCaseTags.length === new Set(lowerCaseTags).size;
};

const validateTags = (value) => {
  const tags = value
    .trim()
    .split(" ")
    .filter((tag) => tag.trim().length);
  return hasValidCount(tags) && hasUniqueTags(tags) && tags.every(isValidTag);
};

function validateComment(value) {
  return isStringLehgth(value, 140);
}

pristine.addValidator(
  hashtagsField,
  validateTags,
  "Неправильно заполнены хэштеги"
);

pristine.addValidator(
  commentField,
  validateComment,
  "Комментарий не может быть длиннее 140 символов"
);

function blockSubmitButton() {
  submitButton.disabled = true;
  submitButton.textContent = "Отправляю...";
}

function unblockSubmitButton() {
  submitButton.disabled = false;
  submitButton.textContent = "Опубликовать";
}

const setOnFormSubmit = (cb) => {
  form.addEventListener("submit", async (evt) => {
    evt.preventDefault();
    const isValid = pristine.validate();

    if (isValid) {
      blockSubmitButton();
      await cb(new FormData(form));
      unblockSubmitButton();
    }
  });
};

fileField.addEventListener("change", onFileInputChange);
cancelButton.addEventListener("click", onCloseButtonClick);

export { setOnFormSubmit, closeModal };
