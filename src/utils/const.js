const ANCHOR_PREFIX = `#`;

const FilterType = {
  ALL: `all`,
  WATCHLIST: `isWatchlist`,
  HISTORY: `isHistory`,
  FAVORITES: `isFavorites`,
};

const FILTER_TYPES_PREFIX = `is`;

const SortType = {
  DATE: `date`,
  DEFAULT: `default`,
  RATING: `rating`,
};

const Tag = {
  LINK: `a`,
  IMG: `img`,
};

const siteBody = document.querySelector(`body`);
const siteMain = siteBody.querySelector(`.main`);

const STATISTICS_LINK = `stats`;

export {ANCHOR_PREFIX, FilterType, FILTER_TYPES_PREFIX, siteBody, siteMain, SortType, STATISTICS_LINK, Tag};
