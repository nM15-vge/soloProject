import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Switch, Route, NavLink } from 'react-router-dom';
import ProfileNavigation from './ProfileNavigation';
import styles from './ProfilePage.module.css';
import UserPhotos from './UserPhotos';

const ProfilePage = ({user}) => {
  return(
    <>
      {user && (<div>
        <div className={styles.container}>
          <img className={styles.banner} src="https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fwww.goddard.edu%2Fwp-content%2Fuploads%2F2014%2F06%2Fgc_banner_leaves_green.png&f=1&nofb=1" />
          <img className={styles.avatar} src={user.avatarUrl} alt="avatar"/>
          <p id={styles.name}>{user.firstName} {user.lastName}</p>
          <p id={styles.joined}>Joined {user.createdAt.slice(0, 4)}</p>
        </div>
        <ProfileNavigation />
        <Switch>
          <Route path="/myProfile/photos">
             <UserPhotos user={user} />
          </Route>
        </Switch>
      </div>)}
    </>
  )
}

export default ProfilePage;
