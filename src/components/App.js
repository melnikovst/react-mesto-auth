import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import ImagePopup from './ImagePopup';
import Popup from './Popup';
import EditProfilePopup from './EditProfilePopup';
import CurrentUserContext from '../contexts/CurrentUserContext';
import { server } from '../utils/api';
import { useEffect, useState } from 'react';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import SubmitDeletingCard from './SubmitDeletingCard';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import Home from '../pages/Home';
import Login from '../pages/Login';
import ProtectedRoute from './ProtectedRoute';
import * as login from '../utils/register.js';

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [isImageOpen, setIsImageOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [isAvatarLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [isDeletingPopupOpen, setIsDeletingPopupOpen] = useState(false);
  const [cardDel, setCard] = useState({});
  const [isDeletedCardLoading, setIsDeletedCardLoading] = useState(false);
  const [isAddingLoading, setIsAddingLoading] = useState(false);
  const { _id } = currentUser;

  // АВТОРИЗАЦИЯ
  const [isLogged, setIsLogged] = useState(false);

  const openDeletingPopup = (card) => {
    setIsDeletingPopupOpen(true);
    setCard(card);
  };

  const handleAddPlaceSubmit = async (obj) => {
    setIsAddingLoading(true);
    try {
      const resAdding = await server.addCard(obj);
      setCards([resAdding, ...cards]);
      closeAllPopups();
    } catch (error) {
      console.log(error);
    } finally {
      setTimeout(() => {
        setIsAddingLoading(false);
      }, 500);
    }
  };

  const handleCardLike = async (card) => {
    const isLiked = card.likes.some((i) => i._id === _id);
    try {
      const resChangeLikeStatus = await server.changeLikeCardStatus(
        card,
        !isLiked
      );
      setCards((state) =>
        state.map((c) => (c._id === card._id ? resChangeLikeStatus : c))
      );
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleting = async () => {
    setIsDeletedCardLoading(true);
    try {
      await server.deleteCard(cardDel);
      setCards((newArray) =>
        newArray.filter((item) => cardDel._id !== item._id)
      );
      closeAllPopups();
    } catch (error) {
      console.log(error);
    } finally {
      setTimeout(() => {
        setIsDeletedCardLoading(false);
      }, 500);
    }
  };

  const fetchData = async () => {
    if (isLogged) {
      const [profileObject, cards] = await Promise.all([
        server.loadProfile(),
        server.loadCards(),
      ]);
      setCards(cards);
      setCurrentUser(profileObject);
    }
  };

  console.log(isLogged);

  useEffect(() => {
    fetchData();
  }, [isLogged]);

  const closeAllPopups = () => {
    setIsImageOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setSelectedCard({});
    setIsDeletingPopupOpen(false);
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
      setCurrentUser(resChangingProfile);
      closeAllPopups();
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdateAvatar = async (object) => {
    setIsLoading(true);
    try {
      const resAvatar = await server.setNewAvatar(object);
      setCurrentUser(resAvatar);
      closeAllPopups();
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };
  const history = useNavigate();
  const goForward = () => history('/');
  const goOut = () => history('/sign-in');

  const [profileP, setProfileP] = useState('');

  const checkToken = async () => {
    const token = localStorage.getItem('token');
    console.log(token);
    if (token) {
      try {
        const res = await login.goMain(token);
        if (res.data) {
          setProfileP(res.data.email);
          setIsLogged(true);
          goForward();
        }
        console.log(res.data);
      } catch (error) {
        console.log(error);
        goOut();
        setIsLogged(false);
      }
    }
  };
  console.log(profileP);
  const handleLogin = async (email, password) => {
    await login.login(email, password);
    setProfileP(email);
    setIsLogged(true);
    goForward();
  };
  
  const handleRegister = async (email, password) => {
    await login.register(email, password);
    setProfileP(email);
    setIsLogged(true);
    goForward();
  };

  useEffect(() => {
    checkToken();
  }, []);

  const onHeaderBtnClick = () => {
    localStorage.removeItem('token');
    goOut();
    setIsLogged(false);
    setProfileP('');
  };

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="App">
        <div className="page">
          <Header
            email={profileP}
            isLogged={isLogged}
            onHeaderBtnClick={onHeaderBtnClick}
          />
          <Routes>
            <Route
              path="/sign-up"
              element={<Home handleClick={handleRegister} />}
            />
            <Route
              path="/sign-in"
              element={<Login handleClick={handleLogin} />}
            />
            <Route
              path="/"
              element={
                <ProtectedRoute
                  onEditProfile={handleEditProfileClick}
                  onAddPlace={handleAddPlaceClick}
                  onEditAvatar={handleEditAvatarClick}
                  onCardClick={handleCardClick}
                  cards={cards}
                  onCardLike={handleCardLike}
                  onCardDelete={handleDeleting}
                  isLoading={isAvatarLoading}
                  error={error}
                  openDeletingPopup={openDeletingPopup}
                  isLogged={isLogged}
                  Component={Main}
                />
              }
            />
            <Route
              path="*"
              element={
                isLogged ? <Navigate to="/main" /> : <Navigate to="/sign-in" />
              }
            />
          </Routes>
          <Footer />
          <EditProfilePopup
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopups}
            onUpdateUser={handleUpdateUser}
            closeByOverlay={closeByOverlay}
          />
          <AddPlacePopup
            isOpen={isAddPlacePopupOpen}
            onClose={closeAllPopups}
            onUpdatePlace={handleAddPlaceSubmit}
            isAddingLoading={isAddingLoading}
            closeByOverlay={closeByOverlay}
          />
          <EditAvatarPopup
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups}
            onUpdateAvatar={handleUpdateAvatar}
            closeByOverlay={closeByOverlay}
          />
          <SubmitDeletingCard
            onClose={closeAllPopups}
            onOpenDeleting={openDeletingPopup}
            onCardDelete={handleDeleting}
            isDeletedCardLoading={isDeletedCardLoading}
            closeByOverlay={closeByOverlay}
            isOpen={isDeletingPopupOpen}
          />
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
