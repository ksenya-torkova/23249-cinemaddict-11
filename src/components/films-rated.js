import AbstractComponent from './abstract-component.js';

const createFilmsRatedTemplate = () => {
  return (
    `<section class="films-list  films-list--extra  films-list--rated">
      <h2 class="films-list__title">Top rated</h2>
      <div class="films-list__container">
      </div>
    </section>`
  );
};

export default class FilmsRated extends AbstractComponent {
  getTemplate() {
    return createFilmsRatedTemplate();
  }
}
