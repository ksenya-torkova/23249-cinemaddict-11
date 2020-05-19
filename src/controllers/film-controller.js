import {remove, render, replace} from './../utils/render.js';
import {generateCommentsForFilm} from './../mock/comments-mock.js';
import PopupController from './popup-controller.js';
import FilmComponent from './../components/film.js';
import CommentsModel from './../models/comments-model.js';

const Mode = {
  DEFAULT: `default`,
  POPUP: `popup`,
};


export default class FilmController {
  constructor(container, onDataChange, onViewChange) {
    this._container = container;
    this._onDataChange = onDataChange;
    this._filmComponent = null;
    this._film = null;
    this._onViewChange = onViewChange;
    this._mode = Mode.DEFAULT;
    this._filmDetailsController = null;
    this._commentsModel = null;
  }

  destroy() {
    remove(this._filmComponent);
  }

  _getComments() {
    const comments = generateCommentsForFilm();
    this._commentsModel = new CommentsModel();
    this._commentsModel.setComments(comments);
  }

  _openPopup(film) {
    this._filmDetailsController = new PopupController(film, this._commentsModel, this._onDataChange, this._onViewChange);
    this._filmDetailsController.render();
    this._mode = Mode.POPUP;
  }

  render(film) {
    this._film = film;
    const oldFilmComponent = this._filmComponent;

    this._getComments();
    this._filmComponent = new FilmComponent(film, this._commentsModel.getComments().length);

    this._filmComponent.setButtonAddClickHandler((evt) => {
      evt.preventDefault();

      this._onDataChange(this._film, Object.assign({}, film, {
        isWatchlist: !film.isWatchlist
      }));
    });

    this._filmComponent.setButtonFavoriteClickHandler((evt) => {
      evt.preventDefault();

      this._onDataChange(this._film, Object.assign({}, film, {
        isFavorites: !film.isFavorites
      }));
    });

    this._filmComponent.setButtonWatchedClickHandler((evt) => {
      evt.preventDefault();

      this._onDataChange(this._film, Object.assign({}, film, {
        isHistory: !film.isHistory
      }));
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
