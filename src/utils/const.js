const siteBody = document.querySelector(`body`);
const siteMain = siteBody.querySelector(`.main`);

const FilterType = {
  ALL: `all`,
  WATCHLIST: `isWatchlist`,
  HISTORY: `isHistory`,
  FAVORITES: `isFavorites`,
};

const NAMES = [
  `Tim Macoveev`,
  `John Doe`,
  `Hunter Michael Peterson`,
  `Molly Rebecca Price`,
  `Allison Emily Alexander`,
];

const SortType = {
  DATE: `date`,
  DEFAULT: `default`,
  RATING: `rating`,
};

const Tag = {
  LINK: `A`,
};

const TIMES = [
  `2019/12/31 23:59`,
  `2 days ago`,
  `1 day ago`,
  `Today`
];

export {FilterType, NAMES, siteBody, siteMain, SortType, Tag, TIMES};
