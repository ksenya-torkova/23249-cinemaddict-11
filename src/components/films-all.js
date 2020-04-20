import {createElement} from './../utils.js';

const createFilmsAllTemplate = () => {
  return (
    `<section class="films-list  films-list--all">
      <h2 class="films-list__title visually-hidden">All movies. Upcoming</h2>
      <div class="films-list__container">
      </div>
    </section>`
  );
};

export default class FilmsAll {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createFilmsAllTemplate();
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
