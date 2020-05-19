import {getRandomArrayItem, getRandomInteger} from './../utils/common.js';
import {NAMES, TIMES} from './../utils/const.js';

const emoji = [
  `smile`,
  `sleeping`,
  `puke`,
  `angry`,
];

const comments = [
  `Interesting setting and a good cast`,
  `Booooooooooring`,
  `Very very old. Meh`,
  `Almost two hours? Seriously?`,
];

const generateComment = () => {
  return {
    id: getRandomInteger(0, 100),
    emojiType: getRandomArrayItem(emoji),
    commentText: getRandomArrayItem(comments),
    userName: getRandomArrayItem(NAMES),
    time: getRandomArrayItem(TIMES),
  };
};

const generateCommentsForFilm = () => {
  const commentsAmount = getRandomInteger(0, 10);

  return new Array(commentsAmount).fill(``).map(generateComment);
};

export {generateCommentsForFilm};
