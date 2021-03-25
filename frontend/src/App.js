import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Route, Switch, useHistory } from 'react-router-dom';
import LoginFormPage from './components/LoginFormPage';
import * as sessionActions from './store/session';


const App = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);
  const handClick = () => {
    dispatch(sessionActions.logoutUser())
  }
  return isLoaded && (
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
