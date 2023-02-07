import { ReactNode } from 'react';
import Popup from './Popup';
import { ISubmitDeletingProps } from './SubmitDeletingCard';

interface IPopupWithFormProps extends ISubmitDeletingProps {
  title: string;
  isValid?: boolean;
  name: string;
  onSubmit: (e: { preventDefault: () => void }) => void;
  btnText: string;
  children?: ReactNode;
  id?: string;
}

const PopupWithForm: React.FC<IPopupWithFormProps> = ({
  title,
  children,
  onClose,
  onSubmit,
  btnText,
  name,
  isOpen,
  closeByOverlay,
  isValid,
}) => {
  return (
    <Popup
      name={name}
      onClose={onClose}
      isOpen={isOpen}
      closeByOverlay={closeByOverlay}
    >
      <div className="popup__container">
        <button
          onClick={onClose}
          type="button"
          aria-label="Закрыть всплывающее окно"
          className="popup__button-escape popup__button-escape_card"
        ></button>
        <h2 className="popup__title">{title}</h2>
        <form
          name={title}
          className="form form_popup_template"
          noValidate
          onSubmit={onSubmit}
        >
          {children}
          <button
            type="submit"
            id={Math.random().toString()}
            aria-label="Создать"
            className={`form__button ${
              isValid === undefined || isValid ? '' : 'form__button_disabled'
            }`}
          >
            {btnText}
          </button>
        </form>
      </div>
    </Popup>
  );
};

export default PopupWithForm;
