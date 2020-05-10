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

  setStatsClickHandler(handler) {
    this.getElement().querySelector(`.main-navigation__item--additional`).addEventListener(`click`, (evt) => {
      evt.preventDefault();
      handler();
    });
  }
}
