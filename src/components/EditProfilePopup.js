import { useContext, useEffect, useState } from "react"
import CurrentUserContext from "../contexts/CurrentUserContext"
import PopupWithForm from "./PopupWithForm"

const EditProfilePopup = ({ isOpen, onClose, onUpdateUser }) => {
    const currentUser = useContext(CurrentUserContext)
    const {name, about} = currentUser;
    const [profileName, setName] = useState('');
    const [description, setDescription] = useState('');
    const profile = {
        name: profileName,
        about: description,
    }
    
    useEffect(() => {
        setName(name)
        setDescription(about)
    }, [currentUser])

    const handleNameInput = (e) => {
        setName(e.target.value);
    }

    const handleAboutInput = (e) => {
        setDescription(e.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        onUpdateUser(profile)
    }

    return (
        <PopupWithForm
            title="Редактировать профиль"
            name="profile-info"
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSubmit}
            btnText="Изменить"
        >
            <fieldset className="form__fieldset">
                <input
                    type="text"
                    className="form__input form__input_type-name"
                    name="form-name"
                    id="title"
                    placeholder="Ваше имя"
                    required
                    minLength="2"
                    maxLength="30"
                    onChange={handleNameInput}
                    defaultValue={profileName}
                />
                <span className="form__invalid-message title-error"></span>
                <input
                    type="url"
                    className="form__input form__input_type-link"
                    name="form-job"
                    id="link"
                    placeholder="Ваш род деятельности"
                    required
                    onChange={handleAboutInput}
                    defaultValue={description}
                />
                <span className="form__invalid-message link-error"></span>
            </fieldset>
        </PopupWithForm>
    )
}

export default EditProfilePopup