import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import ImagePopup, { ICardObject } from './ImagePopup';
import Popup from './Popup';
import EditProfilePopup from './EditProfilePopup';
import CurrentUserContext from '../contexts/CurrentUserContext';
import { server, TCard, TProfile } from '../utils/api';
import { useCallback, useEffect, useState } from 'react';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import SubmitDeletingCard from './SubmitDeletingCard';
import {
  Routes,
  Route,
  Navigate,
  useNavigate,
  useLocation,
} from 'react-router-dom';
import Register from '../pages/Register';
import Login from '../pages/Login';
import ProtectedRoute from './ProtectedRoute';
import { login, register, goMain } from '../utils/register.js';
import InfoTooltip from './InfoTooltip';
import InfoPopup from './InfoPopup';

interface TContext {
  _id: string;
}

export interface ievent {
  target: { classList: { contains: (arg0: string) => boolean } };
}

export interface iDefault {
  preventDefault: () => void;
}

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] =
    useState<boolean>(false);
  const [isInfoPopupOpen, setIsInfoPopupOpen] = useState<boolean>(false);
  const [isTooltipOpen, setIsTooltipOpen] = useState<boolean>(false);
  const [isOk, setIsOk] = useState<boolean>(true);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] =
    useState<boolean>(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] =
    useState<boolean>(false);
  const [selectedCard, setSelectedCard] = useState({} as ICardObject);
  const [isImageOpen, setIsImageOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState<Partial<TContext>>({});
  const [cards, setCards] = useState<ICardObject[]>([]);
  const [isAvatarLoading, setIsLoading] = useState(false);
  const [isDeletingPopupOpen, setIsDeletingPopupOpen] = useState(false);
  const [cardDel, setCard] = useState<Partial<TCard>>({});
  const [isDeletedCardLoading, setIsDeletedCardLoading] =
    useState<boolean>(false);
  const [isAddingLoading, setIsAddingLoading] = useState(false);
  const { _id } = currentUser;
  const { pathname } = useLocation();
  const [isLogged, setIsLogged] = useState<boolean>(false);
  const history = useNavigate();
  const goForward = useCallback(() => history('/'), [history]);
  const goOut = useCallback(() => history('/sign-in'), [history]);
  const [profileP, setProfileP] = useState<string>('');

  const openDeletingPopup = (card: TCard): void => {
    setIsDeletingPopupOpen(true);
    setCard(card);
  };

  const handleAddPlaceSubmit = async (obj: TCard): Promise<void> => {
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

  const handleCardLike = async (card: TCard) => {
    const isLiked = card.likes?.some((i) => i._id === _id);
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

  useEffect(() => {
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
    fetchData();
  }, [isLogged]);

  const closeAllPopups = () => {
    setIsImageOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setSelectedCard({
      name: '',
    });
    setIsDeletingPopupOpen(false);
    setIsTooltipOpen(false);
  };

  const handleCardClick = (object: ICardObject) => {
    setIsImageOpen(true);
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

  const closeByOverlay = (e: any) => {
    if (e.target!.classList.contains('popup_opened')) {
      closeAllPopups();
    }
  };

  const handleUpdateUser = async (object: TProfile): Promise<void> => {
    try {
      const resChangingProfile = await server.changeProfile(object);
      setCurrentUser(resChangingProfile);
      closeAllPopups();
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdateAvatar = async (object: TProfile) => {
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

  const handleLogin = async (
    email: string,
    password: string
  ): Promise<void> => {
    try {
      await login(email, password);
      setProfileP(email);
      setIsLogged(true);
      goForward();
    } catch (error) {
      console.log(error);
      setIsTooltipOpen(true);
      setIsOk(false);
    }
  };

  const handleRegister = async (
    email: string,
    password: string
  ): Promise<void> => {
    try {
      await register(email, password);
      setProfileP(email);
      setIsLogged(true);
      goForward();
      setIsOk(true);
      setIsTooltipOpen(true);
    } catch (error) {
      console.log(error);
      setIsTooltipOpen(true);
      setIsOk(false);
    }
  };

  useEffect(() => {
    const checkToken = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const res = await goMain(token);
          if (res.data) {
            setProfileP(res.data.email);
            setIsLogged(true);
            goForward();
          }
        } catch (error) {
          console.log(error);
          goOut();
          setIsLogged(false);
        }
      }
    };
    checkToken();
  }, [goForward, goOut]);

  useEffect(() => {
    if (localStorage.getItem('token')) {
      goForward();
    }
  }, [goForward]);

  const onHeaderBtnClick = (): void => {
    if (pathname === '/') {
      localStorage.removeItem('token');
      goOut();
      setIsLogged(false);
      setProfileP('');
    }
    return;
  };

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="App">
        <div className="page">
          <InfoPopup
            isInfoPopupOpen={isInfoPopupOpen}
            onHeaderBtnClick={onHeaderBtnClick}
            setIsInfoPopupOpen={setIsInfoPopupOpen}
            profileP={profileP}
          />
          <Header
            email={profileP}
            pathname={pathname}
            setIsInfoPopupOpen={setIsInfoPopupOpen}
            isInfoPopupOpen={isInfoPopupOpen}
            onHeaderBtnClick={onHeaderBtnClick}
          />
          <Routes>
            <Route
              path="/sign-up"
              element={<Register handleClick={handleRegister} />}
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
                  openDeletingPopup={openDeletingPopup}
                  isLogged={isLogged}
                  Component={Main}
                />
              }
            />
            <Route
              path="*"
              element={
                isLogged ? <Navigate to="/" /> : <Navigate to="/sign-in" />
              }
            />
          </Routes>
          <Footer />
          <InfoTooltip
            isOpen={isTooltipOpen}
            onClose={closeAllPopups}
            closeByOverlay={closeByOverlay}
            isOk={isOk}
            successText="Вы успешно зарегестрировались"
            failedText="Что-то пошло не так! Попробуйте ещё раз."
          />
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
