import React, { useState } from 'react';
import SubItem from './SubItem';

const Stage = ({ stage }) => {
    const [subItems, setSubItems] = useState(stage.subItems);

    const handleSubItemChange = (updatedSubItem) => {
        const updatedSubItems = subItems.map(subItem => subItem.id === updatedSubItem.id ? updatedSubItem : subItem);
        setSubItems(updatedSubItems);
    };

    return (
        <div className="mt-4">
            <table className="table table-bordered">
                <thead className="table-light">
                    <tr>
                        <th>#</th>
                        <th>Code</th>
                        <th>Description</th>
                        <th>Unit</th>
                        <th>Quantity</th>
                        <th>Unit Cost</th>
                        <th>Total Cost</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {subItems.map(subItem =>
                        <SubItem
                            key={subItem.id}
                            subItem={subItem}
                            onSubItemChange={handleSubItemChange}
                        />
                    )}
                </tbody>
            </table>
            <button className="btn btn-secondary" onClick={() => setSubItems([...subItems, { id: subItems.length + 1 }])}>
                Add SubItem
            </button>
        </div>
    );
};

export default Stage;
