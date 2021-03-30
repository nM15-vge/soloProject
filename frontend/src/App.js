import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import Navigation from './components/Navigation';
import SignupFormPage from './components/SignupFormPage';
import { populatePhotos } from './store/photo';
import * as sessionActions from './store/session';


const App = () => {
  const dispatch = useDispatch()
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
    dispatch(populatePhotos())
  }, [dispatch]);
  const photos = useSelector(state => state.photos.recent)
  console.log(photos);
  return(
    <>
      <Navigation isLoaded={isLoaded} />
      <div>
        {photos && Object.keys(photos).map(id => (<div key={id}>
          <img src={photos[id].imageUrl} alt={photos[id].title} />
        </div>))}
      </div>
      {isLoaded && (
        <Switch>
          <Route path="/signup">
            <SignupFormPage />
          </Route>
        </Switch>
      )}
    </>
  )
}

export default App;
