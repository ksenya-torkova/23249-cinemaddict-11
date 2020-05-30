export default class Comments {
  constructor() {
    this._comments = [];
    this._dataChangeHandlers = [];
  }

  getComments() {
    return this._comments;
  }

  getCommentsById(filmId) {
    return this._comments[filmId];
  }

  setComments(filmId, comments) {
    this._comments[filmId] = comments;
    this._callHandlers(this._dataChangeHandlers);
  }

  setDataChangeHandlers(handler) {
    this._dataChangeHandlers.push(handler);
  }

  updateComments(filmId, comments) {
    this._comments[filmId] = comments;

    return true;
  }

  _callHandlers(handlers) {
    handlers.forEach((handler) => {
      handler();
    });
  }
}
