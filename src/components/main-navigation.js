import AbstractComponent from './abstract-component.js';

const FILTERS_TYPES = [
  `isWatchlist`,
  `isHistory`,
  `isFavorites`
];

const getFilterAmount = (cards, filterType) => {
  const result = cards.filter((card) => card[filterType] === true);

  return result.length;
};

const createMainNavigationTemplate = (cards) => {
  return (
    `<nav class="main-navigation">
      <div class="main-navigation__items">
        <a href="#all" class="main-navigation__item main-navigation__item--active">All movies</a>
        <a href="#watchlist" class="main-navigation__item">Watchlist <span class="main-navigation__item-count">${getFilterAmount(cards, FILTERS_TYPES[0])}</span></a>
        <a href="#history" class="main-navigation__item">History <span class="main-navigation__item-count">${getFilterAmount(cards, FILTERS_TYPES[1])}</span></a>
        <a href="#favorites" class="main-navigation__item">Favorites <span class="main-navigation__item-count">${getFilterAmount(cards, FILTERS_TYPES[2])}</span></a>
      </div>
      <a href="#stats" class="main-navigation__item main-navigation__item--additional">Stats</a>
    </nav>`
  );
};

export default class MainNavigation extends AbstractComponent {
  constructor(cards) {
    super();
    this._cards = cards;
  }

  getTemplate() {
    return createMainNavigationTemplate(this._cards);
  }
}
