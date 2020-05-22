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

export {checkEscKey, createComment, getRandomArrayItem, getRandomInteger, getSubstring, formatDate, formatTime};
