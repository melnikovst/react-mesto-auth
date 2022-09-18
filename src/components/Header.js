import { Routes, Route, Link } from 'react-router-dom';
import logo from '../images/logo-header.svg';

const Header = ({ email, pathname, setIsInfoPopupOpen, isInfoPopupOpen, onHeaderBtnClick }) => {
  return (
    <header className="header">
        <img src={logo} alt="Логотип в шапке сайта" className="logo" />
        <div className='header__login-container'>
          <p className={`header__email ${pathname !== '/' ? 'header__button_opened' : ''}`}>{email}</p>
          <Routes>
            <Route path='/sign-up' element={<Link to='/sign-in' className={`header__button ${pathname !== '/' ? 'header__button_opened' : ''}`} onClick={onHeaderBtnClick}>
          Войти
          </Link>} />
            <Route path='/sign-in' element={<Link to='/sign-up' className={`header__button ${pathname !== '/' ? 'header__button_opened' : ''}`} onClick={onHeaderBtnClick}>
          Регистрация
          </Link>} />
            <Route path='/' element={<Link to='/sign-in' className={`header__button ${pathname !== '/' ? 'header__button_opened' : ''}`} onClick={onHeaderBtnClick}>
          Выйти
          </Link>} />
          </Routes>
          <div className={`burger ${pathname !== '/' ? 'burger_hidden' : ''}`} onClick={() => setIsInfoPopupOpen(!isInfoPopupOpen)}>
            <span className={`burger__line burger__line_num_one ${isInfoPopupOpen ? 'burger__line_num_one_active' : ''}`}/>
            <span className={`burger__line burger__line_num_two ${isInfoPopupOpen ? 'burger__line_num_two_active' : ''}`}/>
            <span className={`burger__line burger__line_num_three ${isInfoPopupOpen ? 'burger__line_num_three_active' : ''}`}/>
          </div>
        </div>
    </header>
  );
};

export default Header;
