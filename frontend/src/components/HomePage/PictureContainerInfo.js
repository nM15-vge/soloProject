import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import CommentModal from '../CommentModal';
import StarPhoto from '../StarPhoto';
import styles from './HomePageContent.module.css'
const PictureContainerInfo = ({user, id}) => {
  const [isDisplayed, setIsDisplayed] = useState(false);

  const photos = useSelector(state => state.photos.recent);
  return (
    <div className={styles.card}>
      <div
        onMouseEnter={()=> setIsDisplayed(true)}
        onMouseLeave={() => setIsDisplayed(false)}
        className={styles.pictureContainer} key={`${id}sadk;lafds`}>
        <Link to={`/photos/${id}`}>
          <img className={styles.picture} src={photos[id].imageUrl} alt={photos[id].title} />
        </Link>
      </div>
      <div
        className={isDisplayed? `${styles.info}`: `${styles.hide}`}>
        <Link to={`/photos/${id}`}><p className={styles.title}>{photos[id].title}</p></Link>
        <CommentModal className={styles.comment} photoId={id} userId ={user ? user.id: null}/>
        <StarPhoto className={styles.stars} photoId={id} userId={user ? user.id: null}/>
        {user && <div className={styles.favorite} ><i className="fas fa-plus"></i></div>}
      </div>
    </div>
  )
}
export default PictureContainerInfo;
