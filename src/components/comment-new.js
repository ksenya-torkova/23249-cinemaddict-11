import {encode} from 'he';
import {Tag} from './../utils/const';
import {shake} from './../utils/render';
import AbstractComponent from './abstract-component';

const createCommentNew = () => {
  return (
    `<div class="film-details__new-comment">
      <div for="add-emoji" class="film-details__add-emoji-label"></div>

      <label class="film-details__comment-label">
        <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment"></textarea>
      </label>

      <div class="film-details__emoji-list">
        <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-smile" value="smile">
        <label class="film-details__emoji-label" for="emoji-smile">
          <img src="./images/emoji/smile.png" width="30" height="30" alt="smile">
        </label>

        <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-sleeping" value="sleeping">
        <label class="film-details__emoji-label" for="emoji-sleeping">
          <img src="./images/emoji/sleeping.png" width="30" height="30" alt="sleeping">
        </label>

        <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-puke" value="puke">
        <label class="film-details__emoji-label" for="emoji-puke">
          <img src="./images/emoji/puke.png" width="30" height="30" alt="puke">
        </label>

        <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-angry" value="angry">
        <label class="film-details__emoji-label" for="emoji-angry">
          <img src="./images/emoji/angry.png" width="30" height="30" alt="angry">
        </label>
      </div>
    </div>`
  );
};

export default class CommentNew extends AbstractComponent {
  constructor() {
    super();
    this._textField = null;
    this._imgContainer = null;
  }

  clear() {
    const emoji = this.getElement().querySelector(`.film-details__add-emoji-label img`);
    const textarea = this.getElement().querySelector(`.film-details__comment-input`);
    const checkedInput = this.getElement().querySelector(`.film-details__emoji-item:checked`);

    if (checkedInput) {
      checkedInput.checked = false;
    }

    emoji.remove();
    textarea.value = ``;
  }

  disableTextCommentField() {
    this._textField.disabled = true;
  }

  enableTextCommentField() {
    this._textField.disabled = false;
  }

  getTemplate() {
    return createCommentNew();
  }

  setSubmitHandler(handler) {
    const textCommentElement = this._element.querySelector(`.film-details__comment-input`);
    this._textField = textCommentElement;

    textCommentElement.addEventListener(`keydown`, (evt) => {
      if (evt.key === `Enter` && (evt.ctrlKey || evt.metaKey)) {
        const newComment = this._getNewComment();

        handler(newComment);
      }
    });
  }

  shakeNewComment() {
    shake(this.getElement());
  }

  _addBorderToComment() {
    this._textField.style.border = `1px solid #ff0000`;
  }

  _addBorderToImgContainer() {
    this._imgContainer.style.border = `1px solid #ff0000`;
  }

  _getNewComment() {
    const textCommentElement = this._element.querySelector(`.film-details__comment-input`);
    const comment = encode(textCommentElement.value);
    const commentLabel = this._element.querySelector(`.film-details__add-emoji-label`);
    const commentImg = this._element.querySelector(`.film-details__add-emoji-label img`);
    this._imgContainer = commentLabel;

    if (!commentImg) {
      this._addBorderToImgContainer();
      return null;
    } else {
      this._removeBorderFromImgContainer();
    }

    const emotion = commentImg.alt;

    if (!comment) {
      this._addBorderToComment();
      return null;
    } else {
      this._removeBorderFromComment();
    }

    const date = new Date();

    return {
      comment,
      date,
      emotion,
    };
  }

  _removeBorderFromComment() {
    this._textField.style.border = `1px solid transparent`;
  }

  _removeBorderFromImgContainer() {
    this._imgContainer.style.border = `1px solid transparent`;
  }

  onEmojiListClick(handler) {
    this.getElement().querySelector(`.film-details__emoji-list`).addEventListener(`click`, (evt) => {
      if (evt.target.tagName.toLowerCase() !== Tag.IMG) {
        return;
      }

      handler(evt);
    });
  }
}
