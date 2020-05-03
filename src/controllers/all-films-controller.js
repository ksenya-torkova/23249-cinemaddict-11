import {siteMain, SortType} from './../utils/const.js';
import {remove, render, RenderPosition} from './../utils/render.js';
import FilmsAllComponent from './../components/films-all.js';
import LoadMoreComponent from './../components/load-more.js';
import NoFilmsComponent from './../components/no-films.js';
import SortComponent from './../components/sort.js';
import FilmController from './film-controller.js';

const DEFAULT_CARDS_AMOUNT = 5;
const DOWNLOADED_CARDS_AMOUNT = 5;

const renderAllFilms = (container, films, onDataChange) => {
  return films.map((film) => {
    const filmController = new FilmController(container, onDataChange);

    filmController.render(film);

    return filmController;
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
    this._films = [];
    this._shownFilmControllers = [];
    this._shownFilmsAmount = DEFAULT_CARDS_AMOUNT;
    this._filmsAllComponent = new FilmsAllComponent();
    this._filmsAllContainer = this._filmsAllComponent.getElement().querySelector(`.films-list__container`);
    this._loadMoreComponent = new LoadMoreComponent();
    this._noFilmsComponent = new NoFilmsComponent();
    this._sortComponent = new SortComponent();
    this._onSortTypeChange = this._onSortTypeChange.bind(this);
    this._sortComponent.setSortTypeChangeHandler(this._onSortTypeChange);
    this._onDataChange = this._onDataChange.bind(this);
  }

  render(films) {
    this._films = films;

    if (this._films.length === 0) {
      render(this._container.getElement(), this._noFilmsComponent);
      return;
    }

    render(siteMain, this._sortComponent, RenderPosition.AFTER_BEGIN);
    render(this._container.getElement(), this._filmsAllComponent);

    const newFilms = renderAllFilms(this._filmsAllContainer, this._films.slice(0, this._shownFilmsAmount), this._onDataChange);

    this._shownFilmControllers = this._shownFilmControllers.concat(newFilms);
    this._renderLoadMoreButton();
  }

  _onDataChange(oldData, newData) {
    const index = this._films.findIndex((it) => it === oldData);

    if (index === -1) {
      return;
    }

    this._films = [].concat(this._films.slice(0, index), newData, this._films.slice(index + 1));
    this._shownFilmControllers[index].render(this._films[index]);
  }

  _renderLoadMoreButton() {
    if (this._shownFilmsAmount === 0) {
      return;
    }

    render(this._filmsAllComponent.getElement(), this._loadMoreComponent);

    this._loadMoreComponent.setClickHandler(() => {
      const previousFilmsAmount = this._shownFilmsAmount;

      this._shownFilmsAmount += DOWNLOADED_CARDS_AMOUNT;

      const sortedFilms = getSortedFilms(this._films, this._sortComponent.getSortType(), previousFilmsAmount, this._shownFilmsAmount);
      const newFilms = renderAllFilms(this._filmsAllContainer, sortedFilms.slice(0, this._shownFilmsAmount), this._onDataChange);

      this._shownFilmControllers = this._shownFilmControllers.concat(newFilms);

      if (this._shownFilmsAmount >= this._films.length) {
        remove(this._loadMoreComponent);
      }
    });
  }

  _onSortTypeChange(sortType) {
    const sortedFilms = getSortedFilms(this._films, sortType, 0, this._shownFilmsAmount);

    this._filmsAllContainer.innerHTML = ``;

    const newFilms = renderAllFilms(this._filmsAllContainer, sortedFilms, this._onDataChange);

    this._shownFilmControllers = this._shownFilmControllers.concat(newFilms);
  }
}
