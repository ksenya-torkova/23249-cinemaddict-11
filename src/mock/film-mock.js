import {getRandomInteger, getRandomArrayItem, shuffleArray} from './../utils/common.js';

const MOVIE_NAMES_AMOUNT = 20;

const movies = [];

for (let i = 0; i < MOVIE_NAMES_AMOUNT; i++) {
  movies.push(`film number ${i}`);
}

const posters = [
  `made-for-each-other.png`,
  `popeye-meets-sinbad.png`,
  `sagebrush-trail.jpg`,
  `santa-claus-conquers-the-martians.jpg`,
  `the-dance-of-life.jpg`,
  `the-great-flamarion.jpg`,
  `the-man-with-the-golden-arm.jpg`
];

const genres = [
  `action`,
  `adventure`,
  `animation`,
  `biography`,
  `comedy`,
  `crime`,
  `drama`,
  `family`,
  `fantasy`,
  `history`,
  `horror`,
  `music`,
  `musical`,
  `mystery`,
  `romance`,
  `sci-fi`,
  `sport`,
  `thriller`,
  `war`,
  `western`
];

const people = [
  `Patrick Joshua Wilson`,
  `Hunter Carter Simmons`,
  `Isaac Sean Mitchell`,
  `Christopher Jason Mitchell`,
  `Hunter Michael Peterson`,
  `Molly Rebecca Price`,
  `Allison Emily Alexander`,
  `Jasmine Victoria Harris`,
  `Caroline Melissa King`,
  `Avery Hailey Evans`
];

const countries = [
  `USA`,
  `Russia`,
  `France`,
  `Poland`,
  `Australia`,
  `Germany`,
  `Great Britain`
];

const description = `Lorem ipsum dolor sit amet, consectetur adipiscing elit.
Cras aliquet varius magna, non porta ligula feugiat eget.
Fusce tristique felis at fermentum pharetra.
Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.
Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.
Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.
Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat.
Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.`;

let randomDescription = ``;

const getDescription = (text) => {
  randomDescription = text.split(`. `);

  const length = getRandomInteger(1, 3);

  shuffleArray(randomDescription, length);

  return randomDescription.join(`. `);
};

let today = new Date();

const generateFilm = () => {
  return {
    actors: shuffleArray(people, 3),
    commentsAmount: getRandomInteger(0, 5),
    country: shuffleArray(countries, getRandomInteger(1, 3)),
    day: getRandomInteger(1, 31),
    description: getDescription(description),
    director: getDescription(description).slice(0, 20),
    duration: `${getRandomInteger(0, 5)}h ${getRandomInteger(0, 59)}m`,
    genre: getRandomArrayItem(genres),
    id: String(new Date() + Math.random()),
    isFavorites: Math.random() > 0.5,
    isHistory: Math.random() > 0.5,
    isWatchlist: Math.random() > 0.5,
    month: getRandomInteger(1, 12),
    name: getRandomArrayItem(movies),
    poster: getRandomArrayItem(posters),
    raiting: `${getRandomInteger(1, 10)}.${getRandomInteger(0, 9)}`,
    year: getRandomInteger(1895, today.getFullYear()),
    writers: shuffleArray(people, 2),
  };
};

const generateFilmsList = (amount) => {
  return new Array(amount).fill(``).map(generateFilm);
};

export {generateFilmsList};
