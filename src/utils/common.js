import moment from 'moment';

const formatDate = (date) => {
  return moment(date).format(`DD MMMM`);
};

const formatTime = (date) => {
  return moment(date).format(`hh:mm`);
};

const getRandomInteger = function (min, max) {
  return Math.floor(min + Math.random() * (max + 1 - min));
};

const getRandomArrayItem = (arr) => {
  const randomIndex = getRandomInteger(0, arr.length - 1);

  return arr[randomIndex];
};

const shuffleArray = function (arr, length) {
  const copy = [...arr];
  // тасование массива по алгоритму Фишера-Йетса
  for (let i = copy.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    let x = copy[i];
    copy[i] = copy[j];
    copy[j] = x;
  }

  // если нужен массив случайной длины, передается и используется параметр length, иначе массив сохраняет исходную длину
  copy.length = length ? length : copy.length;

  return copy;
};

const checkEscKey = (evt) => {
  return evt.key === `Escape` || evt.key === `Esc`;
};

export {checkEscKey, getRandomArrayItem, getRandomInteger, formatDate, formatTime, shuffleArray};
