import AbstractComponent from './abstract-component';

const createFilmsLoadingTemplate = () => {
  return (
    `<section class="films-list">
      <h2 class="films-list__title">Loading...</h2>
    </section>`
  );
};

export default class FilmsLoading extends AbstractComponent {
  getTemplate() {
    return createFilmsLoadingTemplate();
  }
}
