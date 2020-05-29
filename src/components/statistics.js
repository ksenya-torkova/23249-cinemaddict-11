import {Tag} from './../utils/const';
import {getUserRank} from './../components/user-raiting';
import {getHistoryFilms} from '../utils/filter';
import Chart from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import AbstractSmartComponent from '../components/abstract-smart-component';

const MINUTES_IN_HOUR = 60;

const Period = {
  ALL: `all-time`,
  TODAY: `today`,
  WEEK: `week`,
  MONTH: `month`,
  YEAR: `year`
};

const getGenres = (films) => {
  let genres = [];

  for (const film of films) {
    genres = genres.concat(film.genres);
  }

  return Array.from(new Set(genres));
};

const getGenreCounter = (films, genres) => {
  const counter = {};

  for (const genre of genres) {
    counter[genre] = 0;
  }

  for (const film of films) {
    film.genres.forEach((item) => {
      counter[item]++;
    });
  }

  return counter;
};

const getFilmsByPeriod = (films, period) => {
  const date = new Date();

  const getFilteredFilms = (limitDate) => {
    return films.filter((item) => item.watchingDate && item.watchingDate.getTime() >= limitDate);
  };

  switch (period) {
    case Period.ALL:
      return films;

    case Period.TODAY:
      return getFilteredFilms(date.setHours(0, 0, 0, 0));

    case Period.WEEK:
      return getFilteredFilms(date.setDate(date.getDate() - 7));

    case Period.MONTH:
      return getFilteredFilms(date.setMonth(date.getMonth() - 1));

    case Period.YEAR:
      return getFilteredFilms(date.setFullYear(date.getFullYear() - 1));

    default:
      return films;
  }
};

const createStatisticksTemplate = (films) => {
  const summaryTime = getFilmsByPeriod(getHistoryFilms(films), Period.ALL).reduce((sum, current) => sum + current.duration, 0);
  const durationHours = Math.floor(summaryTime / MINUTES_IN_HOUR);
  const durationMinutes = Math.round(summaryTime % (durationHours * MINUTES_IN_HOUR));
  const topGenre = Object.entries(getGenreCounter(getFilmsByPeriod(getHistoryFilms(films), Period.ALL), getGenres(getHistoryFilms(films))))
    .sort((a, b) => b[1] - a[1])[0];
  const durationHoursValue = durationHours ? durationHours : `0`;
  const durationMinutesValue = durationMinutes ? durationMinutes : `0`;
  let topGenreValue = ``;

  if (topGenre) {
    topGenreValue = topGenre[1] > 0 ? topGenre[0] : ``;
  }

  return (
    `<section class="statistic">

      ${getHistoryFilms(films).length > 0 ?
      `<p class="statistic__rank">
        Your rank
        <img class="statistic__img" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
        <span class="statistic__rank-label">${getUserRank(getHistoryFilms(films).length)}</span>
      </p>` : ``}

      <form action="https://echo.htmlacademy.ru/" method="get" class="statistic__filters">
        <p class="statistic__filters-description">Show stats:</p>

        <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-all-time" value="all-time" checked>
        <label for="statistic-all-time" class="statistic__filters-label">All time</label>

        <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-today" value="today">
        <label for="statistic-today" class="statistic__filters-label">Today</label>

        <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-week" value="week">
        <label for="statistic-week" class="statistic__filters-label">Week</label>

        <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-month" value="month">
        <label for="statistic-month" class="statistic__filters-label">Month</label>

        <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-year" value="year">
        <label for="statistic-year" class="statistic__filters-label">Year</label>
      </form>

      <ul class="statistic__text-list">
        <li class="statistic__text-item">
          <h4 class="statistic__item-title">You watched</h4>
          <p class="statistic__item-text">${getFilmsByPeriod(getHistoryFilms(films), Period.ALL).length} <span class="statistic__item-description">movies</span></p>
        </li>
        <li class="statistic__text-item">
          <h4 class="statistic__item-title">Total duration</h4>
          <p class="statistic__item-text">${durationHoursValue} <span class="statistic__item-description">h</span> ${durationMinutesValue} <span class="statistic__item-description">m</span></p>
        </li>
        <li class="statistic__text-item">
          <h4 class="statistic__item-title">Top genre</h4>
          <p class="statistic__item-text">${topGenreValue}</p>
        </li>
      </ul>

      <div class="statistic__chart-wrap">
        <canvas class="statistic__chart" width="1000"></canvas>
      </div>

    </section>`
  );
};

export default class Statistic extends AbstractSmartComponent {
  constructor(filmsModel) {
    super();
    this._filmsModel = filmsModel;
    this._films = this._filmsModel.getFilms();
    this._watchedFilms = getHistoryFilms(this._filmsModel.getFilms());
    this._filmsByPeriod = getFilmsByPeriod(this._watchedFilms, Period.ALL);
    this._period = Period.ALL;
    this._genres = getGenres(this._watchedFilms);
    this._onPeriodChange();
  }

  getTemplate() {
    return createStatisticksTemplate(this._films);
  }

  recoveryListeners() {
    this._onPeriodChange();
  }

  show() {
    super.show();
    this._period = Period.ALL;
    this._rerender();
  }

  _renderChart(films) {
    const BAR_HEIGHT = 50;
    const statisticCtx = document.querySelector(`.statistic__chart`);

    statisticCtx.height = BAR_HEIGHT * this._genres.length;

    return new Chart(statisticCtx, {
      plugins: [ChartDataLabels],
      type: `horizontalBar`,
      data: {
        labels: this._genres,
        datasets: [{
          data: Object.values(getGenreCounter(films, this._genres)),
          backgroundColor: `#ffe800`,
          hoverBackgroundColor: `#ffe800`,
          anchor: `start`
        }]
      },
      options: {
        plugins: {
          datalabels: {
            font: {
              size: 20
            },
            color: `#ffffff`,
            anchor: `start`,
            align: `start`,
            offset: 40,
          }
        },
        scales: {
          yAxes: [{
            ticks: {
              fontColor: `#ffffff`,
              padding: 100,
              fontSize: 20
            },
            gridLines: {
              display: false,
              drawBorder: false
            },
            barThickness: 24
          }],
          xAxes: [{
            ticks: {
              display: false,
              beginAtZero: true
            },
            gridLines: {
              display: false,
              drawBorder: false
            },
          }],
        },
        legend: {
          display: false
        },
        tooltips: {
          enabled: false
        }
      }
    });
  }

  _rerender() {
    this._watchedFilms = getHistoryFilms(this._filmsModel.getFilms());
    this._filmsByPeriod = getFilmsByPeriod(this._watchedFilms, this._period);
    super.rerender();
    this.getElement().querySelector(`input[value="${this._period}"]`).checked = true;

    if (this._filmsByPeriod.length > 0) {
      this._renderChart(this._filmsByPeriod);
    }
  }

  _onPeriodChange() {
    this.getElement().querySelector(`.statistic__filters`).addEventListener(`change`, (evt) => {
      if (evt.target.tagName.toLowerCase() !== Tag.INPUT) {
        return;
      }

      this._period = evt.target.value;
      this._rerender();
    });
  }
}
