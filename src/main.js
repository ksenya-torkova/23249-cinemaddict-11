import {STATISTICS_LINK} from './utils/const.js';
import {getWatchedFilms} from './utils/filter';
import {render, RenderPosition} from './utils/render.js';
import {siteBody, siteMain} from './utils/const.js';
import AllFilmsController from './controllers/all-films-controller.js';
import API from './api';
import FilmsModel from './models/films-model.js';
import FilmsBoardComponent from './components/films-board.js';
import FilterController from './controllers/filter-controller.js';
import FooterStatisticsComponent from './components/footer-statistics.js';
import MainNavigationComponent from './components/main-navigation.js';
import UserRaitingComponent, {getUserRank} from './components/user-raiting.js';
import StatisticComponent from "./components/statistics.js";

const AUTHORIZATION = `Basic dslkewj0hWE345i33r;`;
const END_POINT = `https://11.ecmascript.pages.academy/cinemaddict/`;
const siteHeader = siteBody.querySelector(`.header`);
const siteFooter = siteBody.querySelector(`.footer`);
const filmsBoardComponent = new FilmsBoardComponent();
const api = new API(AUTHORIZATION, END_POINT);
const filmsModel = new FilmsModel();
const allFilmsController = new AllFilmsController(filmsBoardComponent, filmsModel, api);
const mainNavigationComponent = new MainNavigationComponent();
const filterContainer = mainNavigationComponent.getElement();
const filterController = new FilterController(filterContainer, filmsModel);
let statisticComponent = null;

render(siteMain, filmsBoardComponent);
render(siteMain, mainNavigationComponent, RenderPosition.AFTER_BEGIN);

api.getFilms()
  .then((films) => {
    filmsModel.setFilms(films);
    allFilmsController.render();
    filterController.render();
    render(siteFooter, new FooterStatisticsComponent(films));
    statisticComponent = new StatisticComponent(filmsModel);
    render(siteMain, statisticComponent);
    statisticComponent.hide();
    const watchedFilms = getWatchedFilms(filmsModel.getFilms());
    const userRank = getUserRank(watchedFilms.length);
    render(siteHeader, new UserRaitingComponent(userRank));
  });

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
