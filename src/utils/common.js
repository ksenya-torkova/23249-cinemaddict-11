import moment from 'moment';

const checkEscKey = (evt) => {
  return evt.key === `Escape` || evt.key === `Esc`;
};

const createComment = (comment) => {
  const {emojiType, commentText, userName, time, id} = comment;

  return (
    `<li class="film-details__comment" data-id="${id}">
      <span class="film-details__comment-emoji">
        <img src="./images/emoji/${emojiType}.png" width="55" height="55" alt="emoji-${emojiType}">
      </span>
      <div>
        <p class="film-details__comment-text">${commentText}</p>
        <p class="film-details__comment-info">
          <span class="film-details__comment-author">${userName}</span>
          <span class="film-details__comment-day">${time}</span>
          <button class="film-details__comment-delete" type="button">Delete</button>
        </p>
      </div>
    </li>`
  );
};

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

const getSubstring = (string, subtring) => {
  return string.substring(subtring.length);
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

export {checkEscKey, createComment, getRandomArrayItem, getRandomInteger, getSubstring, formatDate, formatTime, shuffleArray};
