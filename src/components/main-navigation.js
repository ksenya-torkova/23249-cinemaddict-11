import {ANCHOR_PREFIX, Tag} from './../utils/const';
import {getSubstring} from './../utils/common.js';
import AbstractComponent from './abstract-component.js';

const createMainNavigationTemplate = () => {
  return (
    `<nav class="main-navigation">
      <a href="#stats" class="main-navigation__item main-navigation__item--additional">Stats</a>
    </nav>`
  );
};

export default class MainNavigation extends AbstractComponent {

  getTemplate() {
    return createMainNavigationTemplate(this._cards);
  }

  setOnViewChange(handler) {
    this.getElement().addEventListener(`click`, (evt) => {
      evt.preventDefault();

      if (evt.target.tagName === Tag.LINK.toUpperCase()) {
        const clickedItem = getSubstring(evt.target.getAttribute(`href`), ANCHOR_PREFIX);
        const filterActiveClass = `main-navigation__item--active`;
        const filterActive = this.getElement().querySelector(`.${filterActiveClass}`);

        if (evt.target.classList.contains(filterActiveClass)) {
          return;
        }

        filterActive.classList.remove(filterActiveClass);
        evt.target.classList.add(filterActiveClass);

        handler(clickedItem);
      }
    });
  }
}
