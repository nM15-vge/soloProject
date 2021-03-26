import { useState } from 'react';
import { Modal } from '../../context/Modal';
import LoginForm from './LoginForm';

const LoginFormModal = () => {
  const [showModal, setShowModal] = useState(false);
  const onClick = e => {
    e.preventDefault();
    setShowModal(true);
  }
  return(
    <>
      <a href="" onClick={onClick}>
        <i class="fas fa-sign-in-alt" />
        Log In</a>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <LoginForm />
        </Modal>
      )}
    </>
  )
}

export default LoginFormModal;
