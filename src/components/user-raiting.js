import AbstractComponent from './abstract-component.js';

const RANK_START_FROM = 1;

const userRanks = [
  `novice`,
  `fan`,
  `movie buff`
];

const userRanksLimits = {
  [userRanks[0]]: 10,
  [userRanks[1]]: 20,
  [userRanks[2]]: Infinity
};

let currentUserRank = ``;

const getUserRank = (filmsAmount) => {
  if (filmsAmount > 0) {
    if (filmsAmount > RANK_START_FROM && filmsAmount <= userRanksLimits[userRanks[0]]) {
      currentUserRank = userRanks[0];
    } else if (filmsAmount > userRanksLimits[userRanks[0]] && filmsAmount <= userRanksLimits[userRanks[1]]) {
      currentUserRank = userRanks[1];
    } else {
      currentUserRank = userRanks[2];
    }
  }

  return currentUserRank;
};

const createUserRaitingTemplate = (raiting) => {
  return (
    `<section class="header__profile profile">
      <p class="profile__rating">${raiting}</p>
      <img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
    </section>`
  );
};

export default class UserRaiting extends AbstractComponent {
  constructor(rank) {
    super();
    this._rank = rank;
  }

  getTemplate() {
    return createUserRaitingTemplate(this._rank);
  }
}

export {getUserRank};
