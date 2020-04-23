import AbstractComponent from './abstract-component.js';

const createFilmDetailsTemplate = (film) => {
  const {actors, country, day, description, director, duration, genre, isFavorites, isHistory, isWatchlist, month, name, poster, raiting, writers, year} = film;

  return (
    `<section class="film-details">
      <form class="film-details__inner" action="" method="get">
        <div class="form-details__top-container">
          <div class="film-details__close">
            <button class="film-details__close-btn" type="button">close</button>
          </div>
          <div class="film-details__info-wrap">
            <div class="film-details__poster">
              <img class="film-details__poster-img" src="./images/posters/${poster}" alt="">

              <p class="film-details__age">18+</p>
            </div>

            <div class="film-details__info">
              <div class="film-details__info-head">
                <div class="film-details__title-wrap">
                  <h3 class="film-details__title">${name}</h3>
                  <p class="film-details__title-original">Original: ${name}</p>
                </div>

                <div class="film-details__rating">
                  <p class="film-details__total-rating">${raiting}</p>
                </div>
              </div>

              <table class="film-details__table">
                <tr class="film-details__row">
                  <td class="film-details__term">Director</td>
                  <td class="film-details__cell">${director}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Writers</td>
                  <td class="film-details__cell">${writers}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Actors</td>
                  <td class="film-details__cell">${actors}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Release Date</td>
                  <td class="film-details__cell">${day} ${month} ${year}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Runtime</td>
                  <td class="film-details__cell">${duration}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Country</td>
                  <td class="film-details__cell">${country}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Genres</td>
                  <td class="film-details__cell">
                    <? -- Вот тут непонятно, в карточке фильма мы указываем один жанр, а здесь жанры и они должны быть не в одном спане, а каждый жанр в отдельном span.
                    Значит, нужан еще функция, которая будет генерировать разметку для жанров в зависимости от их количества? -->
                    <span class="film-details__genre">${genre}</span>
                    <span class="film-details__genre"></span>
                    <span class="film-details__genre"></span>
                  </td>
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

export default class FilmDetails extends AbstractComponent {
  constructor(film) {
    super();
    this._film = film;
  }

  getTemplate() {
    return createFilmDetailsTemplate(this._film);
  }

  setCloseButtonClickHandler(handler) {
    this.getElement().querySelector(`.film-details__close-btn`).addEventListener(`click`, handler);
  }
}
