import AbstractComponent from './abstract-component';

const createFilmsAllTemplate = () => {
  return (
    `<section class="films-list  films-list--all">
      <h2 class="films-list__title visually-hidden">All movies. Upcoming</h2>
      <div class="films-list__container">
      </div>
    </section>`
  );
};

export default class FilmsAll extends AbstractComponent {
  getTemplate() {
    return createFilmsAllTemplate();
  }
}
