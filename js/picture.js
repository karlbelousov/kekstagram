import { showBigPicture } from "./big-picture.js";
const picturesContainer = document.querySelector(".pictures");
const pictureTemplate = document
  .querySelector("#picture")
  .content.querySelector(".picture");

const pictireListFragment = document.createDocumentFragment();

function renderPictures(pictures) {
  picturesContainer
    .querySelectorAll(".picture")
    .forEach((element) => element.remove());
  pictures.forEach((picture) => {
    const pictureElement = createPicture(picture);
    pictireListFragment.appendChild(pictureElement);
  });

  picturesContainer.appendChild(pictireListFragment);
}

function createPicture(picture) {
  const pictureElement = pictureTemplate.cloneNode(true);
  const pictureImage = pictureElement.querySelector(".picture__img");
  const pictureLikes = pictureElement.querySelector(".picture__likes");
  const pictureComments = pictureElement.querySelector(".picture__comments");
  pictureImage.src = picture.url;
  pictureLikes.textContent = picture.likes;
  pictureComments.textContent = picture.comments.length;

  pictureElement.addEventListener("click", function () {
    showBigPicture(picture);
  });

  return pictureElement;
}

export { renderPictures };
