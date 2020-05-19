import {createComment, getRandomArrayItem, getRandomInteger} from './../utils/common.js';
import {NAMES, TIMES} from './../utils/const.js';

export default class Comments {
  constructor() {
    this._comments = [];
    this._dataChangeHandlers = [];
  }

  addComment(comment) {
    this._comments = [].concat(this._comments, comment);
    this._callHandlers(this._dataChangeHandlers);
  }

  _callHandlers(handlers) {
    handlers.forEach((handler) => {
      handler();
    });
  }

  createComment(emoji, text) {
    const commentData = {
      emojiType: emoji,
      commentText: text,
      userName: getRandomArrayItem(NAMES),
      time: getRandomArrayItem(TIMES),
      id: getRandomInteger(0, 100),
    };

    this.addComment(commentData);
    createComment(commentData);
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
