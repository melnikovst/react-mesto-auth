import { Link, useNavigate } from 'react-router-dom';
import styles from './Home.module.scss';
import { useState } from 'react';

console.log(styles);
const Home = ({ handleClick }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    handleClick(email, password);
  };

  return (
    <div className={styles.home}>
      <div className={styles.inner}>
        <h2 className={styles.title}>Регистрация</h2>
        <form className={styles.form}>
          <input
            type="email"
            className={styles.input}
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
          <input
            type="password"
            className={styles.input}
            placeholder="Пароль"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
          <button className={styles.button} onClick={handleSubmit}>
            Зарегестрироваться
          </button>
        </form>
        <p className={styles.caption}>
          Уже зарегестрированы?{' '}
          <Link to="/sign-in" className={styles.caption}>
            Войти
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Home;
