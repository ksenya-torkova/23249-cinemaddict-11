import {siteMain, SortType} from './../utils/const.js';
import {remove, render, renderFilm, RenderPosition} from './../utils/render.js';
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

const getSortedFilms = (films, sortType, from = 0, to = DEFAULT_CARDS_AMOUNT) => {
  let sortedFilms = [];
  const showingTasks = films.slice();

  switch (sortType) {
    case SortType.DATE:
      sortedFilms = showingTasks.sort((a, b) => a.year - b.year);
      break;
    case SortType.RATING:
      sortedFilms = showingTasks.sort((a, b) => b.raiting - a.raiting);
      break;
    case SortType.DEFAULT:
      sortedFilms = showingTasks;
      break;
  }

  return sortedFilms.slice(from, to);
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
      return;
    }

    render(siteMain, this._sortComponent, RenderPosition.AFTER_BEGIN);
    render(this._container.getElement(), this._filmsAllComponent);

    const filmsAllContainer = this._filmsAllComponent.getElement().querySelector(`.films-list__container`);

    renderAllFilms(filmsAllContainer, cards);

    const renderLoadMoreButton = () => {
      render(this._filmsAllComponent.getElement(), this._loadMoreComponent);

      this._loadMoreComponent.setClickHandler(() => {
        const previousFilmsAmount = showingFilmsAmount;
        showingFilmsAmount += DOWNLOADED_CARDS_AMOUNT;

        const sortedFilms = getSortedFilms(cards, this._sortComponent.getSortType(), previousFilmsAmount, showingFilmsAmount);

        renderAllFilms(filmsAllContainer, sortedFilms);

        if (showingFilmsAmount >= cards.length) {
          remove(this._loadMoreComponent);
        }
      });
    };

    renderLoadMoreButton();

    this._sortComponent.setSortTypeChangeHandler((sortType) => {
      showingFilmsAmount = DEFAULT_CARDS_AMOUNT;

      const sortedFilms = getSortedFilms(cards, sortType);

      filmsAllContainer.innerHTML = ``;

      renderAllFilms(filmsAllContainer, sortedFilms);

      renderLoadMoreButton();
    });
  }
}
