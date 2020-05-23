import {remove, render, replace} from './../utils/render';
import PopupController from './popup-controller';
import FilmComponent from './../components/film';
import CommentsModel from './../models/comments-model';
import FilmModel from './../models/film-model';

const Mode = {
  DEFAULT: `default`,
  POPUP: `popup`,
};

export default class FilmController {
  constructor(container, onDataChange, onViewChange, api) {
    this._container = container;
    this._api = api;
    this._onDataChange = onDataChange;
    this._filmComponent = null;
    this._film = null;
    this._onViewChange = onViewChange;
    this._mode = Mode.DEFAULT;
    this._filmDetailsController = null;
    this._commentsModel = new CommentsModel();
  }

  destroy() {
    remove(this._filmComponent);
  }

  _getComments(film) {
    this._api.getComments(film.id)

    .then((comments) => {
      this._commentsModel.setComments(comments);
    });
  }

  _openPopup(film) {
    this.setDefaultView();
    this._filmDetailsController = new PopupController(film, this._commentsModel, this._onDataChange, this._onViewChange);
    this._filmDetailsController.render();
    this._mode = Mode.POPUP;
  }

  render(film) {
    this._film = film;
    const oldFilmComponent = this._filmComponent;

    this._getComments(this._film);
    this._filmComponent = new FilmComponent(film, this._commentsModel.getComments().length);

    this._filmComponent.setButtonAddClickHandler((evt) => {
      evt.preventDefault();

      const updatedFilm = FilmModel.clone(film);
      updatedFilm.isWatchlist = !film.isWatchlist;

      this._onDataChange(this._film, updatedFilm);
      this._film = updatedFilm;
    });

    this._filmComponent.setButtonFavoriteClickHandler((evt) => {
      evt.preventDefault();

      const updatedFilm = FilmModel.clone(film);
      updatedFilm.isFavorites = !film.isFavorites;

      this._onDataChange(this._film, updatedFilm);
      this._film = updatedFilm;
    });

    this._filmComponent.setButtonWatchedClickHandler((evt) => {
      evt.preventDefault();

      const updatedFilm = FilmModel.clone(film);
      updatedFilm.isHistory = !film.isHistory;

      this._onDataChange(this._film, updatedFilm);
      this._film = updatedFilm;
    });

    this._filmComponent.setCommentsAmountClickHandler((evt) => {
      this._openPopup(film, evt);
    });

    this._filmComponent.setCoverClickHandler((evt) => {
      this._openPopup(film, evt);
    });

    this._filmComponent.setTitleClickHandler((evt) => {
      this._openPopup(film, evt);
    });

    if (oldFilmComponent) {
      replace(this._filmComponent, oldFilmComponent);
    } else {
      render(this._container, this._filmComponent);
    }
  }

  setDefaultView() {
    if (this._mode !== Mode.DEFAULT) {
      this._filmDetailsController.closePopup();
      this._mode = Mode.DEFAULT;
    }
  }
}
