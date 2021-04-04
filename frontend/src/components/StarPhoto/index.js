import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addStar, removeStar, getStars } from '../../store/photo';
import styles from './StarPhoto.module.css';
const StarPhoto = ({photoId, userId}) => {
  const dispatch = useDispatch()
  const [toggle, setToggle] = useState(false);
  useEffect(() => {
    dispatch(getStars(photoId));
  }, [dispatch, photoId]);
  const stars = useSelector(state => state.photos.stars)
  const handleClick = () => {
    dispatch(removeStar({photoId, userId}));
    if(toggle){
      setToggle(false)
    }else{
      setToggle(true)
      dispatch(addStar({photoId, userId}));
    }
    dispatch(getStars(photoId))
  };
  return (
    <div className={styles.starContainer}>
      {userId && <div className={toggle? `${styles.starOn}`: `${styles.starOff}`} onClick={handleClick}>
        <i className="fas fa-star"></i>
      </div>}
      <div>
        <span className={userId ? `${styles.hide}`: `${styles.starOn}`}><i className="fas fa-star"></i></span>
        { stars? <span className={styles.starText}>{stars[photoId]}</span>: null}
      </div>
    </div>
  )
};

export default StarPhoto;
