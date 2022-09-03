import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';
import Popup from './Popup';
import EditProfilePopup from './EditProfilePopup';
import CurrentUserContext from '../contexts/CurrentUserContext';
import { server } from '../utils/api'
import { useEffect, useState } from 'react';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [isImageOpen, setIsImageOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState({})
  const [cards, setCards] = useState([]);

  const { _id } = currentUser;

  const handleAddPlaceSubmit = async (obj) => {
    try {
      const resAdding = await server.addCard(obj);
      console.log(resAdding);
      setCards([resAdding, ...cards])
    } catch (error) {
      console.log(error);
    }
  }

  const handleCardLike = async (card) => {
    const isLiked = card.likes.some(i => i._id === _id);
    try {
      const resChangeLikeStatus = await server.changeLikeCardStatus(card, !isLiked);
      setCards((state) => state.map((c) => c._id === card._id ? resChangeLikeStatus : c));
    } catch (error) {
      console.log(error);
    }
  }

  const handleDeleting = async (card) => {
    try {
      await server.deleteCard(card);
      setCards((newArray) => newArray.filter((item) => card._id !== item._id))
    } catch (error) {
      console.log(error);
    }
  }

  const fetchCards = async () => {
    try {
      const resCards = await server.loadCards();
      setCards(resCards);
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    fetchCards();
  }, []);

  const fetchProfile = async () => {
    try {
      const resProfile = await server.loadProfile();
      setCurrentUser(resProfile);
    } catch (e) {
      console.log(e)
    }
  }

  useEffect(() => {
    fetchProfile()
  }, []);

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

  const handleUpdateUser = async (object) => {
    try {
      const resChangingProfile = await server.changeProfile(object);
      setCurrentUser(resChangingProfile)
      closeAllPopups();
    } catch (error) {
      console.log(error);
    }
  }

  const handleUpdateAvatar = async (object) => {
    try {
      const resAvatar = await server.setNewAvatar(object);
      setCurrentUser(resAvatar);
      closeAllPopups();
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="App">
        <div className="page">
          <Header />
          <Main
            onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddPlaceClick}
            onEditAvatar={handleEditAvatarClick}
            onCardClick={handleCardClick}
            cards={cards}
            onCardLike={handleCardLike}
            onCardDelete={handleDeleting}
          />
          <Footer />
          <Popup
            name="profile-info"
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopups}
            closeByOverlay={closeByOverlay}
          >
            <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser} />
          </Popup>
          <Popup
            name="card-add"
            isOpen={isAddPlacePopupOpen}
            onClose={closeAllPopups}
            closeByOverlay={closeByOverlay}
          >
            <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onUpdatePlace={handleAddPlaceSubmit} />
          </Popup>
          <Popup
            name="avatar"
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups}
            closeByOverlay={closeByOverlay}
          >
            <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar} />
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
    </CurrentUserContext.Provider>
  );
}

export default App;
