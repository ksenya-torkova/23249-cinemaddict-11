const createFilmsContainerTemplate = () => {
  return (
    `<section class="films">
      <section class="films-list  films-list--all">
        <h2 class="films-list__title visually-hidden">All movies. Upcoming</h2>
        <div class="films-list__container">
        </div>
      </section>
      <section class="films-list  films-list--extra  films-list--rated">
        <h2 class="films-list__title">Top rated</h2>
        <div class="films-list__container">
        </div>
      </section>
      <section class="films-list  films-list--extra  films-list--commented">
        <h2 class="films-list__title">Most commented</h2>
        <div class="films-list__container">
        </div>
      </section>
    </section>`
  );
};

export {createFilmsContainerTemplate};
