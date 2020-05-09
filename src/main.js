import {getRandomInteger} from './utils/common.js';
import {generateFilmsList} from './mock/film-mock.js';
import {getUserRank} from './mock/user-raiting-mock.js';
import {render, RenderPosition} from './utils/render.js';
import {siteBody, siteMain} from './utils/const.js';
import AllFilmsController from './controllers/all-films-controller.js';
import FilmModel from './models/film-model.js';
import FilmsBoardComponent from './components/films-board.js';
import FooterStatisticsComponent from './components/footer-statistics.js';
import MainNavigationComponent from './components/main-navigation.js';
import UserRaitingComponent from './components/user-raiting.js';

const CARDS_AMOUNT = 14;
const siteHeader = siteBody.querySelector(`.header`);
const siteFooter = siteBody.querySelector(`.footer`);
const userRank = getUserRank(getRandomInteger(0, 30));
const cards = generateFilmsList(CARDS_AMOUNT);
const filmsBoardComponent = new FilmsBoardComponent();
const filmModel = new FilmModel();
filmModel.setFilms(cards);
const allFilmsController = new AllFilmsController(filmsBoardComponent, filmModel);
allFilmsController.render();

render(siteHeader, new UserRaitingComponent(userRank));
render(siteMain, filmsBoardComponent);
render(siteFooter, new FooterStatisticsComponent(cards));
render(siteMain, new MainNavigationComponent(cards), RenderPosition.AFTER_BEGIN);
