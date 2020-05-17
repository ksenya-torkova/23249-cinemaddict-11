export default class Comments {
  constructor() {
    this._comments = [];
    this._dataChangeHandlers = [];
  }

  addComment(comment) {
    this._comments = [].concat(comment, this._comments);
    this._callHandlers(this._dataChangeHandlers);
  }

  _callHandlers(handlers) {
    handlers.forEach((handler) => {
      handler();
    });
  }

  getComments() {
    return this._comments;
  }

  removeComment(film, comments, id) {
    const index = comments.findIndex((comment) => comment.id.toString() === id);

    if (index === -1) {
      return false;
    }

    this._comments = [].concat(comments.slice(0, index), comments.slice(index + 1));

    this._callHandlers(this._dataChangeHandlers);
    return true;
  }

  setComments(comments) {
    this._comments = Array.from(comments);
    this._callHandlers(this._dataChangeHandlers);
  }

  setDataChangeHandlers(handler) {
    this._dataChangeHandlers.push(handler);
  }
}
