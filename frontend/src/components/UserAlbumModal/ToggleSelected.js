import { useState } from 'react';
import styles from './UserAlbumModal.module.css';

const ToggleSelected = ({id, pictures, photos, setPhotos})  => {
  const [selected, setSelected] = useState(false);
  const handleClick = e => {
    console.log(typeof e.target.id)
    if(photos.includes(Number(e.target.id))){
      const id = Number(e.target.id)
      let copyPhotos = [...photos]
      let newPhotos = copyPhotos.filter(photo => photo !== id)
      setPhotos([...newPhotos])
      setSelected(false);
      console.log(selected)
    }else {
      setPhotos([...photos, Number(e.target.id)]);
      setSelected(true)
    };
  };
  return (
    <div className={styles.pictureContainer}>
      <img id={id} onClick={handleClick} className={styles.picture} src={pictures[id].imageUrl} alt={pictures[id].title} />
      <div className={selected ? `${styles.selected}`: `${styles.hidden}`}>
        <i className="fas fa-check" />
      </div>
    </div>
  )
}
export default ToggleSelected;
