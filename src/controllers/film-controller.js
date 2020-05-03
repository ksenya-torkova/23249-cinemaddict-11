import {siteBody} from './../utils/const.js';
import {remove, render, replace} from './../utils/render.js';
import {checkEscKey} from './../utils/common.js';
import CommentContainerComponent from './../components/comment-container.js';
import CommentsListComponent from './../components/comments-list.js';
import CommentNewComponent from './../components/comment-new.js';
import FilmComponent from './../components/film.js';
import FilmDetailsComponent from './../components/film-details.js';

const Mode = {
  DEFAULT: `default`,
  POPUP: `popup`,
};

export default class FilmController {
  constructor(container, onDataChange, onViewChange) {
    this._container = container;
    this._onDataChange = onDataChange;
    this._filmComponent = null;
    this._onViewChange = onViewChange;
    this._mode = Mode.DEFAULT;
    this._filmDetailsComponent = null;
  }

  _closeFilmPopup(popup) {
    remove(popup);
    siteBody.classList.remove(`hide-overflow`);
    this._mode = Mode.DEFAULT;
  }

  _closeFilmPopupOnEscKeyDown(evt, popup) {
    const isEscKey = checkEscKey(evt);

    if (isEscKey) {
      this._closeFilmPopup(popup);
      document.removeEventListener(`keydown`, this._closeFilmPopupOnEscKeyDown);
    }
  }

  _openFilmPopup(film, popup) {
    this._onViewChange();
    this._renderFilmPopup(film, popup);

    siteBody.classList.add(`hide-overflow`);

    document.addEventListener(`keydown`, (evt) => {
      this._closeFilmPopupOnEscKeyDown(evt, popup);
    });

    this._mode = Mode.POPUP;
  }

  render(film) {
    const oldFilmComponent = this._filmComponent;
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

    this._filmDetailsComponent = new FilmDetailsComponent(film);

    this._filmDetailsComponent.setButtonAddClickHandler(() => {
      this._onDataChange(film, Object.assign({}, film, {
        isWatchlist: !film.isWatchlist
      }));

      this._filmDetailsComponent.rerender();
    });

    this._filmDetailsComponent.setButtonFavoriteClickHandler(() => {
      this._onDataChange(film, Object.assign({}, film, {
        isFavorites: !film.isFavorites
      }));

      this._filmDetailsComponent.rerender();
    });

    this._filmDetailsComponent.setButtonWatchedClickHandler(() => {
      this._onDataChange(film, Object.assign({}, film, {
        isHistory: !film.isHistory
      }));

      this._filmDetailsComponent.rerender();
    });

    this._filmComponent.setCommentsAmountClickHandler((evt) => {
      this._openFilmPopup(film, this._filmDetailsComponent, evt);
    });

    this._filmComponent.setCoverClickHandler((evt) => {
      this._openFilmPopup(film, this._filmDetailsComponent, evt);
    });

    this._filmComponent.setTitleClickHandler((evt) => {
      this._openFilmPopup(film, this._filmDetailsComponent, evt);
    });

    if (oldFilmComponent) {
      replace(this._filmComponent, oldFilmComponent);
    } else {
      render(this._container, this._filmComponent);
    }

    this._filmDetailsComponent.setCloseButtonClickHandler(() => {
      this._closeFilmPopup(this._filmDetailsComponent);
    });
  }

  _renderFilmPopup(film, popup) {
    render(siteBody, popup);

    const popupComments = popup.getElement().querySelector(`.form-details__bottom-container`);

    render(popupComments, new CommentContainerComponent(film));

    const comments = popupComments.querySelector(`.film-details__comments-wrap`);
    const commentNewComponent = new CommentNewComponent();

    render(comments, new CommentsListComponent());
    render(comments, commentNewComponent);

    commentNewComponent.onEmojiListClick((evt) => {
      const emojiContainer = commentNewComponent.getElement().querySelector(`.film-details__add-emoji-label`);
      const newEmoji = evt.target.cloneNode();
      const oldEmoji = commentNewComponent.getElement().querySelector(`.film-details__add-emoji-label img`);

      if (oldEmoji) {
        emojiContainer.replaceChild(newEmoji, oldEmoji);
      } else {
        emojiContainer.append(newEmoji);
      }
    });
  }

  setDefaultView() {
    if (this._mode !== Mode.DEFAULT) {
      this._closeFilmPopup(this._filmDetailsComponent);
    }
  }
}
