import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Modal } from '../../context/Modal';
import { commentPhotos, getComments } from '../../store/photo';
import styles from './CommentModal.module.css';

const CommentModal = ({photoId}) => {
  const [comment, setComment] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [errors, setErrors] = useState([])
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getComments(photoId))
  },[dispatch, photoId]);

  const comments = useSelector(state => state.photos.comments);
  const commentArr = []
  if( comments ){
    for(const id in comments){
      if(comments[id].photoId === Number(photoId)){
        commentArr.push(comments[id])
      };
    };
  };
  const handleClick = e => {
    e.preventDefault();
    setShowModal(true);
  };
  
  const user = useSelector(state => state.session.user)
  const handleSubmit = e => {
    e.preventDefault();
    return dispatch(commentPhotos({photoId, comment, userId: user.id}))
      .then(() => {
        setComment('')
        dispatch(getComments(photoId))
      })
      .catch(async (res) => {
        const data = await res.json();
        if(data && data.errors){
          setShowModal(true)
          setErrors(data.errors);
        };
      });
  };
  return (
    <div>
      <i onClick={handleClick} className="far fa-comments"></i>
      {showModal && <Modal onClose={() => setShowModal(false)}>
      <div className={styles.commentContainer}>
        <div>{commentArr.map(comment => (<div key={comment.id}>
          <p>{comment.comment}</p>
        </div>))}</div>
        {user &&
        <form onSubmit={handleSubmit}>
          <ul>
            {errors.map((error, idx)=> (<li key={idx}>{error}</li>))}
          </ul>
          <input
            type="text"
            onChange={ e => setComment(e.target.value)}
            value={comment}
            placeholder="Write your comment here."
          />
          <button>Comment</button>
        </form>}
      </div>
    </Modal>}
    </div>
  )
};

export default CommentModal;
