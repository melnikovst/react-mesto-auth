import PopupWithForm from './PopupWithForm';
import { ChangeEvent, useEffect, useMemo } from 'react';
import useFormAndValidation from '../utils/useValidation';
import { TProfile } from '../utils/api';
import { iDefault } from './App';

const EditAvatarPopup: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  onUpdateAvatar: (object: TProfile) => void;
  closeByOverlay: (e: React.MouseEvent<HTMLDivElement>) => void;
  onCardDelete: (e: iDefault) => void;
}> = ({ isOpen, onClose, onUpdateAvatar, closeByOverlay, onCardDelete }) => {
  const obj = useMemo(() => {
    return {
      avatar: '',
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

  useEffect(() => {
    setValues(obj);
    if (!isOpen) {
      setTimeout(resetForm, 500);
    }
  }, [isOpen, obj, resetForm, setValues]);

  const handleValidation = (e: ChangeEvent<HTMLInputElement>) => {
    handleChange(e);
    handleBlur(e);
  };

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    onUpdateAvatar(values);
  };

  return (
    <PopupWithForm
      title="Обновить аватар"
      name="avatar"
      id="avatar"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      btnText="Обновить"
      closeByOverlay={closeByOverlay}
      isValid={isValid}
      onCardDelete={onCardDelete}
    >
      <fieldset className="form__fieldset">
        <input
          type="url"
          className="form__input form__input_type-name"
          name="avatar"
          id="avatar"
          placeholder="Ссылка на картинку"
          required
          minLength={2}
          onChange={handleValidation}
          value={values.avatar || ''}
        />
        <span
          className={`form__invalid-message avatar-error ${
            isValid ? '' : 'form__invalid-message_active'
          }`}
        >
          {errors.avatar}
        </span>
      </fieldset>
    </PopupWithForm>
  );
};

export default EditAvatarPopup;
