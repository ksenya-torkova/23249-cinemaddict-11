import moment from 'moment';
import AbstractComponent from './abstract-component';

const createComment = (comment) => {
  const {emojiType, commentText, userName, time} = comment;

  return (
    `<li class="film-details__comment" data-id="${comment.id}">
      <span class="film-details__comment-emoji">
        <img src="./images/emoji/${emojiType}.png" width="55" height="55" alt="emoji-${emojiType}">
      </span>
      <div>
        <p class="film-details__comment-text">${commentText}</p>
        <p class="film-details__comment-info">
          <span class="film-details__comment-author">${userName}</span>
          <span class="film-details__comment-day">
          ${moment(time).fromNow()}
          </span>
          <button class="film-details__comment-delete" type="button">Delete</button>
        </p>
      </div>
    </li>`
  );
};

const createCommentsList = (comments) => {
  const createCommentMarkup = comments
  .map(
      (comment) => {
        return createComment(comment);
      }
  ).join(`\n`);

  return (
    `<ul class="film-details__comments-list">
      ${createCommentMarkup}
    </ul>`
  );
};

export default class CommentsList extends AbstractComponent {
  constructor(comments) {
    super();
    this._comments = comments;
  }

  getTemplate() {
    return createCommentsList(this._comments);
  }

  setDeleteButtonClickHandler(handler) {
    const deleteButtons = this.getElement().querySelectorAll(`.film-details__comment-delete`);

    deleteButtons.forEach((deleteButton) => deleteButton.addEventListener(`click`, () => {
      const deleteButtonParent = deleteButton.closest(`.film-details__comment`);
      const commentId = deleteButtonParent.dataset.id;
      deleteButtonParent.remove();
      handler(commentId);
    }));
  }
}
