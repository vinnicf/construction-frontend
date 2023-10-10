import React from 'react';
import '../../styles/buttondeck.css'

const ButtonDeck = ({ stageRefId, onOpenCompositionModal, onAddStage, onEditStage, onDeleteStage }) => {

    const handleAddCompositionClick = () => {
        // Signal to open the modal and set the current stageRefId
        onOpenCompositionModal(stageRefId);
    };

    return (
        <div className="subdeck">
            <button className="btn btn-small btn-primary" onClick={handleAddCompositionClick}>+ Composição</button>
            <button className="btn btn-small btn-secondary" onClick={onAddStage}>+ Etapa</button>
            <button className="btn btn-small btn-warning" onClick={onEditStage}>Editar Etapa</button>
            <button className="btn btn-small btn-danger" onClick={onDeleteStage}>Deletar Etapa</button>
        </div>
    );
};

export default ButtonDeck;
