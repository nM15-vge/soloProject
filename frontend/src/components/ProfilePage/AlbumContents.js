import { useState } from 'react';
import { Modal } from '../../context/Modal';
import AddAlbumForm from '../UserAlbumModal/AddAlbumForm'
import styles from './ProfilePage.module.css';
const AlbumContents = ({albums, id}) => {
  const photos = albums[id].Photos
  const [viewEdit, setViewEdit] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const handleClick = e => {
    e.preventDefault();
    setShowModal(true)
  };
  // const [currentIdx, setCurrentIdx] = useState(0)
  // const [image, setImage] = useState(photos[currentIdx].imageUrl)
  // let imageChanging;
  const handleEnter = () => {
    setViewEdit(true);
    // imageChanging = setInterval(() => {
    //   if(currentIdx > photos.length){
    //     setCurrentIdx(0);
    //     setImage(photos[currentIdx].imageUrl)
    //   }else {
    //     setCurrentIdx(() => currentIdx + 1)
    //     setImage(photos[currentIdx].imageUrl)
    //   }
    // }, 1500);
  };
  const handleLeave = () => {
    setViewEdit(false);
    // clearInterval(imageChanging);
  };
  return (
    <div onMouseEnter={handleEnter}
         onMouseLeave={handleLeave}
         className={styles.album}>
      <div className={styles.frame}></div>
      <img className={styles.picture} src={photos[0].imageUrl} alt={photos[0].title} />
      <p className={viewEdit? `${styles.text}`: `${styles.hide}`}>no. pictures: {photos.length}</p>
      <div onClick={handleClick} className={viewEdit? `${styles.edit}`: `${styles.hide}`}>
        <i className="fas fa-pencil-alt" />
      </div>
        {showModal && <Modal onClose={() => setShowModal(false)}>
          <AddAlbumForm setShowModal={setShowModal} album={albums[id]}/>
        </Modal>}
    </div>
  )
};
export default AlbumContents;
