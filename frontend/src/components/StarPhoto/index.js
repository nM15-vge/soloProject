import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { addStar, removeStar } from '../../store/photo';
import styles from './StarPhoto.module.css';
const StarPhoto = ({photoId, userId}) => {
  const dispatch = useDispatch()
  const [toggle, setToggle] = useState(false);
  useEffect(() => {
    
  })
  const handleClick = () => {
    dispatch(removeStar({photoId, userId}));
    if(toggle){
      setToggle(false)
    }else{
      setToggle(true)
      dispatch(addStar({photoId, userId}));
    }
  };
  return (
    <div className={toggle? `${styles.starOn}`: `${styles.starOff}`} onClick={handleClick}>
      <i className="fas fa-star"></i>
    </div>
  )
};

export default StarPhoto;
