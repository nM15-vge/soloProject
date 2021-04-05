import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { userPhotos } from '../../store/session';
import styles from './ProfilePage.module.css';
const UserPhotos = () => {
  const dispatch = useDispatch();
  const userId = useSelector(state => state.session.user.id)
  useEffect(() => {
    dispatch(userPhotos(userId))
  }, [dispatch, userId])
  const photos = useSelector(state => state.session.userPhotos);
  let photoIds;
  if(photos) photoIds = Object.keys(photos)
  return(
    <div className={styles.container}>
      {photoIds?.map(id => (<div className={styles.pictureContainer} key={id}>
          <Link to={`/photos/${id}`}>
            <img className={styles.picture} src={photos[id].imageUrl} alt={photos[id].title} />
          </Link>
          </div>))}
    </div>
  )
}

export default UserPhotos;
