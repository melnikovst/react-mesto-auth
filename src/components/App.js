import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';
import { useState } from 'react';

const returnSamePopupsMarkdown = () => {
  return (
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
      <input type="url" className="form__input form__input_type-link" name="form-job" id="link" placeholder="Ссылка на картинку" required />
      <span className="form__invalid-message link-error"></span>
    </fieldset>
  );
};

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});

  const closeAllPopups = () => {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setSelectedCard({});
  };

  const handleCardClick = (object) => {
    setSelectedCard(object);
  };

  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(true);
  };

  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpen(true);
  };

  const handleAddPlaceClick = () => {
    setIsAddPlacePopupOpen(true);
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

        <PopupWithForm title="Редактировать профиль" name="profile-info" isOpen={isEditProfilePopupOpen} onClose={closeAllPopups}>
          {returnSamePopupsMarkdown()}
        </PopupWithForm>
        <PopupWithForm title="Новое место" name="card-add" isOpen={isAddPlacePopupOpen} onClose={closeAllPopups}>
          {returnSamePopupsMarkdown()}
        </PopupWithForm>
        <PopupWithForm title="Обновить аватар" name="avatar" isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups}>
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
        <PopupWithForm title="Вы уверены?" name="submit" />
        <ImagePopup card={selectedCard} onClose={closeAllPopups} />
      </div>
    </div>
  );
}

export default App;
