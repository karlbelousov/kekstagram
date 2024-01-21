import { isEscapeKey } from "./util.js";
const bigPicture = document.querySelector(".big-picture");
const bigPictureImage = bigPicture.querySelector(".big-picture__img img");
const likesCount = bigPicture.querySelector(".likes-count");
const commentsCount = bigPicture.querySelector(".comments-count");
const socialCommentsCount = bigPicture.querySelector(".social__comment-count");
const commentsLoader = bigPicture.querySelector(".comments-loader");
const socialCaption = bigPicture.querySelector(".social__caption");
const socialComments = bigPicture.querySelector(".social__comments");
const body = document.querySelector("body");
const bigPictureCloseButton = bigPicture.querySelector(".big-picture__cancel");

const COMMENTS_PER_PORTION = 5;
let commentsShown = 0;
let comments = [];

function showBigPicture(data) {
  bigPicture.classList.remove("hidden");
  body.classList.add("modal-open");
  bigPictureCloseButton.addEventListener("click", onCloseButtonClick);
  document.addEventListener("keydown", onEscKeyDown);
  comments = data.comments;
  renderPictureDetails(data);
  if (comments.length > 0) {
    renderComments();
  }
}

function renderPictureDetails(data) {
  bigPictureImage.src = data.url;
  bigPictureImage.alt = data.description;
  likesCount.textContent = data.likes;
  commentsCount.textContent = data.comments.length;
  socialCaption.textContent = data.description;
}

function createComment(data) {
  const comment = document.createElement("li");
  comment.innerHTML =
    '<img class="social__picture" src="" alt="" width="35" height="35" /><p class="social__text"></p>';
  comment.classList.add("social__comment");
  const commentAvatar = comment.querySelector(".social__picture");
  const commentText = comment.querySelector(".social__text");
  commentAvatar.src = data.avatar;
  commentAvatar.alt = data.name;
  commentText.textContent = data.message;
  return comment;
}

function renderComments() {
  commentsShown += COMMENTS_PER_PORTION;
  if (commentsShown >= comments.length) {
    commentsLoader.classList.add("hidden");
    commentsShown = comments.length;
  } else {
    commentsLoader.classList.remove("hidden");
  }
  const fragment = document.createDocumentFragment();
  for (let i = 0; i < commentsShown; i++) {
    const commentElement = createComment(comments[i]);
    fragment.append(commentElement);
  }
  socialComments.innerHTML = "";
  socialComments.append(fragment);
  socialCommentsCount.innerHTML = `${commentsShown} из <span class="comments-count">${comments.length}</span> комментариев`;
}

function onEscKeyDown(evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    hideBigPicture();
  }
}

function onCloseButtonClick() {
  hideBigPicture();
}

function hideBigPicture() {
  bigPicture.classList.add("hidden");
  body.classList.remove("modal-open");
  document.removeEventListener("keydown", onEscKeyDown);
  bigPictureCloseButton.removeEventListener("click", onCloseButtonClick);
  commentsShown = 0;
}
commentsLoader.addEventListener("click", function () {
  renderComments();
});

export { showBigPicture };
