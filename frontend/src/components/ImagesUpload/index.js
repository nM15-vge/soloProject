import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import styles from './ImageUpload.module.css';

const ImagesUpload = () => {
  const [image, setImage] = useState({});
  const [imageUrl, setImageUrl] = useState({})
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
  const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop});
  return (
    <>
      <div>{imageUrl &&  <img key={imageUrl.dataUrl} src={imageUrl.dataUrl} alt={imageUrl.name} style={{"width": "150px", "height": "150px"}}></img>}</div>
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
