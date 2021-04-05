import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { userNewAlbum, userPhotos } from '../../store/session';
import ToggleSelected from './ToggleSelected';
import styles from './UserAlbumModal.module.css';

const AddAlbumForm = ({setShowModal}) => {
  const dispatch = useDispatch();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [allowViewPublic, setAllowViewPublic] = useState(false)
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
            onClick={() => setAllowViewPublic(true)}
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
            onClick={() => setAllowViewPublic(false)}
            checked={allowViewPublic === false ? true: false}
            />
            <span>No</span>
        </label>
      </div>
      <label>
        Photos:
        <div className={styles.container}>
          {photoIds?.map(id => (<ToggleSelected id={id} pictures={pictures} setPhotos={setPhotos}/>))}
        </div>
      </label>
      <button>Create Album</button>
    </form>
  )
}

export default AddAlbumForm;
