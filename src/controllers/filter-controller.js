import {FilterType} from './../utils/const';
import {render, RenderPosition, replace} from './../utils/render';
import FilterComponent from './../components/filter';

const getFilterAmount = (cards, filterType) => {
  const result = cards.filter((card) => card[filterType] === true);

  return result.length;
};

export default class FilterController {
  constructor(container, filmsModel) {
    this._container = container;
    this._filmsModel = filmsModel;
    this._filterComponent = null;
    this._activeFilterType = FilterType.ALL;
    this._onDataChange = this._onDataChange.bind(this);
    this._onFilterChange = this._onFilterChange.bind(this);
    this._filmsModel.setDataChangeHandlers(this._onDataChange);
  }

  _onDataChange() {
    this.render();
  }

  _onFilterChange(filterType) {
    this._activeFilterType = filterType;
    this._filmsModel.setFilter(filterType);
  }

  render() {
    const filters = Object.values(FilterType).map((filterType) => {
      const count = filterType === FilterType.ALL ? this._filmsModel.getFilms().length : getFilterAmount(this._filmsModel.getFilms(), filterType);

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
