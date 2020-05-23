import FilmModel from './models/film-model';
import CommentModel from './models/comment-model';

const Method = {
  DELETE: `DELETE`,
  GET: `GET`,
  POST: `POST`,
  PUT: `PUT`,
};

const checkStatus = (response) => {
  if (response.status >= 200 && response.status < 300) {
    return response;
  } else {
    throw new Error(`${response.status}: ${response.statusText}`);
  }
};

const API = class {
  constructor(authorization, endPoint) {
    this._authorization = authorization;
    this._endPoint = endPoint;
  }

  getComments(id) {
    return this._load({
      url: `comments/${id}`,
    })

    .then((response) => response.json())
    .then(CommentModel.parseComments);
  }

  getFilms() {
    return this._load({
      url: `movies`,
    })

    .then((response) => response.json())
    .then(FilmModel.parseFilms);
  }

  _load({url, method = Method.GET, body = null, headers = new Headers()}) {
    headers.append(`Authorization`, this._authorization);

    return fetch(`${this._endPoint}/${url}`, {method, body, headers})
      .then(checkStatus)
      .catch((error) => {
        throw error;
      });
  }

  updateFilm(id, data) {
    return this._load({
      url: `movies/${id}`,
      method: Method.PUT,
      body: JSON.stringify(data.toRAW()),
      headers: new Headers({"Content-Type": `application/json`}),
    })

    .then((response) => response.json())
    .then(FilmModel.parseFilm);
  }
};

export default API;
