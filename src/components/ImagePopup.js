const ImagePopup = ({ card, onClose }) => {
  const isOpen = () => (Object.keys(card).length !== 0 ? 'popup_opened' : '');

  const handleClosing = () => {
    return Object.keys(card).length !== 0 ? (
      <figure className="popup__image">
        <img src={card.link} alt="АЛЬТ" className="popup__image-item" onClick={(e) => e.stopPropagation()} />
        <figcaption className="popup__image-subtitle">{card.name}</figcaption>
        <button className="popup__button-escape popup__button-escape_image"></button>
      </figure>
    ) : null;
  };
  // Добавил условный рендеринг, т.к. объект зануляется быстрее, чем происходит анимация закрытия, и видно кнопку закрытия
  // и пустую картинку, некрасиво :)

  return (
    <div onClick={onClose} id="img-Template" className={`popup popup_type_picture ${isOpen()}`}>
      {handleClosing()}
    </div>
  );
};

export default ImagePopup;
