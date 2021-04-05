import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { populatePhotos } from '../../store/photo';
import styles from './HomePageContent.module.css'
import PictureContainerInfo from './PictureContainerInfo';

const HomePageContent = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(populatePhotos());
  }, [dispatch]);

  const photos = useSelector(state => state.photos.recent);
  const user = useSelector(state => state.session.user)
  return (
    <>
      <h3>Popular Photos</h3>
      <div className={styles.container}>
          {photos && Object.keys(photos).map(id => (
            <div key={`${id}lkalf`}>
              <PictureContainerInfo id={id} photos={id} user={user} />
            </div>
          ))}
        </div>
    </>
  );
};
export default HomePageContent;
