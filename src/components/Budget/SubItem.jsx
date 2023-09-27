import React, { useState } from 'react';

const SubItem = ({ subItem, onSubItemChange }) => {
    const [codigo, setCodigo] = useState(subItem.codigo || '');
    const [description, setDescription] = useState(subItem.description || '');
    const [unit, setUnit] = useState(subItem.unit || '');
    const [quantity, setQuantity] = useState(subItem.quantity || 0);
    const [unitCost, setUnitCost] = useState(subItem.unitCost || 0);

    const handleUpdate = () => {
        const updatedSubItem = {
            ...subItem,
            codigo,
            description,
            unit,
            quantity,
            unitCost,
            totalCost: unitCost * quantity
        };

        onSubItemChange(updatedSubItem);
    };

    return (
        <tr>
            <td>{subItem.id}</td>
            <td><input className="form-control" value={codigo} onChange={(e) => setCodigo(e.target.value)} /></td>
            <td><input className="form-control" value={description} onChange={(e) => setDescription(e.target.value)} /></td>
            <td>{unit}</td>
            <td><input className="form-control" type="number" value={quantity} onChange={(e) => setQuantity(Number(e.target.value))} /></td>
            <td>{unitCost}</td>
            <td>{unitCost * quantity}</td>
            <td><button className="btn btn-sm btn-info" onClick={handleUpdate}>Update</button></td>
        </tr>
    );
};

export default SubItem;
