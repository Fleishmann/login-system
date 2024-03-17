// Modal.js
import React from 'react';
import './Modal.css';

const Modal = ({ title, onClose, children }) => {
  return (
    <div className="modal">
      <div className="modal-content">
        <div className="modal-header">
          <h2>{title}</h2>
          <span className="close" onClick={onClose}>&times;</span>
        </div>
        <div className="modal-body">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;