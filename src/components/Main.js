import updateProfileInfoBtn from '../images/Vector.svg';
import addCardBtn from '../images/Vector2.svg';
import Card from './Card';
import Error from './Error';
import Loader from './Loader';
import { server } from '../utils/api';
import { useState } from 'react';
import { useEffect } from 'react';

const Main = ({ onEditProfile, onAddPlace, onEditAvatar, onCardClick }) => {
  const [userName, setUserName] = useState('');
  const [userDesciption, setUserDescription] = useState('');
  const [userAvatar, setUserAvatar] = useState('');
  const [error, setError] = useState(false); //обрабатываю ошибку в промисах, если true - запускается анимация сообщения об ошибке
  const [cards, setCards] = useState([]);

  const fetchData = async () => {
    try {
      const resProfileInfo = await server.loadProfile();
      const resLoadCards = await server.loadCards();
      setUserAvatar(resProfileInfo.avatar);
      setUserDescription(resProfileInfo.about);
      setUserName(resProfileInfo.name);
      setCards(resLoadCards);
    } catch (error) {
      setError(true);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // сделал 2 дополнительных компонента для лоадера/ошибки, чтобы не перегружать разметкой, плохо читается
  // разметка в Error.js, Loader.js
  if (error) {
    return <Error />;
  }

  if ((userAvatar.length || userDesciption.length || userName.length) === 0) {
    return <Loader />;
  }

  return (
    <main className="content">
      <section className="profile">
        <div className="profile__wrapper">
          <div onClick={onEditAvatar} className="profile__avatar-container">
            <div className="spinner"></div>
            <img src={userAvatar} alt="Что-то пошло не так :(" className="profile__image" />
            <div className="profile__substrate"></div>
          </div>
          <div className="profile__text-wrapper">
            <div className="profile__title-container">
              <h1 className="profile__title">{userName}</h1>
              <button type="button" aria-label="Редактировать профиль" className="profile__title-button" onClick={onEditProfile}>
                <img src={updateProfileInfoBtn} alt="Кнопка Редактировать" className="profile__title-button-vector" />
              </button>
            </div>
            <p className="profile__subtitle">{userDesciption}</p>
          </div>
          <button type="button" aria-label="Добавить" className="profile__button" onClick={onAddPlace}>
            <img src={addCardBtn} alt="Кнопка профиля" className="profile__button-vector" />
          </button>
        </div>
      </section>
      <section className="cards">
        {cards.map((card) => {
          return <Card onCardClick={onCardClick} key={card._id} card={card} />;
        })}
      </section>
    </main>
  );
};

export default Main;
