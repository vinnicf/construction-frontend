import React, { useEffect, useState } from 'react';
import Stage from './Stage';
import SubItem from './SubItem';
import { fetchCompositions } from '../../api';




const Budget = () => {

    const [name, setName] = useState('');

    const [items, setItems] = useState([
        { refId: '1', type: 'stage', name: 'Initial Stage' },
        { refId: '2', type: 'stage', name: 'Second Stage' },
    ]);

    useEffect(() => {
        const fetchData = async () => {
            const composition1 = await fetchCompositions('89225');
            const composition2 = await fetchCompositions('95282');

            const newItems = [
                ...items,
                { refId: '1.1', type: 'subitem', ...composition1 },
                { refId: '1.2', type: 'subitem', ...composition2 },
            ];

            setItems(newItems);
        };

        fetchData();
    }, []);


    const [showSubItemForm, setShowSubItemForm] = useState(false);

    const addStage = () => {
        const newStage = { refId: (items.length + 1).toString(), type: 'stage', name: 'New Stage' };
        setItems([...items, newStage]);
    };



    const handleAddSubItem = () => {
        // Capture data from form (For now, using dummy data)
        const newSubItem = {
            refId: `${items.length + 1}.1`,
            type: 'subitem',
            codigo: 'NewCode',
            name: 'NewDescription',
            unit: 'Unit',
            quantity: 0,
            unitCost: 0,
        };

        setItems([...items, newSubItem]);
        // Hide the form
        setShowSubItemForm(false);
    };

    const sortedItems = items.sort((a, b) => {
        const partsA = a.refId.split('.').map(Number);
        const partsB = b.refId.split('.').map(Number);
        const len = Math.min(partsA.length, partsB.length);

        for (let i = 0; i < len; i++) {
            if (partsA[i] !== partsB[i]) {
                return partsA[i] - partsB[i];
            }
        }
        return partsA.length - partsB.length;
    });


    return (
        <div className="container mt-5">
            <input
                className="form-control mb-3"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Budget Name"
            />
            <button className="btn btn-primary mb-2 mr-2" onClick={addStage}>Add Stage</button>
            <button className="btn btn-secondary mb-2" onClick={() => setShowSubItemForm(true)}>Add Subitem</button>

            {/* Master Table */}
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
                    {sortedItems.map(item => {
                        if (item.type === 'stage') {
                            return <Stage key={item.refId} stage={item} />;
                        }
                        //Separate SubItem component
                        return <SubItem key={item.refId} subItem={item} />
                    })}


                    {showSubItemForm && (
                        <tr>
                            <td></td>
                            <td><input className="form-control" placeholder="Code" /></td>
                            <td><input className="form-control" placeholder="Description" /></td>
                            <td><input className="form-control" placeholder="Unit" /></td>
                            <td><input className="form-control" placeholder="Quantity" type="number" /></td>
                            <td><input className="form-control" placeholder="Unit Cost" type="number" /></td>
                            <td></td>
                            <td><button className="btn btn-success" onClick={handleAddSubItem}>Submit</button></td>
                        </tr>
                    )}


                </tbody>
            </table>
            <button className="btn btn-primary mt-2" onClick={addStage}>Add Stage</button>
        </div>
    );
};

export default Budget;
