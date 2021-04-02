import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import LoginFormModal from '../LoginFormModal';
import styles from './NavBar.module.css'
const Navigation = ({isLoaded}) => {
  const sessionUser = useSelector(state => state.session.user);
  let sessionLinks;
  if(sessionUser) {
    sessionLinks = (
      <div>
        <ProfileButton user={sessionUser} />
        <NavLink to='/photos/upload'><i className="fas fa-cloud-upload-alt" /></NavLink>
      </div>
    );
  }else {
    sessionLinks = (
     <div className={styles.rightNav}>
      <div>
        <LoginFormModal />
      </div>
      <div>
        <NavLink to="/signup">
          <i className="fas fa-user-astronaut" />
          Sign Up
        </NavLink>
      </div>
     </div>
    );
  };
  return(
    <div className={styles.navBar}>
      <div className={styles.lefftBar}>
        <NavLink exact to="/">
          <i className="fas fa-home"/>
          Home</NavLink>
      </div>
      {isLoaded && sessionLinks}
    </div>
  )
};

export default Navigation;
