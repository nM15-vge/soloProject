import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getPhoto } from '../../store/photo';
import Comments from '../Comments';
import styles from './ImagePage.module.css'

const ImagePage = ()  => {
  const { id }  = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getPhoto(id));
  }, [dispatch, id]);
  const photo = useSelector(state => state.photos.photo);
  return (
    <div>
      {photo?.public ? <div className={styles.container}>
        <Comments photoId={id} />
        <div className={styles.photoComponent}><img src={photo?.imageUrl} alt={photo ? photo.title: null} /></div>
      </div> :
      <div className={styles.photoFullscreen}><img src={photo?.imageUrl} alt={photo ? photo.title: null} /></div>}
    </div>
  )
}

export default ImagePage;
