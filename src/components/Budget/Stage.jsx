import React, { useState } from 'react';
import ButtonDeck from './ButtonDeck';

const Stage = ({ stage, handleOpenCompositionModal, handleOpenAddStageModal, onStageChange }) => {
    const [isHovered, setIsHovered] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [name, setName] = useState(stage.name);
    const [refId, setRefId] = useState(stage.refId);

    const handleHover = () => {
        setIsHovered(true);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
    };

    const handleUpdate = () => {
        const updatedStage = {
            ...stage,
            name,
            refId
        };

        onStageChange(updatedStage, 'update');
        setIsEditing(false);
    };

    return (
        <>
            <tr
                onMouseOver={handleHover}
                onMouseLeave={handleMouseLeave}
            >
                {isEditing ? (<td className="hidden-cell"></td>) : (
                    <td style={{ width: '0', padding: '0', margin: '0' }}>
                        <div className="stage-actions" style={{ display: isHovered ? 'block' : 'none' }}>
                            <ButtonDeck
                                stageRefId={stage.refId}
                                onOpenCompositionModal={handleOpenCompositionModal}
                                onOpenAddStageModal={handleOpenAddStageModal}
                            />
                        </div>
                    </td>)}


                {isEditing ? (
                    <td><input className="form-control" value={refId} onChange={(e) => setRefId(e.target.value)} /></td>
                ) : (
                    <td onClick={() => setIsEditing(true)}>{refId}</td>
                )}
                <td></td>

                {isEditing ? (
                    <td colSpan="5">
                        <input className="form-control" value={name} onChange={(e) => setName(e.target.value)} />
                        <button className="btn btn-primary" onClick={handleUpdate}>Atualizar</button>
                        <button className="btn btn-secondary" onClick={() => setIsEditing(false)}>Cancelar</button>
                    </td>
                ) : (
                    <td colSpan="5" className="stage-name" onClick={() => setIsEditing(true)}>{name}</td>

                )}

                <td className='total-display'>{
                    stage.totalCost?.toLocaleString(`pt-BR`, { minimumFractionDigits: 2, maximumFractionDigits: 2 })
                }
                </td>

            </tr>
        </>
    );
};

export default Stage;
