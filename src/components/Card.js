const Card = ({ card, onCardClick }) => {
  const handleClick = () => {
    onCardClick(card);
  };
  return (
    <article className="card">
      <button className="card__delete-button"></button>
      <img src={card.link} alt="Изображение в карточке" className="card__image" onClick={handleClick} />
      <div className="card__title-wrapper">
        <h2 className="card__title">{card.name}</h2>
        <div className="card__likes_container_wrapper">
          <button type="button" aria-label="Лайк" className="card__button"></button>
          <p className="card__like_amount">{card.likes.length}</p>
        </div>
      </div>
    </article>
  );
};

export default Card;
