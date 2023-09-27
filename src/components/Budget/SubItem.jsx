import React, { useState } from 'react';

const SubItem = ({ subItem, onSubItemChange }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [codigo, setCodigo] = useState(subItem.codigo || '');
    const [name, setDescription] = useState(subItem.name || '');
    const [unit, setUnit] = useState(subItem.unit || '');
    const [quantity, setQuantity] = useState(subItem.quantity || 0);
    const [unitCost, setUnitCost] = useState(subItem.unitCost || 0);


    const handleUpdate = () => {
        const updatedSubItem = {
            ...subItem,
            codigo,
            name,
            unit,
            quantity,
            unitCost,
            totalCost: unitCost * quantity
        };

        onSubItemChange(updatedSubItem);
        setIsEditing(false); // revert to display mode after update
    };

    return (
        <tr>
            <td>{subItem.id}</td>


            {isEditing ? (
                <td><input className="form-control" value={codigo} onChange={(e) => setCodigo(e.target.value)} /></td>
            ) : (
                <td onClick={() => setIsEditing(true)}>{codigo}</td> // Clicking on the text will make it editable
            )}

            {isEditing ? (
                <td><input className="form-control" value={name} onChange={(e) => setDescription(e.target.value)} /></td>
            ) : (<td onClick={() => setIsEditing(true)}>{name}</td> // Clicking on the text will make it editable
            )}

            <td>{unit}</td>
            <td><input className="form-control" type="number" value={quantity} onChange={(e) => setQuantity(Number(e.target.value))} /></td>
            <td>{unitCost}</td>
            <td>{unitCost * quantity}</td>
            {isEditing ? (
                <button className="btn btn-sm btn-info" onClick={handleUpdate}>Update</button>
            ) : (
                <button>Edit</button>
            )}
        </tr>
    );
};

export default SubItem;
