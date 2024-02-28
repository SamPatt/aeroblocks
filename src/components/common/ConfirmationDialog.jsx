import React from 'react';
import './ConfirmationDialog.css';

const ConfirmationDialog = ({ isOpen, onClose, onConfirm, message }) => {
  if (!isOpen) return null;

  return (
    <div className="dialog-backdrop">
      <div className="dialog-content">
        <p className="dialog-message">{message}</p>
        <div className="dialog-actions">
          <button onClick={onConfirm} className="dialog-confirm">Yes</button>
          <button onClick={onClose} className="dialog-cancel">No</button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationDialog;
