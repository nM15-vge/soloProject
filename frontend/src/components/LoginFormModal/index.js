import { useState } from 'react';
import { Modal } from '../../context/Modal';
import LoginForm from './LoginForm';
import styles from '../Navigation/NavBar.module.css'

const LoginFormModal = () => {
  const [showModal, setShowModal] = useState(false);
  const onClick = e => {
    e.preventDefault();
    setShowModal(true);
  }
  return(
    <>
      <a href="/" onClick={onClick}>
        <i className={`fas fa-sign-in-alt ${styles.spacing}`} />
        <span className={styles.spacing}>Log In</span>
      </a>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <LoginForm />
        </Modal>
      )}
    </>
  )
}

export default LoginFormModal;
