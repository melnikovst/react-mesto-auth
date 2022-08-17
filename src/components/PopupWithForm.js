const PopupWithForm = ({ title, name, children, isOpen, onClose }) => {
  return (
    <div onClick={onClose} className={`popup popup_type_${name} ${isOpen ? 'popup_opened' : ''}`}>
      <div className="popup__container" onClick={(e) => e.stopPropagation()}>
        <button
          onClick={onClose}
          type="button"
          aria-label="Закрыть всплывающее окно"
          className="popup__button-escape popup__button-escape_card"
        ></button>
        <h2 className="popup__title">{title}</h2>
        <form name="card-form" className="form form_popup_template" noValidate>
          {children}
          <button type="submit" id="card-button" aria-label="Создать" className="form__button">
            Создать
          </button>
        </form>
      </div>
    </div>
  );
};

export default PopupWithForm;
