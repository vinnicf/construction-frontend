import React, { useState, useEffect } from 'react';


const SubItem = ({ subItem, onSubItemChange, BDI }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [codigo, setCodigo] = useState(subItem.codigo || '');
    const [name, setDescription] = useState(subItem.name || '');
    const [unit, setUnit] = useState(subItem.unit || '');
    const [quantity, setQuantity] = useState(subItem.quantity || 0);
    const [unitCost, setUnitCost] = useState(subItem.unitCost || 0);
    const [refId, setRefId] = useState(subItem.refId || '');
    const [costWithBDI, setCostWithBDI] = useState(0);  // Initialize to zero or some other default value


    const handleUpdate = () => {

        const calculatedCostWithBDI = parseFloat((parseFloat(unitCost) * (1 + parseFloat(BDI))).toFixed(2));
        setCostWithBDI(calculatedCostWithBDI);
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
        onSubItemChange(updatedSubItem, 'update');
        setIsEditing(false); // revert to display mode after update
    };

    const handleDelete = () => {
        console.log("Deleting subItem with idd:", subItem.idd);
        onSubItemChange(subItem, 'delete'); // assuming onSubItemChange prop is essentially handleItemChange
        setIsEditing(false); // revert to display mode after deletion
    };


    useEffect(() => {

        if (BDI !== null && unitCost !== null) {
            const initialCostWithBDI = parseFloat((parseFloat(unitCost) * (1 + parseFloat(BDI))).toFixed(2));
            setCostWithBDI(initialCostWithBDI);
        }
    }, [BDI, unitCost]); // Dependency array

    const openModal = () => {

        console.log('Opening the modal...');
    }

    return (
        <tr>
            <td></td>
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

            <td>{isEditing ?
                <button className="btn btn-primary" onClick={handleUpdate}>Atualizar</button> :
                parseFloat(unitCost).toLocaleString(`pt-BR`, { minimumFractionDigits: 2, maximumFractionDigits: 2 })
            }
            </td>


            <td> {/* Cost with BDI column */}
                {isEditing ?
                    <button className="btn btn-danger" onClick={handleDelete}>Excluir</button> :
                    parseFloat(costWithBDI).toLocaleString(`pt-BR`, { minimumFractionDigits: 2, maximumFractionDigits: 2 })
                }
            </td>

            <td className='total-display'>
                {isEditing ?
                    <button className="btn btn-secondary" onClick={() => setIsEditing(false)}>Cancelar</button> :
                    parseFloat((unitCost * quantity * (1 + BDI)).toFixed(2)).toLocaleString(`pt-BR`, { minimumFractionDigits: 2, maximumFractionDigits: 2 })
                }
            </td>
        </tr>
    );
};

export default SubItem;