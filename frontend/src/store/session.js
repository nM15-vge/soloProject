import { csrfFetch } from './csrf';

const LOGIN = 'session/LOGIN';
const LOGOUT = 'session/LOGOUT';

const login = (user) => ({
  type: LOGIN,
  user,
});

const logout = () => ({
  type: LOGOUT,
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
}
export const signupUser = (user) => async dispatch => {
  const { username, email, password } = user
  const res = await csrfFetch(`/api/users`, {
    method: 'POST',
    body: JSON.stringify({username, email, password})
  })
  const data = await res.json();
  dispatch(login(data.user))
}
const sessionReducer = (state={user: null}, action) => {
  switch(action.type) {
    case LOGIN:
      return {user: {...action.user}}
    case LOGOUT:
      return{
        user: null
      }
    default:
      return state
  };
};
export default sessionReducer;
