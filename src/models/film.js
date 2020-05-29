export default class Film {
  constructor(data) {
    this.actors = data[`film_info`][`actors`];
    this.ageRating = data[`film_info`][`age_rating`];
    this.comments = data[`comments`];
    this.commentsLength = data[`comments`].length;
    this.country = data[`film_info`][`release`][`release_country`];
    this.date = new Date(data[`film_info`][`release`][`date`]) || null;
    this.description = data[`film_info`][`description`] || ``;
    this.director = data[`film_info`][`director`];
    this.duration = data[`film_info`][`runtime`];
    this.genres = data[`film_info`][`genre`];
    this.id = data[`id`];
    this.isFavorites = Boolean(data[`user_details`][`favorite`]);
    this.isHistory = Boolean(data[`user_details`][`already_watched`]);
    this.isWatchlist = Boolean(data[`user_details`][`watchlist`]);
    this.poster = data[`film_info`][`poster`];
    this.raiting = data[`film_info`][`total_rating`];
    this.title = data[`film_info`][`title`];
    this.titleAlternative = data[`film_info`][`alternative_title`];
    this.watchingDate = new Date(data[`user_details`][`watching_date`]);
    this.writers = data[`film_info`][`writers`];
  }

  toRAW() {
    return {
      "id": this.id,
      "comments": this.comments,
      "film_info": {
        "title": this.title,
        "alternative_title": this.titleAlternative,
        "total_rating": this.raiting,
        "poster": this.poster,
        "age_rating": this.ageRating,
        "director": this.director,
        "writers": this.writers,
        "actors": this.actors,
        "release": {
          "date": this.date,
          "release_country": this.country
        },
        "runtime": this.duration,
        "genre": this.genres,
        "description": this.description
      },
      "user_details": {
        "watchlist": this.isWatchlist,
        "already_watched": this.isHistory,
        "watching_date": this.watchingDate,
        "favorite": this.isFavorites
      }
    };
  }

  static clone(data) {
    return new Film(data.toRAW());
  }

  static parseFilm(data) {
    return new Film(data);
  }

  static parseFilms(data) {
    return data.map(Film.parseFilm);
  }
}
