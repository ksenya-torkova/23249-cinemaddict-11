const createFooterStatistics = (cards) => {
  return (
    `<section class="footer__statistics">
      <p>${cards.length} movies inside</p>
    </section>`
  );
};

export {createFooterStatistics};
