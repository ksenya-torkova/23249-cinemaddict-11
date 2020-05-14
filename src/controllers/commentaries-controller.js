import {render} from './../utils/render.js';
import CommentContainerComponent from './../components/comment-container.js';
import CommentsListComponent from './../components/comments-list.js';
import CommentNewComponent from './../components/comment-new.js';

export default class CommentariesController {
  constructor(container, film, commentsList) {
    this._container = container;
    this._film = film;
    this._commentsList = commentsList;
  }

  render() {
    const popupComments = this._container.getElement().querySelector(`.form-details__bottom-container`);

    render(popupComments, new CommentContainerComponent(this._film, this._commentsList));

    const comments = popupComments.querySelector(`.film-details__comments-wrap`);
    const commentNewComponent = new CommentNewComponent();

    render(comments, new CommentsListComponent(this._commentsList));
    render(comments, commentNewComponent);

    commentNewComponent.onEmojiListClick((evt) => {
      const emojiContainer = commentNewComponent.getElement().querySelector(`.film-details__add-emoji-label`);
      const newEmoji = evt.target.cloneNode();
      const oldEmoji = commentNewComponent.getElement().querySelector(`.film-details__add-emoji-label img`);

      if (oldEmoji) {
        emojiContainer.replaceChild(newEmoji, oldEmoji);
      } else {
        emojiContainer.append(newEmoji);
      }
    });
  }
}
