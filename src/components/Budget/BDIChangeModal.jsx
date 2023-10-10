import React, { useState } from 'react';
import '../../styles/bdichange.css'
import Modal from './Modal';

const BDIChangeModal = ({ initialBDI, onBDIChange, isOpen, onClose }) => {
    const [newBDI, setNewBDI] = useState(initialBDI * 100); // Convert to percent


    const handleSubmit = () => {
        onBDIChange(newBDI / 100); // Convert back to decimal
        onClose(); // Close the modal using the passed-in onClose function
    };

    return (
        <>


            <Modal isOpen={isOpen} onClose={onClose}>
                <h5 className="modal-title" id="exampleModalLabel">Change BDI</h5>
                <div className="modal-body">
                    <input
                        type="number"
                        className="form-control"
                        value={newBDI}
                        onChange={(e) => setNewBDI(e.target.value)}
                    />
                </div>
                <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" onClick={onClose}>Close</button>
                    <button type="button" className="btn btn-primary" onClick={handleSubmit}>Save changes</button>
                </div>
            </Modal>
        </>
    );
};

export default BDIChangeModal;