import { Link } from 'react-router-dom';
import logo from '../images/logo-header.svg';

const Header = ({ email, isLogged, onHeaderBtnClick }) => {
  return (
    <header className="header">
      <Link to="/sign-up">
        <img src={logo} alt="Логотип в шапке сайта" className="logo" />
      </Link>
      <div>
        <p style={{ color: 'white' }}>{email}</p>
        <Link to="/">
          <button
            disabled={!isLogged}
            className="header__button"
            onClick={onHeaderBtnClick}
          >
            {isLogged ? 'Выйти' : 'Войти'}
          </button>
        </Link>
      </div>
    </header>
  );
};

export default Header;
