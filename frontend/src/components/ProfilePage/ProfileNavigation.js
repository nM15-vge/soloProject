import { NavLink } from 'react-router-dom';
import styles from './ProfilePage.module.css';

const ProfileNavigation = () => {
  return (
    <div>
      <NavLink className={styles.links} to="/myProfile/photos">Photos</NavLink>
      <span className={styles.links}> | </span>
      <NavLink className={styles.links} to="/myProfile/albums">Albums</NavLink>
      <span className={styles.links}> | </span>
    </div>
  )
}

export default ProfileNavigation;
