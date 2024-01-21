import { getRandomArrayElement, getRandomPositiveInteger } from "./util.js";

const names = ["Диана", "Мария", "Софья", "Алексей", "Роман", "Иван"];
const messages = [
  "Всё отлично!",
  "В целом всё неплохо. Но не всё.",
  "Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.",
  "Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.",
  "Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.",
  "Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!",
];
const descriptions = [
  "Вся красота мира в одной картинке",
  "Счастье в каждом кадре",
  "Когда слова не нужны, достаточно фотографии",
  "Остановить время в одном кадре",
  "Фотография — это способ улыбнуться в будущем",
  "Счастье никогда не выходит из моды",
  "В объектив всегда видна правда — это как детектор лжи",
  "Остановить время в одном кадре",
];

const pictureCount = 25;

function getPictures() {
  const arr = [];
  for (let i = 1; i <= pictureCount; i++) {
    const picture = createPicture(i);
    arr.push(picture);
  }
  return arr;
}

function createPicture(n) {
  return {
    id: n,
    url: `photos/${n}.jpg`,
    description: getRandomArrayElement(descriptions),
    likes: getRandomPositiveInteger(15, 200),
    comments: createComments(getRandomPositiveInteger(1, 10)),
  };
}

function createComments(n) {
  const comments = [];
  for (let i = 1; i <= n; i++) {
    const comment = {
      id: n,
      avatar: `img/avatar-${getRandomPositiveInteger(1, 6)}.svg`,
      message: getRandomArrayElement(messages),
      name: getRandomArrayElement(names),
    };
    comments.push(comment);
  }
  return comments;
}

export { getPictures };
