import AbstractComponent from './abstract-component.js';

const createFilmTemplate = (film) => {
  const {description, duration, genres, isFavorites, isHistory, isWatchlist, name, poster, raiting, year, commentsLength} = film;

  return (
    `<article class="film-card">
      <h3 class="film-card__title">${name}</h3>
      <p class="film-card__rating">${raiting}</p>
      <p class="film-card__info">
        <span class="film-card__year">${year}</span>
        <span class="film-card__duration">${duration}</span>
        <span class="film-card__genre">${genres}</span>
      </p>
      <img src="./images/posters/${poster}" alt="" class="film-card__poster">
      <p class="film-card__description">${description}</p>
      <a class="film-card__comments">${commentsLength === 1 ? `${commentsLength} comment` : `${commentsLength} comments`}</a>
      <form class="film-card__controls">
        <button class="film-card__controls-item button  film-card__controls-item--add-to-watchlist  ${isWatchlist ? `film-card__controls-item--active` : ``}">
          Add to watchlist
        </button>
        <button class="film-card__controls-item button  film-card__controls-item--mark-as-watched  ${isHistory ? `film-card__controls-item--active` : ``}">
          Mark as watched
        </button>
        <button class="film-card__controls-item button  film-card__controls-item--favorite  ${isFavorites ? `film-card__controls-item--active` : ``}">
          Mark as favorite
        </button>
      </form>
    </article>`
  );
};

export default class Film extends AbstractComponent {
  constructor(film, commentsAmount) {
    super();
    this._film = film;
    this._commentsAmount = commentsAmount;
  }

  getTemplate() {
    return createFilmTemplate(this._film, this._commentsAmount);
  }

  setButtonAddClickHandler(handler) {
    this.getElement().querySelector(`.film-card__controls-item--add-to-watchlist`).addEventListener(`click`, handler);
  }

  setButtonFavoriteClickHandler(handler) {
    this.getElement().querySelector(`.film-card__controls-item--favorite`).addEventListener(`click`, handler);
  }

  setButtonWatchedClickHandler(handler) {
    this.getElement().querySelector(`.film-card__controls-item--mark-as-watched`).addEventListener(`click`, handler);
  }

  setCommentsAmountClickHandler(handler) {
    this.getElement().querySelector(`.film-card__comments`).addEventListener(`click`, handler);
  }

  setCoverClickHandler(handler) {
    this.getElement().querySelector(`.film-card__poster`).addEventListener(`click`, handler);
  }

  setTitleClickHandler(handler) {
    this.getElement().querySelector(`.film-card__title`).addEventListener(`click`, handler);
  }
}
