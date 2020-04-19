import {createElement} from './../utils.js';

const createFooterStatisticsTemplate = (cards) => {
  return (
    `<section class="footer__statistics">
      <p>${cards.length} movies inside</p>
    </section>`
  );
};

export default class FooterStatistics {
  constructor(cards) {
    this._cards = cards;
    this._element = null;
  }

  getTemplate() {
    return createFooterStatisticsTemplate(this._cards);
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
