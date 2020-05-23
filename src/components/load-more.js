import AbstractComponent from './abstract-component';

const createLoadMoreTemplate = () => {
  return (
    `<button class="films-list__show-more">Show more</button>`
  );
};

export default class LoadMore extends AbstractComponent {
  getTemplate() {
    return createLoadMoreTemplate();
  }

  setClickHandler(handler) {
    this.getElement().addEventListener(`click`, handler);
  }
}
