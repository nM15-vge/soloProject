import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { userNewAlbum, userPhotos } from '../../store/session';
import { updateAlbum } from '../../store/album';
import ToggleSelected from './ToggleSelected';
import styles from './UserAlbumModal.module.css';

const AddAlbumForm = ({setShowModal, album}) => {
  const dispatch = useDispatch();
  const arrayPhotos = () => {
    if(album){
      let idArr = album.Photos.map(photo => photo.id)
      return idArr
    }else {
      return []
    }
  }
  const [title, setTitle] = useState(album ? album.title: '');
  const [description, setDescription] = useState(album? album.description: '');
  const [allowViewPublic, setAllowViewPublic] = useState(album? album.public: false)
  const [photos, setPhotos] = useState(arrayPhotos);
  const [errors, setErrors] = useState([]);
  console.log(photos)
  useEffect(() => {
    dispatch(userPhotos())
  }, [dispatch]);

  const handleSubmit = e => {
    e.preventDefault();
    setErrors([]);
    if(album) {
      return dispatch(updateAlbum({albumId: album.id, title, description, photos}))
        .then(() => setShowModal(false))
        .catch(async(res) => {
          const data = await res.json();
          if(data && data.errors){
            setShowModal(true);
            setErrors(data.errors);
          }
        })
    }else {
      return dispatch(userNewAlbum({title, description, photos}))
        .then(() => setShowModal(false))
        .catch(async (res) => {
          const data = await res.json();
          if(data && data.errors){
            setShowModal(true)
            setErrors(data.errors);
          }
        })
    }
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
      <p>Public Viewing: </p>
      <div>
        <label className={styles.radioBtn}>
          <input
            id={styles.yes}
            type="radio"
            name="public"
            value='true'
            onChange={() => setAllowViewPublic(true)}
            checked={allowViewPublic === true ? true: false}
            />
            <span>Yes</span>
        </label>
      </div>
      <div>
        <label className={styles.radioBtn}>
          <input
            id={styles.no}
            type="radio"
            name="public"
            value='false'
            onChange={() => setAllowViewPublic(false)}
            checked={allowViewPublic === false ? true: false}
            />
            <span>No</span>
        </label>
      </div>
      <label>
        Photos:
        <div className={styles.container}>
          {photoIds?.map(id => (<div key={`${id} kjlj;lkj;`}><ToggleSelected id={id} pictures={pictures} setPhotos={setPhotos} photos={photos}/></div>))}
        </div>
      </label>
      <button>{album? `Update Album`:`Create Album`}</button>
      {album && <button onClick={() => setShowModal(false)}>Cancel</button>}
    </form>
  )
}

export default AddAlbumForm;
