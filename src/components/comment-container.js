import AbstractSmartComponent from './abstract-smart-component';

const getCommentsDeclension = (amount) => {
  return amount !== 1 ? `Comments` : `Comment`;
};

const createCommentContainer = (amount) => {
  const comments =
    `<h3 class="film-details__comments-title">${getCommentsDeclension(amount)}
      <span class="film-details__comments-count">${amount}</span>
    </h3>`;

  return (
    `<section class="film-details__comments-wrap">
      ${comments}
    </section>`
  );
};

export default class CommentContainer extends AbstractSmartComponent {
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
