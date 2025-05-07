import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { useModal } from '../context/ModalContext';

const ModalRedirect = ({ message: propMessage, redirectTo: propRedirectTo, shouldClearJwt: propShouldClearJwt }) => {
  const { showModal } = useModal();
  const location = useLocation();
  const hasShownModal = useRef(false);

  const {
    message = propMessage || 'Error desconocido.',
    redirectTo = propRedirectTo || '/',
    shouldClearJwt = propShouldClearJwt ?? false
  } = location.state || {};

  useEffect(() => {
    if (!hasShownModal.current) {
      hasShownModal.current = true;

      const handleClose = () => {
        if (shouldClearJwt) {
          localStorage.removeItem('jwt');
        }
        window.location.replace(redirectTo);
      };

      showModal(message, handleClose);
    }
  }, [message, redirectTo, shouldClearJwt, showModal]);

  return null;
};

export default ModalRedirect;
