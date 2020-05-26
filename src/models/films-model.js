import {FilterType} from '../utils/const';
import {getFilmsByFilter} from '../utils/filter';

export default class Films {
  constructor() {
    this._films = [];
    this._dataChangeHandlers = [];
    this._activeFilterType = FilterType.ALL;
    this._filterChangeHandlers = [];
  }

  _callHandlers(handlers) {
    handlers.forEach((handler) => handler());
  }

  getFilms() {
    return this._films;
  }

  getFiltredFilms() {
    return getFilmsByFilter(this._films, this._activeFilterType);
  }

  setDataChangeHandlers(handler) {
    this._dataChangeHandlers.push(handler);
  }

  setFilms(films) {
    this._films = Array.from(films);
    this._callHandlers(this._dataChangeHandlers);
  }

  setFilter(filterType) {
    this._activeFilterType = filterType;
    this._callHandlers(this._filterChangeHandlers);
  }

  setFilterChangeHandlers(handler) {
    this._filterChangeHandlers.push(handler);
  }

  updateFilm(id, film) {
    const index = this._films.findIndex((it) => it.id === id);

    if (index === -1) {
      return false;
    }

    this._films = [].concat(this._films.slice(0, index), film, this._films.slice(index + 1));
    this._callHandlers(this._dataChangeHandlers);

    return true;
  }
}
