import { useEffect } from 'react';
import useFormAndValidation from '../utils/useValidation'

const Login = ({ handleClick, span }) => {
  const onLogin = {
    email: '',
    password: '',
  }

  const {values, handleChange, errors, isValid, setValues, handleBlur} = useFormAndValidation(onLogin)

  useEffect(() => {
    setValues(onLogin)
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault();
    handleClick(values.email, values.password);
  };

  return (
    <div className="popup popup_type_auth">
      <div className="popup__container popup__container_type_auth">
        <h2 className="popup__title popup__title_type_auth">Вход</h2>
        <form className="form form_type_auth">
          <fieldset className='fieldset'>
            <input
            type="email"
            id="email"
            name="email"
            className="form__input form__input_type_auth"
            placeholder="Email"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.email || ''}
            />
            <span className={`form__invalid-message email-error ${isValid ? '' : 'form__invalid-message_active'}`}>{errors.email}</span>
            <input
            type="password"
            id='password'
            name='password'
            className="form__input form__input_type_auth"
            placeholder="Пароль"
            onChange={handleChange}
            value={values.password || ''}
            />
            <span className={`form__invalid-message password-error ${isValid ? '' : 'form__invalid-message_active'}`}>{errors.password}</span>
          </fieldset>
          <button className="form__button form__button_type_auth" onClick={handleSubmit}>
            Войти
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
