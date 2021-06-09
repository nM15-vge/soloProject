import { useCallback, useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { useDispatch, useSelector } from 'react-redux';
import { Modal } from '../../context/Modal';
import { userAlbums } from '../../store/session';
import styles from './ImageUpload.module.css';

const ImagesUpload = () => {
  const dispatch = useDispatch();

  const [image, setImage] = useState({});
  const [imageUrl, setImageUrl] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [publicPrivate, setPublicPrivate] = useState(false);
  const [albumId, setAlbumId] = useState(0);

  const userId = useSelector(state => state.session.user.id);

  useEffect(() => {
    dispatch(userAlbums(userId));
  }, [dispatch])

  const albums = useSelector(state => state.session.userAlbums);

  const onDrop = useCallback(acceptedFiles => {
    acceptedFiles.forEach(file => {
      const reader = new FileReader();
      reader.onload = () => {
        let buffer = reader.result;
        setImage({ originalname: file.name, mimetype: file.type, buffer});
      }
      reader.readAsArrayBuffer(file);
      const readerUrl = new FileReader();
      readerUrl.onload = () => {
        let dataUrl = readerUrl.result;
        setImageUrl({name: file.name, dataUrl})
      };
      readerUrl.readAsDataURL(file);
    })
  }, []);
  if(image){
    console.log(image);
  };

  const onSubmit = () => {

  }
  const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop});
  return (
    <>
      <div>{imageUrl && (
        <Modal onClose={() => setImageUrl(null)}>
          <img key={imageUrl.dataUrl} src={imageUrl.dataUrl} alt={imageUrl.name} style={{"width": "150px", "height": "150px"}} />
          <form onSubmit={onSubmit}>
            <label>
                Title:
                <input type="text" onChange={e => setTitle(e.target.value)} value={title}/>
            </label>
            <label>
              Description:
              <textarea onChange={e => setDescription(e.target.value)} value={description}/>
            </label>
            <label>
              <input
                type="radio"
                name="publicPrivate"
                onChange={() => setPublicPrivate(true)}
                checked={publicPrivate ? true: false}
              />
              Public
            </label>
            <label>
              <input
                type="radio"
                name="publicPrivate"
                onChange={() => setPublicPrivate(false)}
                checked={!publicPrivate? true: false}
              />
              Private
            </label>
            <select value={albumId} onChange={e => setAlbumId(e.target.value)}>
              <option value={0}>--Please select an option-- </option>
              {albums && Object.keys(albums).map(id => (
                <option key={id} value={id}>{albums[id].title}</option>
              ))}
            </select>
            <button type="submit">Upload Picture</button>
          </form>
        </Modal>
      )}</div>
      <div className={styles.dropzone} {...getRootProps()}>
        <input {...getInputProps()} />
        {
          isDragActive ?
          <p>Drop the files here...</p> :
          <p>Drag 'n' drop some files here, or click to select files.</p>
        }
      </div>
    </>
  )
}

export default ImagesUpload;
