import {getRandomInteger, render} from './utils.js';
import CommentContainerComponent from './components/comment-container.js';
import CommentsListComponent from './components/comments-list.js';
import CommentNewComponent from './components/comment-new.js';
import FilmComponent from './components/film.js';
import FilmDetailsComponent from './components/film-details.js';
import FilmsContainerComponent from './components/films-container.js';
import FooterStatisticsComponent from './components/footer-statistics.js';
import LoadMoreComponent from './components/load-more.js';
import MainNavigationComponent from './components/main-navigation.js';
import SortComponent from './components/sort.js';
import UserRaitingComponent from './components/user-raiting.js';
import {generateFilmsList} from './mock/film-mock.js';
import {getUserRank} from './mock/user-raiting-mock.js';

const CARDS_AMOUNT = 14;
const DEFAULT_CARDS_AMOUNT = 5;
// const DOWNLOADED_CARDS_AMOUNT = 5;
const ADDITIONAL_CARDS_AMOUNT = 2;
const siteBody = document.querySelector(`body`);
const siteHeader = siteBody.querySelector(`.header`);
const siteMain = siteBody.querySelector(`.main`);
const siteFooter = siteBody.querySelector(`.footer`);
const userRank = getUserRank(getRandomInteger(0, 30));
const cards = generateFilmsList(CARDS_AMOUNT);
const filmsContainerComponent = new FilmsContainerComponent();
const filmDetailsComponent = new FilmDetailsComponent(cards[0]);
const loadMoreComponent = new LoadMoreComponent();

render(siteHeader, new UserRaitingComponent(userRank).getElement());
render(siteMain, new MainNavigationComponent(cards).getElement());
render(siteMain, new SortComponent().getElement());
render(siteMain, filmsContainerComponent.getElement());
render(siteFooter, new FooterStatisticsComponent(cards).getElement());

const filmsAll = filmsContainerComponent.getElement().querySelector(`.films-list--all`);
const filmsAllContainer = filmsAll.querySelector(`.films-list__container`);
const filmsRatedContainer = filmsContainerComponent.getElement().querySelector(`.films-list--rated .films-list__container`);
const filmsCommentedContainer = filmsContainerComponent.getElement().querySelector(`.films-list--commented .films-list__container`);

render(filmsAll, loadMoreComponent.getElement());

// const loadMoreBtn = loadMoreComponent.getElement().querySelector(`.films-list__show-more`);
let showingFilmsAmount = DEFAULT_CARDS_AMOUNT;

const renderFilm = (container, film) => {
  const filmComponent = new FilmComponent(film);

  render(container, filmComponent.getElement());
};

const renderAllFilms = (container, films) => {
  films.slice(0, showingFilmsAmount)
  .forEach((film) => {
    renderFilm(container, film);
  });
};

// loadMoreBtn.addEventListener(`click`, () => {
//   const previousFilmsAmount = showingFilmsAmount;
//   showingFilmsAmount += DOWNLOADED_CARDS_AMOUNT;

//   cards.slice(previousFilmsAmount, showingFilmsAmount)
//   .forEach((card) => {
//     render(filmsAllContainer, createFilmTemplate(card));
//   });

//   if (showingFilmsAmount >= cards.length) {
//     loadMoreBtn.remove();
//   }
// });

renderAllFilms(filmsAllContainer, cards);

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

const topRatedFilms = getTopRated(cards);

if (topRatedFilms) {
  renderAdditionalFilms(filmsRatedContainer, topRatedFilms);
}

const getMostCommented = (cardsData) => {
  const result = cardsData.slice().sort((a, b) => b.commentsAmount - a.commentsAmount);
  return result.slice(0, ADDITIONAL_CARDS_AMOUNT);
};

const mostCommentedFilms = getMostCommented(cards);

if (mostCommentedFilms) {
  renderAdditionalFilms(filmsCommentedContainer, mostCommentedFilms);
}

render(siteBody, filmDetailsComponent.getElement());

const popupComments = filmDetailsComponent.getElement().querySelector(`.form-details__bottom-container`);

render(popupComments, new CommentContainerComponent(cards[0]).getElement());

const comments = popupComments.querySelector(`.film-details__comments-wrap`);

render(comments, new CommentsListComponent().getElement());
render(comments, new CommentNewComponent().getElement());
