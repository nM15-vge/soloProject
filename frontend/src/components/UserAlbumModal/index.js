import { useState } from 'react';
import { Modal } from '../../context/Modal';
import AddAlbumForm from './AddAlbumForm';
import styles from './UserAlbumModal.module.css';
const UserAlbums = () => {
  const [showModal, setShowModal] = useState(false);
  const handleClick = e => {
    e.preventDefault();
    setShowModal(true)
  }
  return(
    <div>
      <div className={styles.addAlbum}>
        <a href='/myProfile/albums' title="Create new album" onClick={handleClick}>
          <i className="far fa-images" />
        </a>
       {showModal && <Modal onClose={() => setShowModal(false)}>
          <AddAlbumForm setShowModal={setShowModal}/>
        </Modal>}
      </div>
    </div>
  )
}

export default UserAlbums;
