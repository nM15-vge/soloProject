import { csrfFetch } from './csrf';

const ALBUMS = 'populate/ALBUMS';

const populate = (albums) => ({
  type: ALBUMS,
  albums
})

export const populateAlbums = () => async dispatch => {
  const res = await csrfFetch(`/api/albums/public`);
  const data = await res.json();
  dispatch(populate(data));
};

const albumReducer = (state={recent: null}, action) => {
  switch (action.type) {
    case ALBUMS:
      const populateState = {};
      action.albums.forEach(album => populateState[album.id] = album)
      return { ...state, recent: {...populateState}}
    default:
    return state
  };
};

export default albumReducer;
