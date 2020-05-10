import {siteBody} from './../utils/const.js';
import {remove, render} from './../utils/render.js';
import {checkEscKey} from './../utils/common.js';
import FilmDetailsComponent from './../components/film-details.js';
import CommentariesController from './commentaries-controller.js';

export default class PopupController {
  constructor(film, onDataChange, onViewChange) {
    this._film = film;
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
    this._commentariesController = new CommentariesController(container, film);
    this._commentariesController.render();
  }

  render() {
    this._onViewChange();

    siteBody.classList.add(`hide-overflow`);

    document.addEventListener(`keydown`, (evt) => {
      this._closeFilmPopupOnEscKeyDown(evt, this._filmDetailsComponent);
    });

    this._filmDetailsComponent.setButtonAddClickHandler(() => {
      this._onDataChange(this._film, Object.assign({}, this._film, {
        isWatchlist: !this._film.isWatchlist
      }));
    });

    this._filmDetailsComponent.setButtonFavoriteClickHandler(() => {
      this._onDataChange(this._film, Object.assign({}, this._film, {
        isFavorites: !this._film.isFavorites
      }));
    });

    this._filmDetailsComponent.setButtonWatchedClickHandler(() => {
      this._onDataChange(this._film, Object.assign({}, this._film, {
        isHistory: !this._film.isHistory
      }));
    });

    this._filmDetailsComponent.setCloseButtonClickHandler(() => {
      this.closePopup(this._filmDetailsComponent);
    });

    this._loadComments(this._filmDetailsComponent, this._film);

    render(siteBody, this._filmDetailsComponent);
  }
}
