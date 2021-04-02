import { csrfFetch }  from './csrf';

const POPULATE = 'photos/POPULATE';
const COMMENTS = 'photos/COMMENTS';

const populate = (photos) => ({
  type: POPULATE,
  photos
});

const comments = (comments) => ({
  type: COMMENTS,
  comments
});

export const populatePhotos = () => async dispatch => {
  const res = await csrfFetch(`/api/photos/public`)
  const data = await res.json();
  dispatch(populate(data))
};

export const commentPhotos = (commentObj) => async dispatch => {
  const { userId, photoId, comment } = commentObj;
  const res = await csrfFetch(`/api/users/${userId}/photos/${photoId}/comments`, {
    method: "POST",
    body: JSON.stringify({comment, userId, photoId})
  });
  const data = await res.json();
  console.log(data)
};

export const getComments = (photoId) => async dispatch => {
  const res = await csrfFetch(`/api/photos/${photoId}/comments`);
  const data = await res.json();
  dispatch(comments(data));
};
export const addStar = (starObj) => async dispatch => {
  const {photoId, userId} = starObj;
  const res = await csrfFetch(`/api/users/${userId}/photos/${photoId}/stars`, {
    method: 'POST',
    body: JSON.stringify({photoId, userId})
  });
  const data = await res.json();
  console.log(data);
};
export const removeStar = (starObj) => async dispatch => {
  const {photoId, userId} = starObj;
  const res = await csrfFetch(`/api/photos/${photoId}/stars`, {
    method: 'DELETE',
    body: JSON.stringify({photoId, userId})
  });
  const data = await res.json();
  console.log(data);
}
const photoReducer = (state={recent: null, comments: null}, action) => {
  switch (action.type) {
    case POPULATE:
      const populateState = {};
      action.photos.forEach(photo => populateState[photo.id] = photo)
      return {...state, recent: {...populateState}}
    case COMMENTS:
      const populateComment = {}
      action.comments.forEach(comment => populateComment[comment.id] = comment)
      return {...state, recent: {...state.recent}, comments: {...state.comments, ...populateComment}}
    default:
      return state;
  };
};

export default photoReducer;
