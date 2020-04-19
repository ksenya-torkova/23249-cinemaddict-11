import {createElement} from './../utils.js';

const createUserRaitingTemplate = (raiting) => {
  return (
    `<section class="header__profile profile">
      <p class="profile__rating">${raiting}</p>
      <img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
    </section>`
  );
};

export default class UserRaiting {
  constructor(rank) {
    this._rank = rank;
    this._element = null;
  }

  getTemplate() {
    return createUserRaitingTemplate(this._rank);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
