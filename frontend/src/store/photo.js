import { csrfFetch }  from './csrf';

const POPULATE = 'photos/POPULATE';
const COMMENTS = 'photos/COMMENTS';
const STARS ='photos/STARS';
const PHOTO = 'photos/PHOTO'

const populate = (photos) => ({
  type: POPULATE,
  photos
});

const comments = (comments) => ({
  type: COMMENTS,
  comments
});

const stars = (stars) => ({
  type: STARS,
  stars
});
const photo = (photo) => ({
  type: PHOTO,
  photo
});

export const getPhoto = (photoId) => async dispatch => {
  const res = await csrfFetch(`/api/photos/${photoId}`);
  const data = await res.json();
  dispatch(photo(data));
};

export const populatePhotos = () => async dispatch => {
  const res = await csrfFetch(`/api/photos/public`)
  const data = await res.json();
  dispatch(populate(data))
};

export const uploadPhoto = (file) => async dispatch => {
  const res = await csrfFetch(`/api/photos/`)
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
export const editCommentPhotos = (commentObj) => async dispatch => {
  const {commentId, comment, photoId} = commentObj;
  const res = await csrfFetch(`/api/photos/${photoId}/comments/${commentId}`,{
    method: "PATCH",
    body: JSON.stringify({commentId, comment})
  });
  const data = await res.json();
  console.log(data)
};
export const deleteComment = (commentObj) => async dispatch => {
  const {commentId, photoId} = commentObj;
  const res = await csrfFetch(`/api/photos/${photoId}/comments/${commentId}`, {
    method: "DELETE"
  });
  const data = await res.json();
  console.log(data)
}
export const addStar = (starObj) => async dispatch => {
  const {photoId, userId} = starObj;
  const res = await csrfFetch(`/api/users/${userId}/photos/${photoId}/stars`, {
    method: 'POST',
    body: JSON.stringify({photoId, userId})
  });
  const data = await res.json();
  console.log(data);
};
export const getUserStar = (starObj) => async dispatch => {
  const {photoId, userId} = starObj;
  const res = await csrfFetch(`/api/users/${userId}/photos/${photoId}/stars`);
  const data = await res.json();
  return data;
}
export const removeStar = (starObj) => async dispatch => {
  const {photoId, userId} = starObj;
  const res = await csrfFetch(`/api/photos/${photoId}/stars`, {
    method: 'DELETE',
    body: JSON.stringify({photoId, userId})
  });
  const data = await res.json();
  console.log(data);
}
export const getStars = (photoId) => async dispatch => {
  const res = await csrfFetch(`/api/photos/${photoId}/stars`);
  const data = await res.json();
  dispatch(stars(data));
}
const photoReducer = (state={recent: null, comments: null, stars: null, photo:null}, action) => {
  switch (action.type) {
    case POPULATE:
      const populateState = {};
      action.photos.forEach(photo => populateState[photo.id] = photo)
      return {...state, recent: {...populateState}}
    case COMMENTS:
      const populateComment = {}
      action.comments.forEach(comment => populateComment[comment.id] = comment)
      return {...state, recent: {...state.recent}, comments: {...state.comments, ...populateComment}}
    case STARS:
      return {...state, recent: {...state.recent}, comments: {...state.comments}, stars: {...state.stars, ...action.stars}}
    case PHOTO:
      return {...state, recent: {...state.recent}, comments: {...state.comments}, stars: {...stars.stars}, photo:{...action.photo}}
    default:
      return state;
  };
};

export default photoReducer;
