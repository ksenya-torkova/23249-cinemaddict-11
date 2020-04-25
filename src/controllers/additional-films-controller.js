import {render, renderFilm} from './../utils/render.js';
import FilmsCommentedComponent from './../components/films-commented.js';
import FilmsRatedComponent from './../components/films-rated.js';

const ADDITIONAL_CARDS_AMOUNT = 2;

const renderAdditionalFilms = (container, films) => {
  films.slice(0, ADDITIONAL_CARDS_AMOUNT)
  .forEach((film) => {
    renderFilm(container, film);
  });
};

const getTopRated = (cardsData) => {
  const result = cardsData.slice().sort((a, b) => b.raiting - a.raiting);
  return result.slice(0, ADDITIONAL_CARDS_AMOUNT);
};

const getMostCommented = (cardsData) => {
  const result = cardsData.slice().sort((a, b) => b.commentsAmount - a.commentsAmount);
  return result.slice(0, ADDITIONAL_CARDS_AMOUNT);
};

export default class AdditionalFilmsController {
  constructor(container) {
    this._container = container;
    this._filmsRatedComponent = new FilmsRatedComponent();
    this._filmsCommentedComponent = new FilmsCommentedComponent();
  }

  render(cards) {
    if (cards.length === 0) {
      return;
    } else {
      const topRatedFilms = getTopRated(cards);
      const mostCommentedFilms = getMostCommented(cards);

      if (topRatedFilms) {
        const filmsRatedContainer = this._filmsRatedComponent.getElement().querySelector(`.films-list__container`);

        render(this._container.getElement(), this._filmsRatedComponent);
        renderAdditionalFilms(filmsRatedContainer, topRatedFilms);
      }

      if (mostCommentedFilms) {
        const filmsCommentedContainer = this._filmsCommentedComponent.getElement().querySelector(`.films-list__container`);

        render(this._container.getElement(), this._filmsCommentedComponent);
        renderAdditionalFilms(filmsCommentedContainer, mostCommentedFilms);
      }
    }
  }
}
