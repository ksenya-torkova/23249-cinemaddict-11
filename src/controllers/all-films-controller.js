import {siteMain, SortType} from './../utils/const';
import {remove, render, RenderPosition} from './../utils/render';
import FilmsAllComponent from './../components/films-all';
import FilmsLoadingComponent from './../components/films-loading';
import LoadMoreComponent from './../components/load-more';
import NoFilmsComponent from './../components/no-films';
import SortComponent from './../components/sort';
import FilmController from './film-controller';
import FilmsCommentedComponent from './../components/films-commented';
import FilmsRatedComponent from './../components/films-rated';

const DEFAULT_CARDS_AMOUNT = 5;
const DOWNLOADED_CARDS_AMOUNT = 5;
const ADDITIONAL_CARDS_AMOUNT = 2;

const getTopRated = (cardsData) => {
  const result = cardsData.slice().sort((a, b) => b.raiting - a.raiting);
  return result.slice(0, ADDITIONAL_CARDS_AMOUNT);
};

const getMostCommented = (cardsData) => {
  const result = cardsData.slice().sort((a, b) => b.commentsLength - a.commentsLength);
  return result.slice(0, ADDITIONAL_CARDS_AMOUNT);
};

const getSortedFilms = (films, sortType, from = 0, to = DEFAULT_CARDS_AMOUNT) => {
  let sortedFilms = [];
  const showingFilms = films.slice();

  switch (sortType) {
    case SortType.DATE:
      sortedFilms = showingFilms.sort((a, b) => b.date - a.date);
      break;
    case SortType.RATING:
      sortedFilms = showingFilms.sort((a, b) => b.raiting - a.raiting);
      break;
    case SortType.DEFAULT:
      sortedFilms = showingFilms;
      break;
  }

  return sortedFilms.slice(from, to);
};

export default class AllFilmsController {
  constructor(container, filmsModel, commentsModel, api) {
    this._container = container;
    this._filmsModel = filmsModel;
    this._commentsModel = commentsModel;
    this._api = api;
    this._shownFilmControllers = [];
    this._mainFilmsControllers = [];
    this._shownFilmsAmount = DEFAULT_CARDS_AMOUNT;
    this._filmsAllComponent = new FilmsAllComponent();
    this._loadMoreComponent = new LoadMoreComponent();
    this._noFilmsComponent = new NoFilmsComponent();
    this._filmsLoadingComponent = new FilmsLoadingComponent();
    this._filmsRatedComponent = new FilmsRatedComponent();
    this._filmsCommentedComponent = new FilmsCommentedComponent();
    this._sortComponent = new SortComponent();
    this._filmsAllContainer = this._filmsAllComponent.getElement().querySelector(`.films-list__container`);
    this._comments = this._commentsModel.getComments();
    this._onSortTypeChange = this._onSortTypeChange.bind(this);
    this._sortComponent.setTypeChangeHandler(this._onSortTypeChange);
    this._onDataChange = this._onDataChange.bind(this);
    this._onViewChange = this._onViewChange.bind(this);
    this._onFilterChange = this._onFilterChange.bind(this);
    this._filmsModel.setFilterChangeHandlers(this._onFilterChange);
    this._onLoadMoreButtonClick = this._onLoadMoreButtonClick.bind(this);
    this._onCommentChange = this._onCommentChange.bind(this);
  }

  hide() {
    this._container.hide();
    this._sortComponent.hide();
  }

  removeLoadingComponent() {
    remove(this._filmsLoadingComponent);
  }

  render() {
    const films = this._filmsModel.getFiltredFilms();

    if (films.length === 0) {
      render(this._container.getElement(), this._noFilmsComponent);
      return;
    }

    render(siteMain, this._sortComponent, RenderPosition.AFTER_BEGIN);
    render(this._container.getElement(), this._filmsAllComponent);

    this._renderMain(films);
    this._renderLoadMoreButton();
    this._renderAdditional();
  }

  renderLoadingComponent() {
    render(this._container.getElement(), this._filmsLoadingComponent);
  }

  show() {
    this._container.show();
    this._sortComponent.show();
  }

  _remove() {
    this._mainFilmsControllers.forEach((filmController) => filmController.destroy());
    this._mainFilmsControllers = [];
  }

  _renderAdditional() {
    const films = this._filmsModel.getFiltredFilms();
    const topRatedFilms = getTopRated(films);
    const mostCommentedFilms = getMostCommented(films);

    if (topRatedFilms) {
      const filmsRatedContainer = this._filmsRatedComponent.getElement().querySelector(`.films-list__container`);
      render(this._container.getElement(), this._filmsRatedComponent);

      const additionalFilms = this._renderAll(filmsRatedContainer, topRatedFilms, this._onDataChange, this._onViewChange,
          this._onCommentChange, this._api, this._commentsModel);

      this._shownFilmControllers = this._shownFilmControllers.concat(additionalFilms);
    }

    if (mostCommentedFilms) {
      const filmsCommentedContainer = this._filmsCommentedComponent.getElement().querySelector(`.films-list__container`);
      render(this._container.getElement(), this._filmsCommentedComponent);

      const additionalFilms = this._renderAll(filmsCommentedContainer, mostCommentedFilms, this._onDataChange, this._onViewChange,
          this._onCommentChange, this._api, this._commentsModel);

      this._shownFilmControllers = this._shownFilmControllers.concat(additionalFilms);
    }
  }

  _renderAll(container, films, onDataChange, onViewChange, onCommentChange, api, commentsModel) {
    return films.map((film) => {
      const filmController = new FilmController(container, onDataChange, onViewChange, onCommentChange, api, commentsModel);

      filmController.render(film, this._comments);

      return filmController;
    });
  }

  _renderLoadMoreButton() {
    remove(this._loadMoreComponent);

    if (this._shownFilmsAmount >= this._filmsModel.getFiltredFilms().length) {
      return;
    }

    render(this._filmsAllComponent.getElement(), this._loadMoreComponent);
    this._loadMoreComponent.setClickHandler(this._onLoadMoreButtonClick);
  }

  _renderMain(films) {
    const mainFilms = this._renderAll(this._filmsAllContainer, films.slice(0, this._shownFilmsAmount), this._onDataChange, this._onViewChange,
        this._onCommentChange, this._api, this._commentsModel);

    this._mainFilmsControllers = this._mainFilmsControllers.concat(mainFilms);
  }

  _update(amount) {
    this._remove();
    this._renderMain(getSortedFilms(this._filmsModel.getFiltredFilms(), this._sortComponent.getType(), 0, this._shownFilmsAmount).slice(0, amount));
    this._renderLoadMoreButton();
  }

  _onCommentChange(oldData, newData, comments) {
    const isSuccess = this._commentsModel.updateComments(oldData.id, comments) && this._filmsModel.updateFilm(oldData.id, newData);

    if (isSuccess) {
      this._onDataChange(oldData, newData);
    }
  }

  _onDataChange(oldData, newData) {
    this._api.updateFilm(oldData.id, newData)
      .then((filmModel) => {
        const isSuccess = this._filmsModel.updateFilm(oldData.id, filmModel);

        if (isSuccess) {
          [...this._shownFilmControllers, ...this._mainFilmsControllers].forEach((controller) => {
            if (controller._film.id === oldData.id) {
              controller.render(filmModel, newData.comments);
              this._update(this._shownFilmsAmount);
            }
          });
        }
      });
  }

  _onFilterChange() {
    this._update(this._shownFilmsAmount);
  }

  _onLoadMoreButtonClick() {
    const previousFilmsAmount = this._shownFilmsAmount;
    const films = this._filmsModel.getFiltredFilms();
    this._shownFilmsAmount += DOWNLOADED_CARDS_AMOUNT;
    const sortedFilms = getSortedFilms(films, this._sortComponent.getType(), previousFilmsAmount, this._shownFilmsAmount);
    this._renderMain(sortedFilms.slice(0, this._shownFilmsAmount));

    if (this._shownFilmsAmount >= this._filmsModel.getFiltredFilms().length) {
      remove(this._loadMoreComponent);
    }
  }

  _onSortTypeChange(sortType) {
    const sortedFilms = getSortedFilms(this._filmsModel.getFiltredFilms(), sortType, 0, this._shownFilmsAmount);
    this._remove();
    this._renderMain(sortedFilms);
    this._renderLoadMoreButton();
  }

  _onViewChange() {
    [...this._shownFilmControllers, ...this._mainFilmsControllers].forEach((it) => {
      it.setDefaultView();
    });
  }
}
