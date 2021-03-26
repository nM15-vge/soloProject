import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import * as sessionActions from '../../store/session';
const ProfileButton = ({ user }) => {
  const dispatch = useDispatch();
  const [showMenu, setShowMe] = useState(false);

  const openMenu = () => {
    if(showMenu) return;
    setShowMe(true);
  };

  useEffect(() => {
    if(!showMenu) return;
    const closeMenu = () => setShowMe(false);

    document.addEventListener('click', closeMenu);
    return () => document.removeEventListener('click', closeMenu);
  }, [showMenu])
  const logout = e => {
    e.preventDefault();
    dispatch(sessionActions.logoutUser());
  };
  return(
    <>
      <button onClick={openMenu}>
        <i className="fas fa-user-astronaut" />
      </button>
      {showMenu && (
        <ul className="profile-dropdown">
          <li>{user.username}</li>
          <li>{user.email}</li>
          <li>
            <button onClick={logout}>
              <i className="fas fa-sign-out-alt"/>
            </button>
          </li>
        </ul>
      )}
    </>
  )
};

export default ProfileButton;
