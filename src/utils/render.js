import {siteBody} from './const.js';
import {closeFilmPopup, openFilmPopup} from './common.js';
import CommentContainerComponent from './../components/comment-container.js';
import CommentsListComponent from './../components/comments-list.js';
import CommentNewComponent from './../components/comment-new.js';
import FilmComponent from './../components/film.js';
import FilmDetailsComponent from './../components/film-details.js';

const RenderPosition = {
  AFTER_BEGIN: `afterbegin`,
  AFTER_END: `afterend`,
  BEFORE_BEGIN: `beforebegin`,
  BEFORE_END: `beforeend`
};

const createElement = (template) => {
  const newElement = document.createElement(`div`);
  newElement.innerHTML = template;

  return newElement.firstChild;
};

const remove = (component) => {
  component.getElement().remove();
  component.removeElement();
};

const render = (container, component, place = RenderPosition.BEFORE_END) => {
  switch (place) {
    case RenderPosition.AFTER_BEGIN:
      container.prepend(component.getElement());
      break;
    case RenderPosition.BEFORE_END:
      container.append(component.getElement());
      break;
  }
};

const renderFilm = (container, film) => {
  const filmComponent = new FilmComponent(film);

  render(container, filmComponent);

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
};

const renderFilmPopup = (film, popup) => {
  render(siteBody, popup);

  const popupComments = popup.getElement().querySelector(`.form-details__bottom-container`);

  render(popupComments, new CommentContainerComponent(film));

  const comments = popupComments.querySelector(`.film-details__comments-wrap`);

  render(comments, new CommentsListComponent());
  render(comments, new CommentNewComponent());
};

export {createElement, remove, render, renderFilm, renderFilmPopup};
