import {ANCHOR_PREFIX, FilterType, FILTER_TYPES_PREFIX, Tag} from './../utils/const';
import {getSubstring} from './../utils/common';
import AbstractComponent from './abstract-component';

const FILTER_NAMES = [
  `All movies`,
  FilterType.WATCHLIST,
  FilterType.HISTORY,
  FilterType.FAVORITES,
];

const createFilterLink = (filters, index) => {
  const {filterType, count: filmsAmcountount, isActive} = filters;
  const activeClass = isActive ? `main-navigation__item--active` : ``;
  const amount = filterType !== FilterType.ALL ? `<span class="main-navigation__item-count">${filmsAmcountount}</span>` : ``;
  const filterName = filterType !== FilterType.ALL ? getSubstring(FILTER_NAMES[index], FILTER_TYPES_PREFIX) : FILTER_NAMES[0];

  return (
    `<a href="${ANCHOR_PREFIX}${filterType}" class="main-navigation__item ${activeClass}">
      ${filterName}
      ${amount}
    </a>`
  );
};

const createFilterTemplate = (filters) => {
  const filterLinks = filters
  .map(
      (filter, index) => {
        return createFilterLink(filter, index);
      }
  ).join(`\n`);

  return (
    `<div class="main-navigation__items">
      ${filterLinks}
    </div>`
  );
};

export default class Filter extends AbstractComponent {
  constructor(filters) {
    super();
    this._filters = filters;
  }

  getTemplate() {
    return createFilterTemplate(this._filters);
  }

  setFilterChangeHandler(handler) {
    this.getElement().addEventListener(`click`, (evt) => {
      evt.preventDefault();

      if (evt.target.tagName.toLowerCase() === Tag.LINK) {
        const clickedItem = getSubstring(evt.target.getAttribute(`href`), ANCHOR_PREFIX);
        const filterActiveClass = `main-navigation__item--active`;

        if (evt.target.classList.contains(filterActiveClass)) {
          return;
        }

        handler(clickedItem);
      }
    });
  }
}
