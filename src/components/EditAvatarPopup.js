import PopupWithForm from "./PopupWithForm";
import { useRef } from "react";


const EditAvatarPopup = ({ isOpen, onClose, onUpdateAvatar }) => {
  const inputRef = useRef();
  const avatarObj = inputRef.current;

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdateAvatar({
      avatar: avatarObj.value
    })
    setTimeout(() => {
      avatarObj.value = '';
    }, 1000)
  }
  
  return (
    <PopupWithForm
      title="Обновить аватар"
      name="avatar"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      btnText="Обновить"
    >
      <fieldset className="form__fieldset">
        <input
          type="url"
          className="form__input form__input_type-name"
          name="form-name"
          id="avatar"
          placeholder="Ссылка на картинку"
          required
          minLength="2"
          ref={inputRef}
        />
        <span className="form__invalid-message avatar-error"></span>
      </fieldset>
    </PopupWithForm>
  )
}

export default EditAvatarPopup;