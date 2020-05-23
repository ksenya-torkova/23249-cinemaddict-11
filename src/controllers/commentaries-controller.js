import {render, replace} from './../utils/render';
import CommentContainerComponent from './../components/comment-container';
import CommentsListComponent from './../components/comments-list';
import CommentNewComponent from './../components/comment-new';

export default class CommentariesController {
  constructor(container, film, commentModel, onDataChange) {
    this._container = container;
    this._film = film;
    this._commentNewComponent = null;
    this._commentsListComponent = null;
    this._oldCommentsListComponent = null;
    this._commentContainerComponent = null;
    this._comments = null;
    this._commentModel = commentModel;
    this._onDataChange = onDataChange;
    this._commentsContainer = null;
  }

  addComment() {
    this._commentContainerComponent.getElement().querySelector(`.film-details__comments-count`).textContent = this._commentModel.getComments().length;
    this._comments = this._commentModel.getComments();
    this._commentsListComponent = new CommentsListComponent(this._comments);
    replace(this._commentsListComponent, this._oldCommentsListComponent);
  }

  _createCommentsList() {
    this._comments = this._commentModel.getComments();
    this._commentsListComponent = new CommentsListComponent(this._comments);
    this._oldCommentsListComponent = this._commentsListComponent;

    this._commentsListComponent.setDeleteButtonClickHandler((id) => {
      this._commentModel.removeComment(this._film, this._comments, id);

      this._onDataChange(this._film, Object.assign({}, this._film, {
        commentsLength: this._commentModel.getComments().length,
      }));

      this._updateCommentsList();
    });

    render(this._commentsContainer, this._commentsListComponent);
  }

  _onEmojiListClick() {
    this._commentNewComponent.onEmojiListClick((evt) => {
      const emojiContainer = this._commentNewComponent.getElement().querySelector(`.film-details__add-emoji-label`);
      const newEmoji = evt.target.cloneNode();
      const oldEmoji = this._commentNewComponent.getElement().querySelector(`.film-details__add-emoji-label img`);

      if (oldEmoji) {
        emojiContainer.replaceChild(newEmoji, oldEmoji);
      } else {
        emojiContainer.append(newEmoji);
      }
    });
  }

  render() {
    const popupComments = this._container.getElement().querySelector(`.form-details__bottom-container`);
    this._commentContainerComponent = new CommentContainerComponent(this._commentModel.getComments().length);
    render(popupComments, this._commentContainerComponent);

    this._commentsContainer = popupComments.querySelector(`.film-details__comments-wrap`);
    this._commentNewComponent = new CommentNewComponent();
    this._createCommentsList();
    this._onEmojiListClick();
    render(this._commentsContainer, this._commentNewComponent);
  }

  _updateCommentsList() {
    this._commentContainerComponent.getElement().querySelector(`.film-details__comments-count`).textContent = this._commentModel.getComments().length;
    this._comments = this._commentModel.getComments();
  }
}
