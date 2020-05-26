const ANCHOR_PREFIX = `#`;
const FILTER_TYPES_PREFIX = `is`;
const STATISTICS_LINK = `stats`;

const FilterType = {
  ALL: `all`,
  WATCHLIST: `isWatchlist`,
  HISTORY: `isHistory`,
  FAVORITES: `isFavorites`,
};

const SortType = {
  DATE: `date`,
  DEFAULT: `default`,
  RATING: `rating`,
};

const Tag = {
  LINK: `a`,
  IMG: `img`,
  INPUT: `input`
};

const siteBody = document.querySelector(`body`);
const siteMain = siteBody.querySelector(`.main`);

export {ANCHOR_PREFIX, FilterType, FILTER_TYPES_PREFIX, siteBody, siteMain, SortType, STATISTICS_LINK, Tag};
