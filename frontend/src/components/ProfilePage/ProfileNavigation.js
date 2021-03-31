import { NavLink } from 'react-router-dom';

const ProfileNavigation = () => {
  return (
    <div>
      <NavLink to="/myProfile/photos">Photos</NavLink>
      <span> | </span>
      <NavLink to="/myProfile/albums">Albums</NavLink>
      <span> | </span>
    </div>
  )
}

export default ProfileNavigation;
