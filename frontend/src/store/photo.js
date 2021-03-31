import { csrfFetch }  from './csrf';

const POPULATE = 'photo/POPULATE';

const populate = (photos) => ({
  type: POPULATE,
  photos
});

export const populatePhotos = () => async dispatch => {
  const res = await csrfFetch(`/api/photos/public`)
  const data = await res.json();
  dispatch(populate(data))
};

const photoReducer = (state={recent: null}, action) => {
  switch (action.type) {
    case POPULATE:
      const populateState = {};
      action.photos.forEach(photo => populateState[photo.id] = photo)
      return {...state, recent: {...populateState}}
    default:
      return state;
  };
};

export default photoReducer;
