const PopupWithForm = ({ title, children, onClose, onSubmit }) => {
  return (
    <div className="popup__container">
      <button
        onClick={onClose}
        type="button"
        aria-label="Закрыть всплывающее окно"
        className="popup__button-escape popup__button-escape_card"
      ></button>
      <h2 className="popup__title">{title}</h2>
      <form name="card-form" className="form form_popup_template" noValidate onSubmit={onSubmit}>
        {children}
        <button
          type="submit"
          id="card-button"
          aria-label="Создать"
          className="form__button"
        >
          Создать
        </button>
      </form>
    </div>
  );
};

export default PopupWithForm;
