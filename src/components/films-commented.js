import AbstractComponent from './abstract-component.js';

const createFilmsCommentedTemplate = () => {
  return (
    `<section class="films-list  films-list--extra  films-list--commented">
      <h2 class="films-list__title">Most commented</h2>
      <div class="films-list__container">
      </div>
    </section>`
  );
};

export default class FilmsCommented extends AbstractComponent {
  getTemplate() {
    return createFilmsCommentedTemplate();
  }
}
