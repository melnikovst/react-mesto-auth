import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';
import Popup from './Popup';
import { useState } from 'react';

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [isImageOpen, setIsImageOpen] = useState(false);
  //завёл новое состояние для поп-апа картинки, т.к. объект всегда true и проверка ломается
  const closeAllPopups = () => {
    setIsImageOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setSelectedCard({});
  };

  const handleCardClick = (object) => {
    setIsImageOpen(true);
    setSelectedCard(object);
  };

  const handleEditAvatarClick = (e) => {
    setIsEditAvatarPopupOpen(true);
  };

  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpen(true);
  };

  const handleAddPlaceClick = () => {
    setIsAddPlacePopupOpen(true);
  };

  const closeByOverlay = (e) => {
    if (e.target.classList.contains('popup_opened')) {
      closeAllPopups();
    }
  };

  return (
    <div className="App">
      <div className="page">
        <Header />
        <Main
          onEditProfile={handleEditProfileClick}
          onAddPlace={handleAddPlaceClick}
          onEditAvatar={handleEditAvatarClick}
          onCardClick={handleCardClick}
        />
        <Footer />
        <Popup
          name="profile-info"
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          closeByOverlay={closeByOverlay}
        >
          <PopupWithForm
            title="Редактировать профиль"
            name="profile-info"
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopups}
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
              />
              <span className="form__invalid-message title-error"></span>
              <input
                type="url"
                className="form__input form__input_type-link"
                name="form-job"
                id="link"
                placeholder="Ссылка на картинку"
                required
              />
              <span className="form__invalid-message link-error"></span>
            </fieldset>
          </PopupWithForm>
        </Popup>
        <Popup
          name="card-add"
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          closeByOverlay={closeByOverlay}
        >
          <PopupWithForm
            title="Новое место"
            name="card-add"
            isOpen={isAddPlacePopupOpen}
            onClose={closeAllPopups}
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
              />
              <span className="form__invalid-message title-error"></span>
              <input
                type="url"
                className="form__input form__input_type-link"
                name="form-job"
                id="link"
                placeholder="Ссылка на картинку"
                required
              />
              <span className="form__invalid-message link-error"></span>
            </fieldset>
          </PopupWithForm>
        </Popup>
        <Popup
          name="avatar"
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          closeByOverlay={closeByOverlay}
        >
          <PopupWithForm
            title="Обновить аватар"
            name="avatar"
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups}
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
              />
              <span className="form__invalid-message avatar-error"></span>
            </fieldset>
          </PopupWithForm>
        </Popup>
        <Popup
          name="submit"
          onClose={closeAllPopups}
          closeByOverlay={closeByOverlay}
        >
          <PopupWithForm
            title="Вы уверены?"
            name="submit"
            onClose={closeAllPopups}
          />
        </Popup>
        <Popup
          name="picture"
          isOpen={isImageOpen}
          onClose={closeAllPopups}
          closeByOverlay={closeByOverlay}
        >
          <ImagePopup card={selectedCard} onClose={closeAllPopups} />
        </Popup>
      </div>
    </div>
  );
}

export default App;
