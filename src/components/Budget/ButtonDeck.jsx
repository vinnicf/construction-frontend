import React from 'react';
import '../../styles/buttondeck.css'

const ButtonDeck = ({ stageRefId, onOpenCompositionModal, onOpenAddStageModal }) => {

    const handleAddCompositionClick = () => {
        // Signal to open the modal and set the current stageRefId
        onOpenCompositionModal(stageRefId);
    };

    return (
        <div className="subdeck">
            <button className="btn btn-small btn-primary" onClick={handleAddCompositionClick}>+ Composição</button>
            <button className="btn btn-small btn-secondary" onClick={onOpenAddStageModal}>+ Etapa</button>

        </div>
    );
};

export default ButtonDeck;
