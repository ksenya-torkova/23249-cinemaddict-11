import {render} from './../utils/render';
import CommentContainerComponent from './../components/comment-container';
import CommentsListComponent from './../components/comments-list';
import CommentNewComponent from './../components/comment-new';
import FilmModel from './../models/film-model';

export default class CommentariesController {
  constructor(container, film, commentModel, onCommentChange, api) {
    this._container = container;
    this._film = film;
    this._api = api;
    this._commentNewComponent = null;
    this._commentsListComponent = null;
    this._commentContainerComponent = null;
    this._comments = null;
    this._commentModel = commentModel;
    this._commentsContainer = null;
    this._onCommentChange = onCommentChange;
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
    this._commentContainerComponent = new CommentContainerComponent(this._commentModel.getCommentsById(this._film.id).length);

    render(popupComments, this._commentContainerComponent);

    this._commentsContainer = popupComments.querySelector(`.film-details__comments-wrap`);
    this._commentNewComponent = new CommentNewComponent();
    this._commentsListComponent = new CommentsListComponent(this._commentModel.getCommentsById(this._film.id));
    this._onEmojiListClick();

    this._commentsListComponent.setDeleteButtonClickHandler((removeCommentId) => {
      const newFilm = FilmModel.clone(this._film);

      newFilm.comments = newFilm.comments.filter((commentId) => commentId !== removeCommentId);

      this._api.deleteComment(removeCommentId)
        .then(() => {
          this._onCommentChange(this._film, newFilm, removeCommentId, null);
        })
        .catch(() => {
        });
    });

    this._commentNewComponent.setSubmitHandler((newComment) => {
      const newFilm = FilmModel.clone(this._film);

      this._api.createComment(this._film.id, newComment)
        .then((comments) => {
          newFilm.comments = comments.map((comment) => comment.id);
          this._onCommentChange(this._film, newFilm, null, comments);
        })
        .catch(() => {
        });
    });

    render(this._commentsContainer, this._commentsListComponent);
    render(this._commentsContainer, this._commentNewComponent);
  }
}
