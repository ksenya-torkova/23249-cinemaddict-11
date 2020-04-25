const siteBody = document.querySelector(`body`);
const siteMain = siteBody.querySelector(`.main`);

const SortType = {
  DATE: `date`,
  DEFAULT: `default`,
  RATING: `rating`,
};

const Tag = {
  LINK: `A`
};

export {siteBody, siteMain, SortType, Tag};
