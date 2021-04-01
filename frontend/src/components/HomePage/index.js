import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { populatePhotos } from '../../store/photo';
import styles from './HomePageContent.module.css'
import CommentModal from '../CommentModal';

const HomePageContent = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(populatePhotos());
  }, [dispatch]);

  const photos = useSelector(state => state.photos.recent);
  const user = useSelector(state => state.session.user)
  return (
    <div className={styles.container}>
        {photos && Object.keys(photos).map(id => (<div className={styles.pictureContainer} key={id}>
          <Link to={`/photos/${id}`}>
            <img className={styles.picture} src={photos[id].imageUrl} alt={photos[id].title} />
          </Link>
          <div>
            <Link to={`/photos/${id}`}><p>{photos[id].title}</p></Link>
            <CommentModal photoId={id}/>
            <a href="/stars"><i className="fas fa-star"></i></a>
            {user && <a href="/favorite"><i className="fas fa-plus"></i></a>}
          </div>
        </div>))}
      </div>
  );
};
export default HomePageContent;
