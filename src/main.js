import {getRandomInteger} from './utils/common.js';
import {STATISTICS_LINK} from './utils/const.js';
import {generateFilmsList} from './mock/film-mock.js';
import {getUserRank} from './mock/user-raiting-mock.js';
import {render, RenderPosition} from './utils/render.js';
import {siteBody, siteMain} from './utils/const.js';
import AllFilmsController from './controllers/all-films-controller.js';
import FilmModel from './models/film-model.js';
import FilmsBoardComponent from './components/films-board.js';
import FilterController from './controllers/filter-controller.js';
import FooterStatisticsComponent from './components/footer-statistics.js';
import MainNavigationComponent from './components/main-navigation.js';
import UserRaitingComponent from './components/user-raiting.js';
import StatisticComponent from "./components/statistics.js";

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

const mainNavigationComponent = new MainNavigationComponent();
render(siteMain, mainNavigationComponent, RenderPosition.AFTER_BEGIN);

const filterContainer = mainNavigationComponent.getElement();
const filterController = new FilterController(filterContainer, filmModel);
filterController.render();

const statisticComponent = new StatisticComponent(filmModel);
render(siteMain, statisticComponent);
statisticComponent.hide();

mainNavigationComponent.setOnViewChange((clickedItem) => {
  switch (clickedItem) {
    case STATISTICS_LINK:
      statisticComponent.show();
      allFilmsController.hide();
      break;

    default:
      statisticComponent.hide();
      allFilmsController.show();
      break;
  }
});
