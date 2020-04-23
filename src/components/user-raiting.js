import AbstractComponent from './abstract-component.js';

const createUserRaitingTemplate = (raiting) => {
  return (
    `<section class="header__profile profile">
      <p class="profile__rating">${raiting}</p>
      <img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
    </section>`
  );
};

export default class UserRaiting extends AbstractComponent {
  constructor(rank) {
    super();
    this._rank = rank;
  }

  getTemplate() {
    return createUserRaitingTemplate(this._rank);
  }
}
