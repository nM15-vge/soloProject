import { csrfFetch } from './csrf';

const LOGIN = 'session/LOGIN';
const LOGOUT = 'session/LOGOUT';
const PHOTOS = 'session/user/PHOTOS';
const ALBUMS = 'session/user/ALBUMS'
const login = (user) => ({
  type: LOGIN,
  user,
});

const logout = () => ({
  type: LOGOUT,
});
const photos = (photos) => ({
  type: PHOTOS,
  photos
});

const albums = (albums) => ({
  type: ALBUMS,
  albums
});
export const loginUser = (user) =>  async dispatch =>{
  const { credential, password } = user
  const res = await csrfFetch(`/api/session`, {
    method: 'POST',
    body: JSON.stringify({ credential, password}),
  });
  const data = await res.json();
  dispatch(login(data.user));
};
export const logoutUser = () => async dispatch => {
  const res = await csrfFetch(`/api/session`, {
    method: 'DELETE'
  });
  await res.json();
  dispatch(logout());
};
export const restoreUser = () => async dispatch => {
  const res = await csrfFetch(`/api/session`);
  const data = await res.json();
  if('user' in data) dispatch(login(data.user));
};
export const signupUser = (user) => async dispatch => {
  const { username, email, password } = user
  const res = await csrfFetch(`/api/users`, {
    method: 'POST',
    body: JSON.stringify({username, email, password})
  })
  const data = await res.json();
  dispatch(login(data.user))
};
export const userPhotos = () => async dispatch => {
  const res = await csrfFetch(`/api/photos/private`)
  const data = await res.json();
  dispatch(photos(data))
};
export const userAlbums = () => async dispatch => {
  const res = await csrfFetch(`/api/albums/private`);
  const data = await res.json();
  dispatch(albums(data))
}
export const userNewAlbum = (album) => async dispatch => {
  const { title, description, photos } = album
  const res = await csrfFetch(`/api/albums`, {
    method: 'POST',
    body: JSON.stringify({title, description, photos})
  });
  const data = await res.json();
  console.log(data)
};
const sessionReducer = (state={user: null, userPhotos: null, userAlbums: null}, action) => {
  switch(action.type) {
    case LOGIN:
      return {user: {...action.user}}
    case LOGOUT:
      return{
        user: null
      }
    case PHOTOS:
      const populatePhotosState = {};
      action.photos.forEach(photo => populatePhotosState[photo.id] = photo)
      return{
        ...state, user: {...state.user}, userPhotos: {...populatePhotosState}
      }
    case ALBUMS:
      const populateAlbumsState = {};
      action.albums.forEach(album => populateAlbumsState[album.id] = album)
      return {...state, user: {...state.user}, userPhotos: {...state.userPhotos}, userAlbums: {...populateAlbumsState}}
    default:
      return state
  };
};
export default sessionReducer;
