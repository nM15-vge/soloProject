import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import LoginFormModal from '../LoginFormModal';
import './NavBar.css'
const Navigation = ({isLoaded}) => {
  const sessionUser = useSelector(state => state.session.user);
  let sessionLinks;
  if(sessionUser) {
    sessionLinks = (
      <ProfileButton user={sessionUser} />
    );
  }else {
    sessionLinks = (
     <div className="right-nav">
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
    <div className="nav-bar">
      <div className="left-nav">
        <NavLink exact to="/">
          <i className="fas fa-home"/>
          Home</NavLink>
      </div>
      {isLoaded && sessionLinks}
    </div>
  )
};

export default Navigation;
