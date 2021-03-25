import { useDispatch } from 'react-redux';
import { Route, Switch, useHistory } from 'react-router-dom';
import LoginFormPage from './components/LoginFormPage';
import * as sessionActions from './store/session';


const App = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const handClick = () => {
    dispatch(sessionActions.logoutUser())
  }
  return (
    <Switch>
      <Route exact path="/">
        <h1>Hello from App</h1>
        <button onClick={handClick}>Log Out</button>
        <button onClick={() => history.push('/login')}>Log In</button>
      </Route>
      <Route path="/login">
        <LoginFormPage />
      </Route>
    </Switch>
  );
}

export default App;
