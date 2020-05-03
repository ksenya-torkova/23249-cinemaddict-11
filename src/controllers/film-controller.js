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
  constructor(container) {
    this._container = container;
  }

  render(film) {
    const filmComponent = new FilmComponent(film);

    render(this._container, filmComponent);

    const filmDetailsComponent = new FilmDetailsComponent(film);

    filmComponent.setCoverClickHandler((evt) => {
      openFilmPopup(film, filmDetailsComponent, evt);
    });

    filmComponent.setTitleClickHandler((evt) => {
      openFilmPopup(film, filmDetailsComponent, evt);
    });

    filmComponent.setCommentsAmountClickHandler((evt) => {
      openFilmPopup(film, filmDetailsComponent, evt);
    });

    filmDetailsComponent.setCloseButtonClickHandler(() => {
      closeFilmPopup(filmDetailsComponent);
    });
  }
}
