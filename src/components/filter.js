import {FilterType, Tag} from './../utils/const';
import AbstractComponent from './abstract-component.js';

const FILTER_NAMES = [
  `All movies`,
  FilterType.WATCHLIST,
  FilterType.HISTORY,
  FilterType.FAVORITES,
];

const FILTER_PREFIX = `#`;
const FILTER_TYPES_PREFIX = `is`;

const getSubstring = (string, subtring) => {
  return string.substring(subtring.length);
};

const createFilterLink = (filters, index) => {
  const {filterType, count: filmsAmcountount, isActive} = filters;
  const activeClass = isActive ? `main-navigation__item--active` : ``;
  const amount = filterType !== FilterType.ALL ? `<span class="main-navigation__item-count">${filmsAmcountount}</span>` : ``;
  const filterName = filterType !== FilterType.ALL ? getSubstring(FILTER_NAMES[index], FILTER_TYPES_PREFIX) : FILTER_NAMES[0];

  return (
    `<a href="${FILTER_PREFIX}${filterType}" class="main-navigation__item ${activeClass}">
      ${filterName}
      ${amount}
    </a>`
  );
};

const createFilterTemplate = (filters) => {
  const filterLinks = filters
  .map(
      (it, index) => {
        return createFilterLink(it, index);
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

      if (evt.target.tagName === Tag.LINK.toUpperCase()) {
        const filterName = getSubstring(evt.target.getAttribute(`href`), FILTER_PREFIX);
        const filterActiveClass = `main-navigation__item--active`;
        const filterActive = this.getElement().querySelector(`.${filterActiveClass}`);

        if (evt.target.classList.contains(filterActiveClass)) {
          return;
        }

        filterActive.classList.remove(filterActiveClass);
        evt.target.classList.add(filterActiveClass);

        handler(filterName);
      }
    });
  }
}
