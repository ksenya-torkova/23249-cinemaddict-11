import {encode} from "he";
import {siteBody} from './../utils/const.js';
import {remove, render} from './../utils/render.js';
import {checkEscKey} from './../utils/common.js';
import FilmDetailsComponent from './../components/film-details.js';
import CommentariesController from './commentaries-controller.js';
import FilmModel from './../models/film-model';

export default class PopupController {
  constructor(film, commentsModel, onDataChange, onViewChange) {
    this._film = film;
    this._commentsModel = commentsModel;
    this._filmDetailsComponent = new FilmDetailsComponent(this._film);
    this._onDataChange = onDataChange;
    this._onViewChange = onViewChange;
    this._commentariesController = null;
    this.closePopup = this.closePopup.bind(this);
  }

  closePopup() {
    remove(this._filmDetailsComponent);
    siteBody.classList.remove(`hide-overflow`);
    document.removeEventListener(`keydown`, this._closeFilmPopupOnEscKeyDown);
  }

  _closeFilmPopupOnEscKeyDown(evt, popup) {
    const isEscKey = checkEscKey(evt);

    if (isEscKey) {
      this.closePopup(popup);
    }
  }

  _loadComments(container, film) {
    this._commentariesController = new CommentariesController(container, film, this._commentsModel, this._onDataChange);
    this._commentariesController.render();
  }

  render() {
    this._onViewChange();

    siteBody.classList.add(`hide-overflow`);

    document.addEventListener(`keydown`, (evt) => {
      this._closeFilmPopupOnEscKeyDown(evt, this._filmDetailsComponent);
    });

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
      this.closePopup(this._filmDetailsComponent);
    });

    this._filmDetailsComponent.setSubmitHandler(() => {
      const emoji = this._filmDetailsComponent.getElement().querySelector(`.film-details__add-emoji-label img`);
      const textarea = this._filmDetailsComponent.getElement().querySelector(`.film-details__comment-input`);

      if (emoji.alt && textarea.value) {
        this._commentsModel.createComment(emoji.alt, encode(textarea.value));
        const form = this._filmDetailsComponent.getElement().querySelector(`.film-details__inner`);
        form.reset();

        this._onDataChange(this._film, Object.assign({}, this._film, {
          commentsLength: this._commentsModel.getComments().length,
        }));

        this._commentariesController.addComment();
      }
    });

    this._loadComments(this._filmDetailsComponent, this._film);

    render(siteBody, this._filmDetailsComponent);
  }
}
