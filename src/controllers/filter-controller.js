import {FilterType} from './../utils/const.js';
import {render, RenderPosition, replace} from './../utils/render.js';
import FilterComponent from './../components/filter.js';

const getFilterAmount = (cards, filterType) => {
  const result = cards.filter((card) => card[filterType] === true);

  return result.length;
};

export default class FilterController {
  constructor(container, filmModel) {
    this._container = container;
    this._filmModel = filmModel;
    this._filterComponent = null;
    this._activeFilterType = FilterType.ALL;
    this._onDataChange = this._onDataChange.bind(this);
    this._onFilterChange = this._onFilterChange.bind(this);
    this._filmModel.setDataChangeHandlers(this._onDataChange);
  }

  _onDataChange() {
    this.render();
  }

  _onFilterChange(filterType) {
    this._activeFilterType = filterType;
    this._filmModel.setFilter(filterType);
  }

  render() {
    const filters = Object.values(FilterType).map((filterType) => {
      const count = filterType === FilterType.ALL ? this._filmModel.getFilms().length : getFilterAmount(this._filmModel.getFilms(), filterType);

      return {
        filterType,
        count,
        isActive: this._activeFilterType === filterType,
      };
    });

    const oldFilterComponent = this._filterComponent;
    this._filterComponent = new FilterComponent(filters);
    this._filterComponent.setFilterChangeHandler(this._onFilterChange);

    if (oldFilterComponent) {
      replace(this._filterComponent, oldFilterComponent);
    } else {
      render(this._container, this._filterComponent, RenderPosition.AFTER_BEGIN);
    }
  }
}
