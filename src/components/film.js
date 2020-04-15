const createFilmTemplate = (film) => {
  const {commentsAmount, description, duration, genre, isFavorites, isHistory, isWatchlist, name, poster, raiting, year} = film;

  return (
    `<article class="film-card">
      <h3 class="film-card__title">${name}</h3>
      <p class="film-card__rating">${raiting}</p>
      <p class="film-card__info">
        <span class="film-card__year">${year}</span>
        <span class="film-card__duration">${duration}</span>
        <span class="film-card__genre">${genre}</span>
      </p>
      <img src="./images/posters/${poster}" alt="" class="film-card__poster">
      <p class="film-card__description">${description}</p>
      <a class="film-card__comments">${commentsAmount > 1 ? `${commentsAmount} comments` : `${commentsAmount} comment`}</a>
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

export {createFilmTemplate};
