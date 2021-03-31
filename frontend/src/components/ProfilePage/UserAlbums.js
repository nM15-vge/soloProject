import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { userAlbums } from '../../store/session';
import styles from './ProfilePage.module.css';
const UserAlbums = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(userAlbums())
  }, [dispatch]);
  const albums = useSelector(state => state.session.userAlbums);
  let albumIds;
  if(albums) albumIds = Object.keys(albums)
  return(
    <div className={styles.container}>
      {albumIds?.map(id => (<div className={styles.pictureContainer} key={id}>
          {albums[id].title}
        </div>))}
    </div>
  )
}

export default UserAlbums;
