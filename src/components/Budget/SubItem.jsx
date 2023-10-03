import React, { useState } from 'react';

const BDI = 0.1;
const SubItem = ({ subItem, onSubItemChange }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [codigo, setCodigo] = useState(subItem.codigo || '');
    const [name, setDescription] = useState(subItem.name || '');
    const [unit, setUnit] = useState(subItem.unit || '');
    const [quantity, setQuantity] = useState(subItem.quantity || 0);
    const [unitCost, setUnitCost] = useState(subItem.comp_cost || 0);
    const [refId, setRefId] = useState(subItem.refId || '');





    const handleUpdate = () => {
        const costWithBDI = parseFloat((unitCost * (1 + BDI)).toFixed(2));
        const updatedSubItem = {
            ...subItem,
            refId,
            codigo,
            name,
            unit,
            quantity,
            unitCost,
            costWithBDI,
            totalCost: unitCost * quantity
        };
        console.log("SubItem update:", updatedSubItem);
        onSubItemChange(updatedSubItem);
        setIsEditing(false); // revert to display mode after update
    };


    const openModal = () => {

        console.log('Opening the modal...');
    }
    return (
        <tr>
            {isEditing ? (
                <td><input className="form-control" value={refId} onChange={(e) => setRefId(e.target.value)} /></td>
            ) : (
                <td onClick={() => setIsEditing(true)}>{refId}</td>
            )}


            {isEditing ? (
                <td>{codigo} </td>
            ) : (
                <td onClick={openModal}>{codigo}</td>
            )}

            {isEditing ? (
                <td><input className="form-control" value={name} onChange={(e) => setDescription(e.target.value)} /></td>
            ) : (
                <td onClick={() => setIsEditing(true)}>{name}</td>
            )}

            <td>{unit}</td>
            {isEditing ? (
                <td><input className="form-control" type="number" value={quantity} onChange={(e) => setQuantity(Number(e.target.value))} /></td>
            ) : (
                <td onClick={() => setIsEditing(true)}>{quantity}</td>
            )}

            <td>{unitCost}</td>
            <td> {/* Cost with BDI column */}
                {isEditing ?
                    <button className="btn btn-primary" onClick={() => {
                        // handle update logic here
                        setIsEditing(false);
                    }}>Update</button> :
                    parseFloat((unitCost * (1 + BDI)).toFixed(2))
                }
            </td>

            <td className='total-display'>
                {isEditing ?
                    <button className="btn btn-secondary" onClick={() => setIsEditing(false)}>Cancel</button> :
                    parseFloat((unitCost * quantity * (1 + BDI)).toFixed(2)).toLocaleString(`pt-BR`, { minimumFractionDigits: 2, maximumFractionDigits: 2 })
                }
            </td>

        </tr>
    );
};

export default SubItem;
