import {createUserRaitingTemplate} from './components/user-raiting.js';
import {createMainNavigationTemplate} from './components/main-navigation.js';
import {createSortTemplate} from './components/sort.js';
import {createFilmsContainerTemplate} from './components/films-container.js';
import {createFooterStatistics} from './components/footer-statistics.js';
import {createLoadMoreTemplate} from './components/load-more.js';
import {createFilmTemplate} from './components/film.js';
import {createFilmDetailsTemplate} from './components/film-details.js';

const CARD_AMOUNT = 5;
const ADDITIONAL_CARD_AMOUNT = 2;

const siteBody = document.querySelector(`body`);
const siteHeader = siteBody.querySelector(`.header`);
const siteMain = siteBody.querySelector(`.main`);
const siteFooter = siteBody.querySelector(`.footer`);

const render = (container, template, place = `beforeend`) => {
  container.insertAdjacentHTML(place, template);
};

render(siteHeader, createUserRaitingTemplate());
render(siteMain, createMainNavigationTemplate());
render(siteMain, createSortTemplate());
render(siteMain, createFilmsContainerTemplate());
render(siteFooter, createFooterStatistics());

const filmsAll = siteMain.querySelector(`.films-list--all`);
const filmsAllContainer = filmsAll.querySelector(`.films-list__container`);
const filmsRatedContainer = siteMain.querySelector(`.films-list--rated .films-list__container`);
const filmsCommentedContainer = siteMain.querySelector(`.films-list--commented .films-list__container`);

render(filmsAll, createLoadMoreTemplate());

for (let i = 0; i < CARD_AMOUNT; i++) {
  render(filmsAllContainer, createFilmTemplate());
}

for (let i = 0; i < ADDITIONAL_CARD_AMOUNT; i++) {
  render(filmsRatedContainer, createFilmTemplate());
}

for (let i = 0; i < ADDITIONAL_CARD_AMOUNT; i++) {
  render(filmsCommentedContainer, createFilmTemplate());
}

render(siteBody, createFilmDetailsTemplate());
