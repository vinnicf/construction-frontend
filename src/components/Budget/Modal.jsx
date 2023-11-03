// Modal.js
import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import '../../styles/modal.css'

const Modal = ({ isOpen, onClose, title, children }) => {
    return isOpen ? ReactDOM.createPortal(
        <div className={`modal fade show modal-overlay`} tabIndex="-1" role="dialog" style={{ display: 'block' }}>
            <div className="modal-dialog modal-dialog-centered custom-modal-width" role="document" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>

                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">{title}</h5>
                        <button type="button" className="close" aria-label="Close" onClick={onClose}>
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        {children}
                    </div>
                </div>
            </div>
        </div>,
        document.body
    ) : null;
};

Modal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    children: PropTypes.node,
};

export default Modal;


