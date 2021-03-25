import { csrfFetch } from './csrf';

const LOGIN = 'session/LOGIN';
const LOGOUT = 'session/LOGOUT';

const login = (user) => ({
  type: LOGIN,
  user,
});

const logout = () => ({
  type: LOGOUT,
})
export const loginUser = (user) =>  async dispatch =>{
  const { credential, password } = user
  const res = await csrfFetch(`/api/session`, {
    method: 'POST',
    body: JSON.stringify({ credential, password}),
  })
  if(res.ok){
    const data = await res.json();
    dispatch(login(data.user));
  }
};
export const logoutUser = () => async dispatch => {
  const res = await csrfFetch(`/api/session`, {
    method: 'DELETE'
  });
  if(res.ok)  {
    const data = await res.json();
    console.log(data)
    dispatch(logout());
  }
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
