import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import styles from './ImageUpload.module.css';

const ImagesUpload = () => {
  const [images, setImages] = useState([]);
  const [imageUrls, setImageUrls] = useState([])
  const onDrop = useCallback(acceptedFiles => {
    acceptedFiles.forEach(file => {
      const reader = new FileReader();
      reader.onload = () => {
        let buffer = reader.result;
        setImages([...images, { originalname: file.name, mimetype: file.type, buffer}]);
      }
      reader.readAsArrayBuffer(file);
      const readerUrl = new FileReader();
      readerUrl.onload = () => {
        let dataUrl = readerUrl.result;
        setImageUrls([...imageUrls, {name: file.name, dataUrl}])
      };
      readerUrl.readAsDataURL(file);
    })
  }, [images, imageUrls]);
  if(images){
    console.log(images);
  };
  const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop});
  return (
    <>
      <div>{imageUrls && imageUrls.map(image => <img key={image.dataUrl} src={image.dataUrl} alt={image.name} style={{"width": "150px", "height": "150px"}}></img>)}</div>
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
