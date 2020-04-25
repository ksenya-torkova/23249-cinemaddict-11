import {siteMain} from './../utils/const.js';
import {remove, render, renderFilm} from './../utils/render.js';
import FilmsAllComponent from './../components/films-all.js';
import LoadMoreComponent from './../components/load-more.js';
import NoFilmsComponent from './../components/no-films.js';
import SortComponent from './../components/sort.js';

const DEFAULT_CARDS_AMOUNT = 5;
const DOWNLOADED_CARDS_AMOUNT = 5;
let showingFilmsAmount = DEFAULT_CARDS_AMOUNT;

const renderAllFilms = (container, films) => {
  films.slice(0, showingFilmsAmount)
  .forEach((film) => {
    renderFilm(container, film);
  });
};

export default class AllFilmsController {
  constructor(container) {
    this._container = container;
    this._sortComponent = new SortComponent();
    this._filmsAllComponent = new FilmsAllComponent();
    this._loadMoreComponent = new LoadMoreComponent();
    this._noFilmsComponent = new NoFilmsComponent();
  }

  render(cards) {
    if (cards.length === 0) {
      render(this._container.getElement(), this._noFilmsComponent);
    } else {
      render(siteMain, this._sortComponent);
      render(this._container.getElement(), this._filmsAllComponent);

      const filmsAllContainer = this._filmsAllComponent.getElement().querySelector(`.films-list__container`);

      renderAllFilms(filmsAllContainer, cards);
      render(this._filmsAllComponent.getElement(), this._loadMoreComponent);

      this._loadMoreComponent.setClickHandler(() => {
        const previousFilmsAmount = showingFilmsAmount;
        showingFilmsAmount += DOWNLOADED_CARDS_AMOUNT;

        cards.slice(previousFilmsAmount, showingFilmsAmount)
        .forEach((card) => {
          renderFilm(filmsAllContainer, card);
        });

        if (showingFilmsAmount >= cards.length) {
          remove(this._loadMoreComponent);
        }
      });
    }
  }
}
