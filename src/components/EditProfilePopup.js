import { useContext, useEffect } from "react"
import CurrentUserContext from "../contexts/CurrentUserContext"
import PopupWithForm from "./PopupWithForm"
import useFormAndValidation from '../utils/useValidation'

const EditProfilePopup = ({ isOpen, onClose, onUpdateUser, closeByOverlay }) => {
    const currentUser = useContext(CurrentUserContext)
    const {values, handleChange, errors, isValid, setValues, resetForm, handleBlur} = useFormAndValidation(currentUser)
    
    useEffect(() => {
        setValues(currentUser)
        if(!isOpen) {
           setTimeout(resetForm, 500);
        }
    }, [currentUser, isOpen])

    const handleSubmit = (e) => {
        e.preventDefault();
        onUpdateUser(values)
    }

    const handleValidation = (e) => {
        handleChange(e);
        handleBlur(e);  
    }

    return (
        <PopupWithForm
            title="Редактировать профиль"
            name="profile-info"
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSubmit}
            btnText="Изменить"
            closeByOverlay={closeByOverlay}
            isValid={isValid}
        >
            <fieldset className="form__fieldset">
                <input
                    type="text"
                    className="form__input form__input_type-name"
                    name="name"
                    id="name"
                    placeholder="Ваше имя"
                    required
                    minLength="2"
                    maxLength="30"
                    onChange={handleValidation}
                    value={values.name || ''}
                />
                <span className={`form__invalid-message name-error ${isValid ? '' : 'form__invalid-message_active'}`}>{errors.name}</span>
                <input
                    type="text"
                    className="form__input form__input_type-link"
                    name="about"
                    id="about"
                    placeholder="Ваш род деятельности"
                    minLength="2"
                    required
                    onChange={handleValidation}
                    value={values.about || ''} //нагуглил такое решение, без этого в консоль падает ошибка :)
                />
                <span className={`form__invalid-message about-error ${isValid ? '' : 'form__invalid-message_active'}`}>{errors.about}</span>
            </fieldset>
        </PopupWithForm>
    )
}

export default EditProfilePopup