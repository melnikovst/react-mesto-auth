import { useState } from 'react';
import styles from './Home.module.scss';

const Login = ({ handleClick }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    handleClick(email, password);
  };

  return (
    <div className={styles.home}>
      <div className={styles.inner}>
        <h2 className={styles.title}>Вход</h2>
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
            Войти
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
