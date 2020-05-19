import {FilterType} from "./const.js";

const getFavoriteFilms = (films) => {
  return films.filter((film) => film.isFavorites);
};

const getHistoryFilms = (films) => {
  return films.filter((film) => film.isHistory);
};

const getWatchedFilms = (films) => {
  return films.filter((film) => film.isWatchlist);
};

const getFilmsByFilter = (films, filterType) => {
  switch (filterType) {
    case FilterType.ALL:
      return films;
    case FilterType.FAVORITES:
      return getFavoriteFilms(films);
    case FilterType.HISTORY:
      return getHistoryFilms(films);
    case FilterType.WATCHLIST:
      return getWatchedFilms(films);
  }

  return films;
};

export {getFilmsByFilter, getWatchedFilms};
