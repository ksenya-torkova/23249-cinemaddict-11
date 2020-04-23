import AbstractComponent from './abstract-component.js';

const createCommentContainer = (card) => {
  const {commentsAmount} = card;
  const commentDeclension = commentsAmount > 1 ? `Comments` : `Comment`;

  return (
    `<section class="film-details__comments-wrap">
      <h3 class="film-details__comments-title">${commentDeclension} <span class="film-details__comments-count">${commentsAmount}</span></h3>
    </section>`
  );
};

export default class CommentContainer extends AbstractComponent {
  constructor(card) {
    super();
    this._card = card;
  }

  getTemplate() {
    return createCommentContainer(this._card);
  }
}
