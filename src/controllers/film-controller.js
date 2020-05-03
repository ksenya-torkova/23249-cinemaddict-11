import {siteBody} from './../utils/const.js';
import {remove, render} from './../utils/render.js';
import {checkEscKey} from './../utils/common.js';
import CommentContainerComponent from './../components/comment-container.js';
import CommentsListComponent from './../components/comments-list.js';
import CommentNewComponent from './../components/comment-new.js';
import FilmComponent from './../components/film.js';
import FilmDetailsComponent from './../components/film-details.js';

const onEscKeyDown = (evt, popup) => {
  const isEscKey = checkEscKey(evt);

  if (isEscKey) {
    closeFilmPopup(popup);
    document.removeEventListener(`keydown`, onEscKeyDown);
  }
};

const renderFilmPopup = (film, popup) => {
  render(siteBody, popup);

  const popupComments = popup.getElement().querySelector(`.form-details__bottom-container`);

  render(popupComments, new CommentContainerComponent(film));

  const comments = popupComments.querySelector(`.film-details__comments-wrap`);

  render(comments, new CommentsListComponent());
  render(comments, new CommentNewComponent());
};

const openFilmPopup = (film, popup) => {
  renderFilmPopup(film, popup);
  siteBody.classList.add(`hide-overflow`);

  document.addEventListener(`keydown`, (evt) => {
    onEscKeyDown(evt, popup);
  });
};

const closeFilmPopup = (popup) => {
  remove(popup);
  siteBody.classList.remove(`hide-overflow`);
  document.removeEventListener(`keydown`, onEscKeyDown);
};

export default class FilmController {
  constructor(container, onDataChange) {
    this._container = container;
    this._onDataChange = onDataChange;
    this._filmComponent = null;
  }

  render(film) {
    this._filmComponent = new FilmComponent(film);

    this._filmComponent.setButtonAddClickHandler((evt) => {
      evt.preventDefault();
      this._onDataChange(film, Object.assign({}, film, {
        isWatchlist: !film.isWatchlist
      }));
    });

    this._filmComponent.setButtonFavoriteClickHandler((evt) => {
      evt.preventDefault();
      this._onDataChange(film, Object.assign({}, film, {
        isFavorites: !film.isFavorites
      }));
    });

    this._filmComponent.setButtonWatchedClickHandler((evt) => {
      evt.preventDefault();
      this._onDataChange(film, Object.assign({}, film, {
        isHistory: !film.isHistory
      }));
    });

    this._filmComponent.setCommentsAmountClickHandler((evt) => {
      openFilmPopup(film, filmDetailsComponent, evt);
    });

    this._filmComponent.setCoverClickHandler((evt) => {
      openFilmPopup(film, filmDetailsComponent, evt);
    });

    this._filmComponent.setTitleClickHandler((evt) => {
      openFilmPopup(film, filmDetailsComponent, evt);
    });


    render(this._container, this._filmComponent);


    const filmDetailsComponent = new FilmDetailsComponent(film);

    filmDetailsComponent.setCloseButtonClickHandler(() => {
      closeFilmPopup(filmDetailsComponent);
    });
  }
}
