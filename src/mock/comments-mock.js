import {getRandomArrayItem, getRandomInteger} from './../utils/common.js';

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

const names = [
  `Tim Macoveev`,
  `John Doe`,
  `Hunter Michael Peterson`,
  `Molly Rebecca Price`,
  `Allison Emily Alexander`,
];

const times = [
  `2019/12/31 23:59`,
  `2 days ago`,
  `1 day ago`,
  `Today`
];

const generateComment = () => {
  return {
    emojiType: getRandomArrayItem(emoji),
    commentText: getRandomArrayItem(comments),
    userName: getRandomArrayItem(names),
    time: getRandomArrayItem(times),
  };
};

const generateCommentsForFilm = () => {
  const commentsAmount = getRandomInteger(0, 10);

  return new Array(commentsAmount).fill(``).map(generateComment);
};

const generateCommentsList = (amount) => {
  const commentsList = [];

  for (let i = 0; i < amount; i++) {
    commentsList.push(generateCommentsForFilm());
  }

  return commentsList;
};

export {generateCommentsList};
