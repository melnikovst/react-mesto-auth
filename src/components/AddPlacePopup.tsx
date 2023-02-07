import { useEffect, useMemo, FC, ChangeEvent } from 'react';
import PopupWithForm from './PopupWithForm';
import useFormAndValidation from '../utils/useValidation';
import { iDefault } from './App';
import { TCard } from '../utils/api';

interface IAddPlaceProps {
  isOpen: boolean;
  onClose: () => void;
  onUpdatePlace: (item: TCard) => void;
  isAddingLoading: boolean;
  closeByOverlay: (e: any) => void;
}

const AddPlacePopup: FC<IAddPlaceProps> = ({
  isOpen,
  onClose,
  onUpdatePlace,
  isAddingLoading,
  closeByOverlay,
}) => {
  const card = useMemo(() => {
    return {
      title: '',
      link: '',
    };
  }, []);
  const {
    values,
    handleChange,
    errors,
    isValid,
    setValues,
    resetForm,
    handleBlur,
  } = useFormAndValidation();

  const handleSubmit = (e: iDefault) => {
    e.preventDefault();
    onUpdatePlace(values);
  };

  useEffect(() => {
    setValues(card);
    if (!isOpen) {
      resetForm();
    }
  }, [card, isOpen, resetForm, setValues]);

  const handleValidation = (e: ChangeEvent<HTMLInputElement>) => {
    handleChange(e);
    handleBlur(e);
  };

  return (
    <PopupWithForm
      title="Новое место"
      name="card-add"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      btnText={`${isAddingLoading ? 'Грузится...' : 'Создать'}`}
      closeByOverlay={closeByOverlay}
      isValid={isValid}
      onCardDelete={undefined}
    >
      <fieldset className="form__fieldset">
        <input
          type="text"
          className="form__input form__input_type-name"
          name="title"
          id="title"
          placeholder="Название"
          required
          minLength={2}
          maxLength={30}
          onChange={handleValidation}
          value={values.title || ''}
        />
        <span
          className={`form__invalid-message title-error ${
            isValid ? '' : 'form__invalid-message_active'
          }`}
        >
          {errors.title}
        </span>
        <input
          type="url"
          className="form__input form__input_type-link"
          name="link"
          id="link"
          placeholder="Ссылка на картинку"
          required
          onChange={handleValidation}
          value={values.link || ''}
        />
        <span
          className={`form__invalid-message link-error ${
            isValid ? '' : 'form__invalid-message_active'
          }`}
        >
          {errors.link}
        </span>
      </fieldset>
    </PopupWithForm>
  );
};

export default AddPlacePopup;
