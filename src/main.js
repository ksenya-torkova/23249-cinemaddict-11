import {checkEscKey, getRandomInteger, render} from './utils.js';
import CommentContainerComponent from './components/comment-container.js';
import CommentsListComponent from './components/comments-list.js';
import CommentNewComponent from './components/comment-new.js';
import FilmComponent from './components/film.js';
import FilmDetailsComponent from './components/film-details.js';
import FilmsAllComponent from './components/films-all.js';
import FilmsBoardComponent from './components/films-board.js';
import FilmsCommentedComponent from './components/films-commented.js';
import FilmsRatedComponent from './components/films-rated.js';
import FooterStatisticsComponent from './components/footer-statistics.js';
import LoadMoreComponent from './components/load-more.js';
import MainNavigationComponent from './components/main-navigation.js';
import NoFilmsComponent from './components/no-films.js';
import SortComponent from './components/sort.js';
import UserRaitingComponent from './components/user-raiting.js';
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
const userRank = getUserRank(getRandomInteger(0, 30));
const cards = generateFilmsList(CARDS_AMOUNT);
const filmsBoardComponent = new FilmsBoardComponent();
const filmsAllComponent = new FilmsAllComponent();
const loadMoreComponent = new LoadMoreComponent();

render(siteHeader, new UserRaitingComponent(userRank).getElement());
render(siteMain, new MainNavigationComponent(cards).getElement());
render(siteMain, new SortComponent().getElement());
render(siteMain, filmsBoardComponent.getElement());
render(siteFooter, new FooterStatisticsComponent(cards).getElement());

let showingFilmsAmount = DEFAULT_CARDS_AMOUNT;

const renderFilmPopup = (film, popup) => {
  render(siteBody, popup.getElement());
  const popupComments = popup.getElement().querySelector(`.form-details__bottom-container`);
  render(popupComments, new CommentContainerComponent(film).getElement());
  const comments = popupComments.querySelector(`.film-details__comments-wrap`);
  render(comments, new CommentsListComponent().getElement());
  render(comments, new CommentNewComponent().getElement());
};

const onEscKeyDown = (evt, popup) => {
  const isEscKey = checkEscKey(evt);

  if (isEscKey) {
    closeFilmPopup(popup);
    document.removeEventListener(`keydown`, onEscKeyDown);
  }
};

const openFilmPopup = (film, popup) => {
  renderFilmPopup(film, popup);

  document.addEventListener(`keydown`, (evt) => {
    onEscKeyDown(evt, popup);
  });
};

const closeFilmPopup = (popup) => {
  popup.getElement().remove();
  popup.removeElement();
  document.removeEventListener(`keydown`, onEscKeyDown);
};

const renderFilm = (container, film) => {
  const filmComponent = new FilmComponent(film);
  render(container, filmComponent.getElement());
  const filmDetailsComponent = new FilmDetailsComponent(film);
  const filmCover = filmComponent.getElement().querySelector(`.film-card img`);
  const filmTitle = filmComponent.getElement().querySelector(`.film-card__title`);
  const filmComments = filmComponent.getElement().querySelector(`.film-card__comments`);
  const popupClose = filmDetailsComponent.getElement().querySelector(`.film-details__close-btn`);

  filmCover.addEventListener(`click`, (evt) => {
    openFilmPopup(film, filmDetailsComponent, evt);
  });

  filmTitle.addEventListener(`click`, (evt) => {
    openFilmPopup(film, filmDetailsComponent, evt);
  });

  filmComments.addEventListener(`click`, (evt) => {
    openFilmPopup(film, filmDetailsComponent, evt);
  });

  popupClose.addEventListener(`click`, () => {
    closeFilmPopup(filmDetailsComponent);
  });
};

const renderAllFilms = (container, films) => {
  films.slice(0, showingFilmsAmount)
  .forEach((film) => {
    renderFilm(container, film);
  });
};

const renderFilmsBoard = () => {
  if (cards.length === 0) {
    render(filmsBoardComponent.getElement(), new NoFilmsComponent().getElement());
  } else {
    render(filmsBoardComponent.getElement(), filmsAllComponent.getElement());

    const filmsAllContainer = filmsAllComponent.getElement().querySelector(`.films-list__container`);

    renderAllFilms(filmsAllContainer, cards);
    render(filmsAllComponent.getElement(), loadMoreComponent.getElement());

    loadMoreComponent.getElement().addEventListener(`click`, () => {
      const previousFilmsAmount = showingFilmsAmount;
      showingFilmsAmount += DOWNLOADED_CARDS_AMOUNT;

      cards.slice(previousFilmsAmount, showingFilmsAmount)
      .forEach((card) => {
        renderFilm(filmsAllContainer, card);
      });

      if (showingFilmsAmount >= cards.length) {
        loadMoreComponent.getElement().remove();
        loadMoreComponent.removeElement();
      }
    });
  }
};

renderFilmsBoard();

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
  const filmsRatedComponent = new FilmsRatedComponent();
  const filmsRatedContainer = filmsRatedComponent.getElement().querySelector(`.films-list__container`);

  render(filmsBoardComponent.getElement(), filmsRatedComponent.getElement());
  renderAdditionalFilms(filmsRatedContainer, topRatedFilms);
}

const getMostCommented = (cardsData) => {
  const result = cardsData.slice().sort((a, b) => b.commentsAmount - a.commentsAmount);
  return result.slice(0, ADDITIONAL_CARDS_AMOUNT);
};

const mostCommentedFilms = getMostCommented(cards);

if (mostCommentedFilms) {
  const filmsCommentedComponent = new FilmsCommentedComponent();
  const filmsCommentedContainer = filmsCommentedComponent.getElement().querySelector(`.films-list__container`);

  render(filmsBoardComponent.getElement(), filmsCommentedComponent.getElement());
  renderAdditionalFilms(filmsCommentedContainer, mostCommentedFilms);
}
