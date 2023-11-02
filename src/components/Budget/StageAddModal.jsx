import React, { useState } from 'react';
import Modal from "./Modal";

const StageAddModal = ({ isOpen, onClose, onAddStage }) => {
    const [newStageName, setNewStageName] = useState('');
    const [newRefId, setNewRefId] = useState('');

    const handleSubmit = () => {
        if (newStageName && newRefId) {
            onAddStage(newStageName, newRefId);
            setNewStageName(''); // reset the stage name state
            setNewRefId(''); // reset the refId state
            onClose(); // close the modal
        }
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} title="Adicionar Etapa no Orçamento">

            <div className="modal-body">
                <input
                    type="text"
                    className="form-control mt-3 m-2"
                    placeholder="Nº do Item"
                    value={newRefId}
                    onChange={(e) => setNewRefId(e.target.value)}
                />
                <input
                    type="text"
                    className="form-control m-2"
                    placeholder="Nome da Etapa"
                    value={newStageName}
                    onChange={(e) => setNewStageName(e.target.value)}
                />
            </div>
            <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={onClose}>Fechar</button>
                <button type="button" className="btn btn-primary" onClick={handleSubmit}>Adicionar Etapa</button>
            </div>
        </Modal>
    );
};

export default StageAddModal;