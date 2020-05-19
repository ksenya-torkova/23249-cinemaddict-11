const ANCHOR_PREFIX = `#`;

const FilterType = {
  ALL: `all`,
  WATCHLIST: `isWatchlist`,
  HISTORY: `isHistory`,
  FAVORITES: `isFavorites`,
};

const FILTER_TYPES_PREFIX = `is`;

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

const siteBody = document.querySelector(`body`);
const siteMain = siteBody.querySelector(`.main`);

const STATISTICS_LINK = `stats`;

const TIMES = [
  `2019/12/31 23:59`,
  `2 days ago`,
  `1 day ago`,
  `Today`
];

export {ANCHOR_PREFIX, FilterType, FILTER_TYPES_PREFIX, NAMES, siteBody, siteMain, SortType, Tag, STATISTICS_LINK, TIMES};
