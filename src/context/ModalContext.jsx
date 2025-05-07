import React, { createContext, useState, useContext } from 'react';
import './Modal.css';

const ModalContext = createContext();

export const ModalProvider = ({ children }) => {
  const [modal, setModal] = useState({
    isOpen: false,
    message: '',
    onClose: null,
  });

  const showModal = (message, onClose = null) => {
    setModal({ isOpen: true, message, onClose });
  };

  const closeModal = () => {
    if (typeof modal.onClose === 'function') {
      modal.onClose();
    }
    setModal((prev) => ({ ...prev, isOpen: false }));
  };

  return (
    <ModalContext.Provider value={{ modal, showModal, closeModal }}>
      {children}

      {modal.isOpen && (
        <div className="modal-backdrop">
        <div className="modal">
          <p>{modal.message}</p>
          <button onClick={closeModal}>Close</button>
        </div>
      </div>
      )}
    </ModalContext.Provider>
  );
};

export const useModal = () => useContext(ModalContext);
