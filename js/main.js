'use strict';


const NUMBERS = [1, 2, 3, 4, 5, 6, 7, 8];

const COORDINATES = {
  minY: 130,
  maxY: 630,
  minX: 0,
  maxX: 1200
};

const PRICES = {
  min: 1000,
  max: 5000
};

const PIN_SIZES = {
  height: 70,
  width: 50
};

const TIMES = [
  `12:00`,
  `13:00`,
  `14:00`
];

const FEATURES = [
  `wifi`,
  `dishwasher`,
  `parking`,
  `washer`,
  `elevator`,
  `conditioner`
];

const PHOTOS = [
  `http://o0.github.io/assets/images/tokyo/hotel1.jpg`,
  `http://o0.github.io/assets/images/tokyo/hotel2.jpg`,
  `http://o0.github.io/assets/images/tokyo/hotel3.jpg`
];

const TYPE = [
  `Дворец`,
  `Квартира`,
  `Дом`,
  `Бунгало`
];

const TITLES = [
  `Апартаменты с видом на море`,
  `Уютное бунгало со всеми удобствами`,
  `Маленькая комнатка со всем необходимым`,
  `Личный дом с красивым садом`,
  `Большая квартира для большой семьи`
];


const DESCRIPTIONS = [
  `Lorem, ipsum dolor sit amet consectetur adipisicing elit.`,
  `Iste similique distinctio deserunt optio, debitis doloremque dolores!`,
  `Repellat necessitatibus dolor nobis cupiditate impedit omnis molestias voluptatibus velit assumenda ipsa? Placeat, autem.`
];

const map = document.querySelector(`.map`);
const pinTemplate = document.querySelector(`#pin`).content.querySelector(`.map__pin`);
const mapPins = map.querySelector(`.map__pins`);

const getRandomNumbers = function (j) {
  let arr = [];
  for (let i = 1; i < j; i++) {
    arr.push(i);
  }
  return arr;
};

const getRandomInteger = function (min, max) {
  return Math.floor(Math.random() * (max - min) + min);
};

const getRandomItem = function (arr) {
  return arr[Math.floor(Math.random() * arr.length)];
};

const getUniqueItem = function (arr) {
  let k = getRandomItem(arr);
  arr.splice(arr.indexOf(k), 1);
  return k;
};

const createRandomArray = (arr) => {
  let features = [];
  let cloneArray = [].concat(arr);
  let featuresRandomLength = Math.floor(Math.random() * arr.length + 1);
  while (features.length < featuresRandomLength) {
    features.push(getUniqueItem(cloneArray));
  }
  return features;
};

const getObject = function () {
  let coordinateX = getRandomInteger(COORDINATES.minX, COORDINATES.maxX);
  let coordinateY = getRandomInteger(COORDINATES.minY, COORDINATES.maxY);
  let object = {
    "author": {
      "avatar": `img/avatars/user0${getUniqueItem(NUMBERS)}.png`
    },

    "offer": {
      "title": getUniqueItem(TITLES),
      "address": `${coordinateX}, ${coordinateY}`,
      "price": getRandomInteger(PRICES.min, PRICES.max),
      "type": getRandomItem(TYPE),
      "rooms": getRandomItem(getRandomNumbers(4)),
      "guests": getRandomItem(getRandomNumbers(6)),
      "checkin": getRandomItem(TIMES),
      "checkout": getRandomItem(TIMES),
      "features": createRandomArray(FEATURES),
      "descriptions": getUniqueItem(DESCRIPTIONS),
      "photos": createRandomArray(PHOTOS)
    },
    "location": {
      "x": coordinateX,
      "y": coordinateY
    }
  };

  return object;
};

const createArrayOfObjects = (quantity) => {
  let objectArray = [];
  for (let i = 0; i < quantity; i++) {
    objectArray.push(getObject());
  }
  return objectArray;
};

const renderMapPin = (object) => {
  let mapPin = pinTemplate.cloneNode(true);

  mapPin.querySelector(`img`).src = object.author.avatar;
  mapPin.querySelector(`img`).alt = object.offer.title;
  mapPin.style.left = (object.location.x - (PIN_SIZES.width / 2)) + `px`;
  mapPin.style.top = (object.location.y - PIN_SIZES.height) + `px`;

  return mapPin;
};

const filingBlock = (arr) => {
  let fragment = document.createDocumentFragment();
  for (let i = 0; i < arr.length; i++) {
    fragment.appendChild(renderMapPin(arr[i]));
  }
  return fragment;
};

const objectsArray = createArrayOfObjects(8);
mapPins.appendChild(filingBlock(objectsArray));
map.classList.remove(`map--faded`);
