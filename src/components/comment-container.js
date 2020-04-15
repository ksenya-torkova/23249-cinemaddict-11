const createCommentContainer = (card) => {
  const {commentsAmount} = card;

  return (
    `<section class="film-details__comments-wrap">
      <h3 class="film-details__comments-title">${commentsAmount > 1 ? `Comments` : `Comment`} <span class="film-details__comments-count">${commentsAmount}</span></h3>
    </section>`
  );
};

export {createCommentContainer};
