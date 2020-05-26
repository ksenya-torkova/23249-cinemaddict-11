import {remove, render, replace} from './../utils/render';
import PopupController from './popup-controller';
import FilmComponent from './../components/film';
import FilmModel from './../models/film-model';

const Mode = {
  DEFAULT: `default`,
  POPUP: `popup`,
};

export default class FilmController {
  constructor(container, onDataChange, onViewChange, onCommentChange, api, commentsModel) {
    this._container = container;
    this._api = api;
    this._filmComponent = null;
    this._film = null;
    this._comments = null;
    this._filmDetailsController = null;
    this._mode = Mode.DEFAULT;
    this._onDataChange = onDataChange;
    this._onCommentChange = onCommentChange;
    this._commentsModel = commentsModel;
    this._onViewChange = onViewChange;
  }

  destroy() {
    remove(this._filmComponent);
  }

  render(film, comments) {
    this._film = film;
    this._comments = comments;

    const oldFilmComponent = this._filmComponent;

    this._filmComponent = new FilmComponent(film, this._commentsModel.getCommentsById(film.id).length);

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
      this._filmDetailsController.close();
      this._mode = Mode.DEFAULT;
    }
  }

  _openPopup(film) {
    this.setDefaultView();
    this._filmDetailsController = new PopupController(film, this._commentsModel, this._onDataChange, this._onViewChange, this._onCommentChange, this._api);
    this._filmDetailsController.render();
    this._mode = Mode.POPUP;
  }
}
