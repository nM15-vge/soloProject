import { useState } from 'react';
import styles from './UserAlbumModal.module.css';

const ToggleSelected = ({id, pictures})  => {
  const [selected, setSelected] = useState(false);
  const handleClick = e => {

    if(photos.includes(e.target.id)){
      const id = e.target.id
      let copyPhotos = [...photos]
      let newPhotos = copyPhotos.filter(photo => photo !== id)
      setPhotos([...newPhotos])
    }else {
      setPhotos([...photos, e.target.id]);
    };

  };
  return (
    <div className={styles.pictureContainer} key={id}>
      <img id={id} onClick={handleClick} className={styles.picture} src={pictures[id].imageUrl} alt={pictures[id].title} />
      <div className={`${styles.selected} ${styles.hidden}`}>
        <i className="fas fa-check" />
      </div>
    </div>
  )
}
export default ToggleSelected;
