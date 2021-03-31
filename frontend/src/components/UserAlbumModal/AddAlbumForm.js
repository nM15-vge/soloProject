import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { userNewAlbum, userPhotos } from '../../store/session';
import styles from './UserAlbumModal.module.css';

const AddAlbumForm = ({setShowModal}) => {
  const dispatch = useDispatch();

  const [title, setTitle] = useState();
  const [description, setDescription] = useState();
  const [photos, setPhotos] = useState([]);
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    dispatch(userPhotos())
  }, [dispatch]);

  const handleSubmit = e => {
    e.preventDefault();
    setErrors([]);
    return dispatch(userNewAlbum({title, description, photos}))
      .then(() => setShowModal(false))
      .catch(async (res) => {
        const data = await res.json();
        if(data && data.errors){
          setShowModal(true)
          setErrors(data.errors);
        }
      })
  };

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

  const pictures = useSelector(state => state.session.userPhotos);
  let photoIds;
  if(pictures) photoIds = Object.keys(pictures)
  return (
    <form className={styles.albumForm} onSubmit={handleSubmit}>
      <ul>
        {errors.map((error, idx) => (<li key={idx}>{error}</li>))}
      </ul>
      <label>
        Title:
        <input
          type="text"
          onChange ={ e => setTitle(e.target.value)}
          value={title}
          required
        />
      </label>
      <label>
        Description:
        <input
          type="text"
          onChange={e => setDescription(e.target.value)}
          value={description}
          placeholder="Description"
          required
        />
      </label>
      <label>
        Photos:
        <div className={styles.container}>
          {photoIds?.map(id => (<div className={styles.pictureContainer} key={id}>
            <img id={id} onClick={handleClick} className={styles.picture} src={pictures[id].imageUrl} alt={pictures[id].title} />
            <div className={`${styles.selected} ${styles.hidden}`}>
              <i className="fas fa-check" />
            </div>
          </div>))}
        </div>
      </label>
      <button>Create</button>
    </form>
  )
}

export default AddAlbumForm;
