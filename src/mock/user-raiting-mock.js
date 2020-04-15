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

export {getUserRank};
