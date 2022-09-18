import Popup from "./Popup";

const PopupWithForm = ({ title, children, onClose, onSubmit, btnText, name, isOpen, closeByOverlay, isValid }) => {
  return (
    <Popup name={name} onClose={onClose} isOpen={isOpen} closeByOverlay={closeByOverlay} >
    <div className="popup__container">
      <button
        onClick={onClose}
        type="button"
        aria-label="Закрыть всплывающее окно"
        className="popup__button-escape popup__button-escape_card"
      ></button>
      <h2 className="popup__title">{title}</h2>
      <form name={name} className="form form_popup_template" noValidate onSubmit={onSubmit}>
        {children}
        <button
          type="submit"
          id="card-button"
          aria-label="Создать"
          className={`form__button ${isValid === undefined || isValid ? '' : 'form__button_disabled'}`}
        >
          {btnText}
        </button>
      </form>
    </div>
    </Popup>
  );
};

export default PopupWithForm;
