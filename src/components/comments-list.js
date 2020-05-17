import {createComment} from './../utils/common.js';
import AbstractComponent from './abstract-component.js';

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
    this._deleteButtonClickHandler = null;
  }

  getTemplate() {
    return createCommentsList(this._comments);
  }

  setDeleteButtonClickHandler(handler) {
    const deleteButtons = this.getElement().querySelectorAll(`.film-details__comment-delete`);

    deleteButtons.forEach((deleteButton) => deleteButton.addEventListener(`click`, () => {
      const deleteBittonParent = deleteButton.closest(`.film-details__comment`);
      deleteBittonParent.remove();
      handler(deleteBittonParent.dataset.id);
    }));
  }
}
