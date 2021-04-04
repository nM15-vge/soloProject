import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import Navigation from './components/Navigation';
import SignupFormPage from './components/SignupFormPage';
import * as sessionActions from './store/session';
import HomePageContent from './components/HomePage';
import ProfilePage from './components/ProfilePage';
import ImagesUpload from './components/ImagesUpload';
import ImagePage from './components/ImagePage';

const App = () => {
  const dispatch = useDispatch()
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);
  const sessionUser = useSelector(state => state.session.user);
  return(
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route exact path="/">
            <HomePageContent />
          </Route>
          <Route path="/signup">
            <SignupFormPage />
          </Route>
          <Route path ='/myProfile'>
            <>
              {sessionUser ? <ProfilePage user={sessionUser}/>: <h1>Page Not Found</h1>}
            </>
          </Route>
          <Route path="/photos/upload">
            <>
              {sessionUser ? <ImagesUpload user={sessionUser} /> : <h1>Page Not Found</h1>}
            </>
          </Route>
          <Route path="/photos/:id">
            <ImagePage />
          </Route>
          <Route><h1>Page Not Found</h1></Route>
        </Switch>
      )}
    </>
  )
}

export default App;
