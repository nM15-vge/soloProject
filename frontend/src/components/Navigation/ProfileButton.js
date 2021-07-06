import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import * as sessionActions from '../../store/session';
import styles from './NavBar.module.css';
const ProfileButton = ({ user }) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [showMenu, setShowMe] = useState(false);

  const openMenu = (e) => {
    e.preventDefault()
    if(showMenu) return;
    setShowMe(true);
  };

  useEffect(() => {
    if(!showMenu) return;
    const closeMenu = (e) => {
      e.preventDefault()
      setShowMe(false)};
    document.addEventListener('click', closeMenu);
    return () => document.removeEventListener('click', closeMenu);
  }, [showMenu])
  const logout = e => {
    e.preventDefault();
    dispatch(sessionActions.logoutUser());
    history.push("/")
  };
  return(
    <>
      <div className={styles.uploadBtn} onClick={openMenu}>
        <i className={`fas fa-user-astronaut ${styles.spacing}`} />
        <span className={styles.spacing}>myProfile</span>
      </div>
      {showMenu && (
        <div className={styles.profileDropdown}>
          <div ><Link id={styles.myProfile} to="/myProfile">{user.username}</Link></div>
          <div id={styles.username}>{user.email}</div>
          <div id={styles.btn}>
            <button className={styles.logoutBtn} onClick={logout}>
              <a>
                <i className="fas fa-sign-out-alt"/>
              </a>
            </button>
          </div>
        </div>
      )}
    </>
  )
};

export default ProfileButton;
