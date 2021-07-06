import {useState } from 'react';
import * as sessionActions from '../../store/session';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import styles from './LoginForm.module.css';

const LoginForm = () => {
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);
  const [credential, setCredential] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState([]);

  if(sessionUser) return (<Redirect to="/" />);

  const login = e => {
    e.preventDefault();
    return dispatch(sessionActions.loginUser({credential: "Demo1", password: "password"}))
      .catch(async res => {
        const data = await res.json();
        if( data && data.errors ) setErrors(data.errors);
      });
  };

  const handleSubmit = e => {
    e.preventDefault();
    setErrors([]);
    return dispatch(sessionActions.loginUser({credential, password}))
      .catch(async (res) => {
        const data = await res.json();
        if(data && data.errors) setErrors(data.errors);
      })
  }
  return(
    <form className={styles.login} onSubmit={handleSubmit}>
      <h4 className={styles.title} >Log In Form</h4>
      <ul>
        {errors.map((error, idx) => (<li key={idx}>{error}</li>))}
      </ul>
      <label>
        Username or Email:
        <input
          type="text"
          value={credential}
          onChange={ e => setCredential(e.target.value)}
          required
          />
      </label>
      <label>
        Password:
        <input
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
          />
      </label>
      <button className={styles.loginBtn} type="submit">Log In</button>
      <button className={styles.loginBtn} onClick={login}>Demo User</button>
    </form>
  )
}

export default LoginForm
