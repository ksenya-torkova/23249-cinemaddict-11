import AbstractComponent from './abstract-component.js';

const createCommentContainer = (card, comments) => {
  const {id} = card;
  const commentsAmount = comments.length;
  const commentDeclension = commentsAmount > 1 ? `Comments` : `Comment`;
  const isComments = comments.length > 0 ?
    `<h3 class="film-details__comments-title">${commentDeclension}
      <span class="film-details__comments-count">${commentsAmount}</span>
    </h3>` : ``;

  return (
    `<section class="film-details__comments-wrap">
      ${isComments} ${id}
    </section>`
  );
};

export default class CommentContainer extends AbstractComponent {
  constructor(card, comments) {
    super();
    this._card = card;
    this._comments = comments;
  }

  getTemplate() {
    return createCommentContainer(this._card, this._comments);
  }
}
