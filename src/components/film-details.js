import {formatDate, formatDuration} from './../utils/common';
import AbstractSmartComponent from './abstract-smart-component';

const createGenreMarkup = (genre) => {
  return `<span class="film-details__genre">${genre}</span>`;
};

const createGenresMarkup = (genres) => {
  const genresMarkup = genres
  .map(
      (genre) => {
        return createGenreMarkup(genre);
      }
  ).join(`\n`);

  return (
    `<td class="film-details__cell">
      ${genresMarkup}
    </td>`
  );
};

const createFilmDetailsTemplate = (film) => {
  const {
    actors,
    ageRating,
    country,
    date,
    description,
    director,
    duration,
    genres,
    isFavorites,
    isHistory,
    isWatchlist,
    poster,
    raiting,
    title,
    titleAlternative,
    writers,
  } = film;

  const genreTitle = genres.length > 1 ? `Genres` : `Genre`;

  return (
    `<section class="film-details">
      <form class="film-details__inner" action="" method="get">
        <div class="form-details__top-container">
          <div class="film-details__close">
            <button class="film-details__close-btn" type="button">close</button>
          </div>
          <div class="film-details__info-wrap">
            <div class="film-details__poster">
              <img class="film-details__poster-img" src="${poster}" alt="">

              <p class="film-details__age">${ageRating}+</p>
            </div>

            <div class="film-details__info">
              <div class="film-details__info-head">
                <div class="film-details__title-wrap">
                  <h3 class="film-details__title">${title}</h3>
                  <p class="film-details__title-original">Original: ${titleAlternative}</p>
                </div>

                <div class="film-details__rating">
                  <p class="film-details__total-rating">${raiting}</p>
                </div>
              </div>

              <table class="film-details__table">
                <tr class="film-details__row">
                  <th class="film-details__term">Director</th>
                  <td class="film-details__cell">${director}</td>
                </tr>
                <tr class="film-details__row">
                  <th class="film-details__term">Writers</th>
                  <td class="film-details__cell">${writers}</td>
                </tr>
                <tr class="film-details__row">
                  <th class="film-details__term">Actors</th>
                  <td class="film-details__cell">${actors}</td>
                </tr>
                <tr class="film-details__row">
                  <th class="film-details__term">Release Date</th>
                  <td class="film-details__cell">${formatDate(date)}</td>
                </tr>
                <tr class="film-details__row">
                  <th class="film-details__term">Runtime</th>
                  <td class="film-details__cell">${formatDuration(duration)}</td>
                </tr>
                <tr class="film-details__row">
                  <th class="film-details__term">Country</th>
                  <td class="film-details__cell">${country}</td>
                </tr>
                <tr class="film-details__row">
                  <th class="film-details__term">
                    ${genreTitle}
                  </th>
                  ${createGenresMarkup(genres)}
                </tr>
              </table>

              <p class="film-details__film-description">${description}</p>
            </div>
          </div>

          <section class="film-details__controls">
            <input type="checkbox" class="film-details__control-input visually-hidden" id="watchlist" name="watchlist" ${isWatchlist ? `checked` : ``}>
            <label for="watchlist" class="film-details__control-label film-details__control-label--watchlist">Add to watchlist</label>

            <input type="checkbox" class="film-details__control-input visually-hidden" id="watched" name="watched" ${isHistory ? `checked` : ``}>
            <label for="watched" class="film-details__control-label film-details__control-label--watched">Already watched</label>

            <input type="checkbox" class="film-details__control-input visually-hidden" id="favorite" name="favorite" ${isFavorites ? `checked` : ``}>
            <label for="favorite" class="film-details__control-label film-details__control-label--favorite">Add to favorites</label>
          </section>
        </div>

        <div class="form-details__bottom-container">
        </div>
      </form>
    </section>`
  );
};

export default class FilmDetails extends AbstractSmartComponent {
  constructor(film) {
    super();
    this._film = film;
    this._closeButtonClickHandler = null;
    this._addToWatchlistClickHandler = null;
    this._markAsWathedClickHandler = null;
    this._favoriteClickHandler = null;
  }

  getTemplate() {
    return createFilmDetailsTemplate(this._film);
  }

  recoveryListeners() {
    this.setCloseButtonClickHandler(this._closeButtonClickHandler);
    this.setButtonAddClickHandler(this._addToWatchlistClickHandler);
    this.setButtonWatchedClickHandler(this._markAsWathedClickHandler);
    this.setButtonFavoriteClickHandler(this._favoriteClickHandler);
  }

  setButtonAddClickHandler(handler) {
    this.getElement().querySelector(`.film-details__control-label--watchlist`).addEventListener(`click`, handler);
    this._addToWatchlistClickHandler = handler;
  }

  setButtonFavoriteClickHandler(handler) {
    this.getElement().querySelector(`.film-details__control-label--favorite`).addEventListener(`click`, handler);
    this._favoriteClickHandler = handler;
  }

  setButtonWatchedClickHandler(handler) {
    this.getElement().querySelector(`.film-details__control-label--watched`).addEventListener(`click`, handler);
    this._markAsWathedClickHandler = handler;
  }

  setCloseButtonClickHandler(handler) {
    this.getElement().querySelector(`.film-details__close-btn`).addEventListener(`click`, handler);
    this._closeButtonClickHandler = handler;
  }

  setSubmitHandler(handler) {
    this.getElement().querySelector(`.film-details__inner`).addEventListener(`keydown`, (evt) => {
      if (evt.key === `Enter` && (evt.ctrlKey || evt.metaKey)) {
        handler();
      }
    });
  }
}
