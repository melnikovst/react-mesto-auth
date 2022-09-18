import PopupWithForm from "./PopupWithForm";
import { useEffect, useRef } from "react";
import useFormAndValidation from '../utils/useValidation'

const EditAvatarPopup = ({ isOpen, onClose, onUpdateAvatar, closeByOverlay }) => {
  const obj = {
    avatar: ''
  }

  const {values, handleChange, errors, isValid, setValues, resetForm, handleBlur} = useFormAndValidation(obj)

  useEffect(() => {
    setValues(obj)
    if(!isOpen) {
      setTimeout(resetForm, 500)
    }
  }, [isOpen])

  const handleValidation = (e) => {
    handleChange(e);
    handleBlur(e);  
}

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdateAvatar(values)
  }
  
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
    >
      <fieldset className="form__fieldset">
        <input
          type="url"
          className="form__input form__input_type-name"
          name="avatar"
          id="avatar"
          placeholder="Ссылка на картинку"
          required
          minLength="2"
          onChange={handleValidation}
          value={values.avatar || ''}
        />
        <span className={`form__invalid-message avatar-error ${isValid ? '' : 'form__invalid-message_active'}`}>{errors.avatar}</span>
      </fieldset>
    </PopupWithForm>
  )
}

export default EditAvatarPopup;