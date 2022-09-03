const hidden = {
  display: 'none'
}

const Card = ({ card, onCardClick, user, onCardLike, onCardDelete }) => {

  const isOwn = card.owner._id !== user._id;
  
  const isLiked = card.likes.some(i => i._id === user._id);

  const likeBtnClasses = `card__button ${isLiked ? 'card__button_active' : ''}`

  const handleClick = () => {
    onCardClick(card);
  };
  
  const handleLikeClick = () => {
    onCardLike(card);
  }

  const handleDeleteClick = () => {
    onCardDelete(card);
  }

  return (
    <article className="card">
      <button className="card__delete-button" style={isOwn ? hidden : null} onClick={handleDeleteClick} ></button>
      <img src={card.link} alt="Изображение в карточке" className="card__image" onClick={handleClick} />
      <div className="card__title-wrapper">
        <h2 className="card__title">{card.name}</h2>
        <div className="card__likes_container_wrapper">
          <button type="button" aria-label="Лайк" className={likeBtnClasses} onClick={handleLikeClick} ></button>
          <p className="card__like_amount">{card.likes.length}</p>
        </div>
      </div>
    </article>
  );
};

export default Card;
