import React from 'react';
import '../../styles/buttondeck.css'
import AddIcon from '../../assets/plus-circle.svg'

const ButtonDeck = ({ stageRefId, onOpenCompositionModal, onOpenAddStageModal, handleOpenAddInsumoModal }) => {

    const handleAddCompositionClick = () => {
        // Signal to open the modal and set the current stageRefId
        onOpenCompositionModal(stageRefId);
    };

    return (
        <div className="subdeck">
            <button className="btn btn-small btn-dark" onClick={onOpenAddStageModal}><span className="btn-icon"><img src={AddIcon} alt="" /></span> Etapa</button>
            <button className="btn btn-small btn-primary" onClick={handleAddCompositionClick}><span className="btn-icon"><img src={AddIcon} alt="" /></span> Composição</button>
            <button className="btn btn-secondary btn-limited" onClick={handleOpenAddInsumoModal}><span className="btn-icon"><img src={AddIcon} alt="" /></span>Insumo</button>
        </div>
    );
};

export default ButtonDeck;
