import React, { useState } from 'react';
import ButtonDeck from './ButtonDeck';

const Stage = ({ stage, handleOpenCompositionModal }) => {
    const [isHovered, setIsHovered] = useState(false);

    const handleHover = () => {
        setIsHovered(true);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
    };

    return (
        <>
            <tr
                onMouseOver={handleHover}
                onMouseLeave={handleMouseLeave}
            >
                <td style={{ width: '0', padding: '0', margin: '0' }}>
                    <div className="stage-actions" style={{ display: isHovered ? 'block' : 'none' }}>

                        <ButtonDeck
                            stageRefId={stage.refId}
                            onOpenCompositionModal={handleOpenCompositionModal}
                        />

                    </div>
                </td>
                <td>{stage.refId}</td>
                <td></td>
                <td colSpan="5" className="stage-name">{stage.name}</td>
                <td className='total-display'>{
                    stage.totalCost?.toLocaleString(`pt-BR`, { minimumFractionDigits: 2, maximumFractionDigits: 2 })
                }
                </td>
            </tr>
        </>
    );
};

export default Stage;
