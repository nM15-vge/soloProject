import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { deleteComment, editCommentPhotos, getComments, commentPhotos } from '../../store/photo';
import styles from './Comments.module.css'
const Comments = ({photoId}) => {
  let userComment = []
  const [comment, setComment] = useState('');
  const [viewForm, setViewForm] = useState(() => userComment.length ? false: true);
  const [viewEdit, setViewEdit] = useState(() => userComment.length ? true: false)
  const [errors, setErrors] = useState([])
  const user = useSelector(state => state.session.user)

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
        if(comments[id].userId === Number(user?.id)){
          userComment.push(comments[id])
          commentArr.pop(comments[id])
        }
      };
    };
  };
  const editClick = (e) => {
    e.preventDefault()
    if(viewForm){
      setViewForm(false);
      setViewEdit(true)
    }else {
      setComment(userComment[0].comment)
      setViewForm(true);
      setViewEdit(false)
    }
  }
  const deleteClick = (e) => {
    e.preventDefault()
    dispatch(deleteComment({photoId, commentId: userComment[0].id}));
    setViewEdit(false);
    setViewForm(true);
  }
  const handleSubmit = e => {
    e.preventDefault();
    setViewForm(false);
    setViewEdit(true)
    if(userComment.length){
      return dispatch(editCommentPhotos({comment, commentId: userComment[0].id, photoId}))
      .then(() => {
        setComment('')
        dispatch(getComments(photoId))
      })
      .catch(async (res) => {
        const data = await res.json();
        if(data && data.errors){
          setErrors(data.errors);
        };
      });
    }else {
      return dispatch(commentPhotos({photoId, comment, userId: user.id}))
        .then(() => {
          setComment('')
          dispatch(getComments(photoId))
        })
        .catch(async (res) => {
          const data = await res.json();
          if(data && data.errors){
            setErrors(data.errors);
          };
        });
    }
  };

  return (
    <div className={styles.commentContainer}>
      <div>{commentArr.map(comment => (<div key={comment.id}>
        <p>{comment.comment}</p>
      </div>))}</div>
      <div className={styles.userCommentContainer}>
      {userComment.length && <div className={styles.commentContainer}>
        {userComment[0].comment}
        <button onClick={editClick} className={viewEdit ? `${styles.button}`: `${styles.hide}`}>Edit</button>
        <button onClick={deleteClick}>Delete</button>
        </div>}
      {user  &&
      <form onSubmit={handleSubmit} className={viewForm ? `${styles.formComment}`: `${styles.hide}`}>
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
        <button onClick={editClick} className={userComment.length? `${styles.button}`: `${styles.hide}`}>Cancel</button>
      </form>}
    </div>
  </div>

  )
}

export default Comments;
