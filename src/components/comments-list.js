import moment from 'moment';
import {shake} from './../utils/render';
import AbstractSmartComponent from './abstract-smart-component';

const ButtonStatus = {
  ENABLED: `Delete`,
  DISABLED: `Deleting...`,
};

const createComment = (comment) => {
  const {emojiType, id, text, time, userName} = comment;

  return (
    `<li class="film-details__comment" data-id="${id}">
      <span class="film-details__comment-emoji">
        <img src="./images/emoji/${emojiType}.png" width="55" height="55" alt="emoji-${emojiType}">
      </span>
      <div>
        <p class="film-details__comment-text">${text}</p>
        <p class="film-details__comment-info">
          <span class="film-details__comment-author">${userName}</span>
          <span class="film-details__comment-day">
          ${moment(time).fromNow()}
          </span>
          <button class="film-details__comment-delete" type="button">${ButtonStatus.ENABLED}</button>
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

export default class CommentsList extends AbstractSmartComponent {
  constructor(comments) {
    super();
    this._comments = comments;
    this._activeDeleteCommentButton = null;
    this._deleteButtonClickHandler = null;
  }

  disableDeleteButton() {
    this._activeDeleteCommentButton.disabled = true;
    this._activeDeleteCommentButton.textContent = ButtonStatus.DISABLED;
  }

  enableDeleteButton() {
    this._activeDeleteCommentButton.disabled = false;
    this._activeDeleteCommentButton.textContent = ButtonStatus.ENABLED;
  }

  getTemplate() {
    return createCommentsList(this._comments);
  }

  recoveryListeners() {
    this.setDeleteButtonClickHandler(this._deleteButtonClickHandler);
  }

  setDeleteButtonClickHandler(handler) {
    const deleteButtons = this.getElement().querySelectorAll(`.film-details__comment-delete`);

    deleteButtons.forEach((deleteButton) => deleteButton.addEventListener(`click`, () => {
      this._activeDeleteCommentButton = deleteButton;

      const deleteButtonParent = deleteButton.closest(`.film-details__comment`);
      const commentId = deleteButtonParent.dataset.id;

      handler(commentId, deleteButtonParent);
    }));

    this._deleteButtonClickHandler = handler;
  }

  shake() {
    shake(this._activeDeleteCommentButton);
  }

  updateComments(updatedComments) {
    this._comments = updatedComments;

    this.rerender();
  }
}
