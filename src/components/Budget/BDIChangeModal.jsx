import React, { useState } from 'react';
import '../../styles/bdichange.css'
import Modal from './Modal';

const BDIChangeModal = ({ initialBDI, initialDesonerado, onBDIChange, onDesoneradoChange, isOpen, onClose }) => {
    const [newBDI, setNewBDI] = useState(initialBDI * 100); // Convert to percent
    const [desonerado, setDesonerado] = useState(initialDesonerado); // Maintain the state locally

    const handleSubmit = () => {
        onBDIChange(newBDI / 100); // Convert back to decimal
        onDesoneradoChange(desonerado); // Pass the updated 'desonerado' state
        onClose(); // Close the modal using the passed-in onClose function
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} title="Definir o BDI e Se o Orçamento é Desonerado">

            <div className="modal-body">
                <div>
                    <label>BDI:</label>
                    <input
                        type="number"
                        className="form-control"
                        value={newBDI}
                        onChange={(e) => setNewBDI(e.target.value)}
                    />
                </div>

                <div>
                    <label>Status:</label>
                    <div>
                        <input
                            type="radio"
                            value="desonerado"
                            checked={desonerado === 'desonerado'}
                            onChange={() => setDesonerado('desonerado')}
                        />
                        <label>Desonerado</label>
                    </div>

                    <div>
                        <input
                            type="radio"
                            value="nao_desonerado"
                            checked={desonerado === 'nao_desonerado'}
                            onChange={() => setDesonerado('nao_desonerado')}
                        />
                        <label>Não Desonerado</label>
                    </div>
                </div>
            </div>
            <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={onClose}>Fechar</button>
                <button type="button" className="btn btn-primary" onClick={handleSubmit}>Salvar</button>
            </div>
        </Modal>
    );
};


export default BDIChangeModal;