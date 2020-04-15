import {getRandomInteger} from './utils.js';
import {createUserRaitingTemplate} from './components/user-raiting.js';
import {createMainNavigationTemplate} from './components/main-navigation.js';
import {createSortTemplate} from './components/sort.js';
import {createFilmsContainerTemplate} from './components/films-container.js';
import {createFooterStatistics} from './components/footer-statistics.js';
import {createLoadMoreTemplate} from './components/load-more.js';
import {createFilmTemplate} from './components/film.js';
import {createFilmDetailsTemplate} from './components/film-details.js';
import {createCommentContainer} from './components/comment-container.js';
import {createCommentsList} from './components/comments-list.js';
import {createCommentNew} from './components/comment-new.js';
import {generateFilmsList} from './mock/film-mock.js';
import {getUserRank} from './mock/user-raiting-mock.js';

const CARDS_AMOUNT = 14;
const DEFAULT_CARDS_AMOUNT = 5;
const DOWNLOADED_CARDS_AMOUNT = 5;
const ADDITIONAL_CARDS_AMOUNT = 2;

const siteBody = document.querySelector(`body`);
const siteHeader = siteBody.querySelector(`.header`);
const siteMain = siteBody.querySelector(`.main`);
const siteFooter = siteBody.querySelector(`.footer`);

const render = (container, template, place = `beforeend`) => {
  container.insertAdjacentHTML(place, template);
};

const userRank = getUserRank(getRandomInteger(0, 30));
const cards = generateFilmsList(CARDS_AMOUNT);

render(siteHeader, createUserRaitingTemplate(userRank));
render(siteMain, createMainNavigationTemplate(cards));
render(siteMain, createSortTemplate());
render(siteMain, createFilmsContainerTemplate());
render(siteFooter, createFooterStatistics(cards));

const filmsAll = siteMain.querySelector(`.films-list--all`);
const filmsAllContainer = filmsAll.querySelector(`.films-list__container`);
const filmsRatedContainer = siteMain.querySelector(`.films-list--rated .films-list__container`);
const filmsCommentedContainer = siteMain.querySelector(`.films-list--commented .films-list__container`);

render(filmsAll, createLoadMoreTemplate());

let showingFilmsAmount = DEFAULT_CARDS_AMOUNT;

cards.slice(0, showingFilmsAmount)
  .forEach((card) => {
    render(filmsAllContainer, createFilmTemplate(card));
  });

const loadMoreBtn = filmsAll.querySelector(`.films-list__show-more`);

loadMoreBtn.addEventListener(`click`, () => {
  const previousFilmsAmount = showingFilmsAmount;
  showingFilmsAmount += DOWNLOADED_CARDS_AMOUNT;

  cards.slice(previousFilmsAmount, showingFilmsAmount)
  .forEach((card) => {
    render(filmsAllContainer, createFilmTemplate(card));
  });

  if (showingFilmsAmount >= cards.length) {
    loadMoreBtn.remove();
  }
});

const getTopRated = (cardsData) => {
  const result = cardsData.sort((a, b) => b.raiting - a.raiting);
  return result.slice(0, 2);
};

const topRatedFilms = getTopRated(cards);

if (topRatedFilms) {
  cards.slice(0, ADDITIONAL_CARDS_AMOUNT)
    .forEach((card) => {
      render(filmsRatedContainer, createFilmTemplate(card));
    });
}

const getMostCommented = (cardsData) => {
  const result = cardsData.sort((a, b) => b.commentsAmount - a.commentsAmount);
  return result.slice(0, 2);
};

const mostCommentedFilms = getMostCommented(cards);

if (mostCommentedFilms) {
  cards.slice(0, ADDITIONAL_CARDS_AMOUNT)
    .forEach((card) => {
      render(filmsCommentedContainer, createFilmTemplate(card));
    });
}

render(siteBody, createFilmDetailsTemplate(cards[0]));

const popupComments = siteBody.querySelector(`.form-details__bottom-container`);

render(popupComments, createCommentContainer(cards[0]));

const comments = popupComments.querySelector(`.film-details__comments-wrap`);

render(comments, createCommentsList());
render(comments, createCommentNew());
