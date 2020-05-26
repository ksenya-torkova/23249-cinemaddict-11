import {SortType, Tag} from './../utils/const';
import AbstractComponent from './abstract-component';

const createSortTemplate = () => {
  return (
    `<ul class="sort">
      <li><a href="#" class="sort__button sort__button--active" data-sort-type="${SortType.DEFAULT}">Sort by default</a></li>
      <li><a href="#" class="sort__button" data-sort-type="${SortType.DATE}">Sort by date</a></li>
      <li><a href="#" class="sort__button" data-sort-type="${SortType.RATING}">Sort by rating</a></li>
    </ul>`
  );
};

export default class Sort extends AbstractComponent {
  constructor() {
    super();
    this._currentType = SortType.DEFAULT;
  }

  getType() {
    return this._currentType;
  }

  getTemplate() {
    return createSortTemplate();
  }

  setTypeChangeHandler(handler) {
    this.getElement().addEventListener(`click`, (evt) => {
      evt.preventDefault();

      if (evt.target.tagName.toLowerCase() !== Tag.LINK) {
        return;
      }

      const sortType = evt.target.dataset.sortType;

      if (this._currentType === sortType) {
        return;
      }

      const filterActive = this.getElement().querySelector(`.sort__button--active`);

      if (filterActive) {
        filterActive.classList.remove(`sort__button--active`);
        evt.target.classList.add(`sort__button--active`);
      }

      this._currentType = sortType;

      handler(this._currentType);
    });
  }
}
