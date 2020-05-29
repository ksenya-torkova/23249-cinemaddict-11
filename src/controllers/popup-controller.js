import {siteBody} from './../utils/const';
import {remove, render} from './../utils/render';
import {checkEscKey} from './../utils/common';
import CommentariesController from './commentaries-controller';
import FilmDetailsComponent from './../components/film-details';
import FilmModel from '../models/film';

export default class PopupController {
  constructor(film, commentsModel, onDataChange, onViewChange, onCommentChange, api) {
    this._film = film;
    this._api = api;
    this._commentsModel = commentsModel;
    this._commentariesController = null;
    this._filmDetailsComponent = new FilmDetailsComponent(this._film);
    this._onDataChange = onDataChange;
    this._onViewChange = onViewChange;
    this._onCommentChange = onCommentChange;
    this.close = this.close.bind(this);
    this._closeOnEscKeyDown = this._closeOnEscKeyDown.bind(this);
  }

  close() {
    remove(this._filmDetailsComponent);
    siteBody.classList.remove(`hide-overflow`);
    document.removeEventListener(`keydown`, this._closeOnEscKeyDown);
  }

  render() {
    this._onViewChange();

    siteBody.classList.add(`hide-overflow`);

    document.addEventListener(`keydown`, this._closeOnEscKeyDown);

    this._filmDetailsComponent.setButtonAddClickHandler(() => {
      const updatedFilm = FilmModel.clone(this._film);
      updatedFilm.isWatchlist = !this._film.isWatchlist;

      this._onDataChange(this._film, updatedFilm);
      this._film = updatedFilm;
    });

    this._filmDetailsComponent.setButtonFavoriteClickHandler(() => {
      const updatedFilm = FilmModel.clone(this._film);
      updatedFilm.isFavorites = !this._film.isFavorites;

      this._onDataChange(this._film, updatedFilm);
      this._film = updatedFilm;
    });

    this._filmDetailsComponent.setButtonWatchedClickHandler(() => {
      const updatedFilm = FilmModel.clone(this._film);
      updatedFilm.isHistory = !this._film.isHistory;

      this._onDataChange(this._film, updatedFilm);
      this._film = updatedFilm;
    });

    this._filmDetailsComponent.setCloseButtonClickHandler(() => {
      this.close(this._filmDetailsComponent);
    });

    this._loadComments(this._filmDetailsComponent, this._film);

    render(siteBody, this._filmDetailsComponent);
  }

  _loadComments(container, film) {
    this._commentariesController = new CommentariesController(container, film, this._commentsModel, this._onCommentChange, this._api);
    this._commentariesController.render();
  }

  _closeOnEscKeyDown(evt) {
    const isEscKey = checkEscKey(evt);

    if (isEscKey) {
      this.close();
    }
  }
}
