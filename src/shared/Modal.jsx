import React from 'react';

export default function Modal({ title, children, onClose }) {
  return (
    <div className="modal-backdrop" role="dialog" aria-modal="true">
      <div className="modal-content">
        <button className="modal-close" onClick={onClose} aria-label="Close modal">×</button>
        <h2 className="modal-title">{title}</h2>
        <div className="modal-body">{children}</div>
        <div style={{ textAlign: 'center', marginTop: 30 }}>
          <button className="modal-action" onClick={onClose}>✓ Close Window</button>
        </div>
      </div>
    </div>
  );
}
