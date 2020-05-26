import AbstractComponent from './abstract-component';

const createCommentContainer = (amount) => {
  const commentDeclension = amount > 1 ? `Comments` : `Comment`;
  const isComments = amount > 0 ?
    `<h3 class="film-details__comments-title">${commentDeclension}
      <span class="film-details__comments-count">${amount}</span>
    </h3>` : ``;

  return (
    `<section class="film-details__comments-wrap">
      ${isComments}
    </section>`
  );
};

export default class CommentContainer extends AbstractComponent {
  constructor(commentsLength) {
    super();
    this._commentsLength = commentsLength;
  }

  changeAmount(amount) {
    const counter = this.getElement().querySelector(`.film-details__comments-count`);
    counter.textContent = amount;
  }

  getTemplate() {
    return createCommentContainer(this._commentsLength);
  }
}
