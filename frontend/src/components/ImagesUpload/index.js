import { useCallback } from 'react';
import { RNS3 } from 'react-native-aws3';
import { useDropzone } from 'react-dropzone';
import { options, fileObj} from '../Uploads';
import styles from './ImageUpload.module.css';

const ImagesUpload = () => {
  const onDrop = useCallback(acceptedFiles => {
    acceptedFiles.map(file => {
      const reader = new FileReader();
      // reader.onabort = (e) => console.log('file reading was aborted')
      // reader.onerror = (e) => console.log('file reading has failed')
      console.log(file)
      reader.onload = (e) => {
        const binaryStr = e.target.result
        file.uri = binaryStr;
        fileObj.name = file.name;
        RNS3.put(file, options).then(response => {
          if (response.status !== 201)
            throw new Error("Failed to upload image to S3");
          console.log(response.body);
        });

      }
     reader.readAsDataURL(file)
     console.log(file);
     return file;
    })
  }, []);
  const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop});
  return (
    <div className={styles.dropzone} {...getRootProps()}>
      <input {...getInputProps()} />
      {
        isDragActive ?
        <p>Drop the files here...</p> :
        <p>Drag 'n' drop some files here, or click to select files.</p>
      }
    </div>
  )
}

export default ImagesUpload;
