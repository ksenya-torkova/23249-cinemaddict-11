import {getRandomInteger} from './utils/common.js';
import {siteBody, siteMain} from './utils/const.js';
import {render, RenderPosition} from './utils/render.js';
import FilmsBoardComponent from './components/films-board.js';
import FooterStatisticsComponent from './components/footer-statistics.js';
import MainNavigationComponent from './components/main-navigation.js';
import UserRaitingComponent from './components/user-raiting.js';
import {generateFilmsList} from './mock/film-mock.js';
import {getUserRank} from './mock/user-raiting-mock.js';
import AllFilmsController from './controllers/all-films-controller.js';

const CARDS_AMOUNT = 14;
const siteHeader = siteBody.querySelector(`.header`);
const siteFooter = siteBody.querySelector(`.footer`);
const userRank = getUserRank(getRandomInteger(0, 30));
const cards = generateFilmsList(CARDS_AMOUNT);
const filmsBoardComponent = new FilmsBoardComponent();

render(siteHeader, new UserRaitingComponent(userRank));
render(siteMain, filmsBoardComponent);
render(siteFooter, new FooterStatisticsComponent(cards));

new AllFilmsController(filmsBoardComponent).render(cards);

render(siteMain, new MainNavigationComponent(cards), RenderPosition.AFTER_BEGIN);
