import {createElement} from './../utils.js';

const createCommentContainer = (card) => {
  const {commentsAmount} = card;
  const commentDeclension = commentsAmount > 1 ? `Comments` : `Comment`;

  return (
    `<section class="film-details__comments-wrap">
      <h3 class="film-details__comments-title">${commentDeclension} <span class="film-details__comments-count">${commentsAmount}</span></h3>
    </section>`
  );
};

export default class CommentContainer {
  constructor(card) {
    this._card = card;
    this._element = null;
  }

  getTemplate() {
    return createCommentContainer(this._card);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
