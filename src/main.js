import {STATISTICS_LINK, siteBody, siteMain} from './utils/const';
import {getWatchedFilms} from './utils/filter';
import {render, RenderPosition} from './utils/render';
import AllFilmsController from './controllers/all-films-controller';
import API from './api';
import CommentsModel from './models/comments-model';
import FilmsModel from './models/films-model';
import FilmsBoardComponent from './components/films-board';
import FilterController from './controllers/filter-controller';
import FooterStatisticsComponent from './components/footer-statistics';
import MainNavigationComponent from './components/main-navigation';
import UserRaitingComponent, {getUserRank} from './components/user-raiting';
import StatisticComponent from './components/statistics';

const AUTHORIZATION = `Basic dsLkewj0hE345i3r;`;
const END_POINT = `https://11.ecmascript.pages.academy/cinemaddict`;
const siteHeader = siteBody.querySelector(`.header`);
const siteFooter = siteBody.querySelector(`.footer`);
const filmsBoardComponent = new FilmsBoardComponent();
const api = new API(AUTHORIZATION, END_POINT);
const commentsModel = new CommentsModel();
const filmsModel = new FilmsModel();
const allFilmsController = new AllFilmsController(filmsBoardComponent, filmsModel, commentsModel, api);
const mainNavigationComponent = new MainNavigationComponent();
const filterContainer = mainNavigationComponent.getElement();
const filterController = new FilterController(filterContainer, filmsModel);
let statisticComponent = null;

render(siteMain, filmsBoardComponent);
render(siteMain, mainNavigationComponent, RenderPosition.AFTER_BEGIN);

api.getFilms()
  .then((films) => {
    filmsModel.setFilms(films);
    render(siteFooter, new FooterStatisticsComponent(films));
    return Promise.all(films.map((film) => api.getComments(film.id)));
  })

  .then((comments) => {
    const films = filmsModel.getFiltredFilms();

    for (let i = 0; i < films.length; i++) {
      commentsModel.setComments(films[i].id, comments[i]);
    }
  })

  .catch(() => {
    filmsModel.setFilms([]);
  })

  .finally(() => {
    allFilmsController.render();
    filterController.render();
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
