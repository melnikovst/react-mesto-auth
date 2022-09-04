import React, { useEffect, useState } from "react";
import PopupWithForm from "./PopupWithForm";

const AddPlacePopup = ({ isOpen, onClose, onUpdatePlace }) => {
    const [cardName, setCardName] = useState('');
    const [cardPath, setCardPath] = useState('');
    const card = {
        title: cardName,
        link: cardPath,
    }
    console.log(cardPath);
    const handleCardName = (e) => {
        setCardName(e.target.value)
    }

    const handleCardPath = (e) => {
        setCardPath(e.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        onUpdatePlace(card)
        setTimeout(() => {
            onClose()
        }, 500);
    }

    useEffect(() => {
        setCardPath('');
        setCardName('');
    }, [isOpen])

    return (
        <PopupWithForm
            title="Новое место"
            name="card-add"
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSubmit}
            btnText="Создать"
        >
            <fieldset className="form__fieldset">
                <input
                    type="text"
                    className="form__input form__input_type-name"
                    name="form-name"
                    id="title"
                    placeholder="Название"
                    required
                    minLength="2"
                    maxLength="30"
                    onChange={handleCardName}
                    value={cardName}
                />
                <span className="form__invalid-message title-error"></span>
                <input
                    type="url"
                    className="form__input form__input_type-link"
                    name="form-job"
                    id="link"
                    placeholder="Ссылка на картинку"
                    required
                    onChange={handleCardPath}
                    value={cardPath}
                />
                <span className="form__invalid-message link-error"></span>
            </fieldset>
        </PopupWithForm>
    )
}

export default AddPlacePopup;