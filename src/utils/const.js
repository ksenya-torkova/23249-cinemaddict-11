const siteBody = document.querySelector(`body`);
const siteMain = siteBody.querySelector(`.main`);

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
  LINK: `A`,
};

export {FilterType, siteBody, siteMain, SortType, Tag};
