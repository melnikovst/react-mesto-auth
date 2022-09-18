import { Link } from 'react-router-dom';
import useFormAndValidation from '../utils/useValidation'
import { useEffect } from 'react';


const Register = ({ handleClick }) => {
  const onRegister = {
    regEmail: '',
    regPassword: ''
  }

  const {values, handleChange, errors, isValid, setValues, handleBlur} = useFormAndValidation(onRegister)

  useEffect(() => {
    setValues(onRegister);
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault();
    handleClick(values.regEmail, values.regPassword);
  };

  return (
    <div className="popup popup_type_auth">
      <div className="popup__container popup__container_type_auth">
        <h2 className="popup__title popup__title_type_auth">Регистрация</h2>
        <form className="form form_type_auth">
            <fieldset className='fieldset'>
            <input
            type="email"
            id="regEmail"
            className="form__input form__input_type_auth"
            placeholder="Email"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.regEmail || ''}
          />
            <span className={`form__invalid-message reg-email-error ${isValid ? '' : 'form__invalid-message_active'}`}>{errors.regEmail}</span>
            <input
            type="password"
            id="regPassword"
            className="form__input form__input_type_auth"
            placeholder="Пароль"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.regPassword || ''}
            minLength="6"
          />
            <span className={`form__invalid-message reg-password-error ${isValid ? '' : 'form__invalid-message_active'}`}>{errors.regPassword}</span>
          </fieldset>
          <button className="form__button form__button_type_auth" onClick={handleSubmit}>
            Зарегестрироваться
          </button>
        </form>
        <p className="popup__caption">
          Уже зарегестрированы? 
          <Link to="/sign-in" className="popup__caption">
            {' Войти'}
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
