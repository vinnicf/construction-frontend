import React, { useEffect, useState } from 'react';
import Stage from './Stage';
import SubItem from './SubItem';
import SearchCompositionModal from './SearchCompositionModal';
import { v4 as uuidv4 } from 'uuid';
import { fetchCompositions } from '../../api';




const Budget = () => {

    const [name, setName] = useState('');
    const [showModal, setShowModal] = useState(false);

    const [items, setItems] = useState([
        { idd: uuidv4(), refId: '1', type: 'stage', name: 'Initial Stage' },
        { idd: uuidv4(), refId: '2', type: 'stage', name: 'Second Stage' },
    ]);

    useEffect(() => {
        const fetchData = async () => {
            const composition1 = await fetchCompositions({ codigo: '104692' });
            const composition2 = await fetchCompositions({ codigo: '95282' });


            const newItems = [
                ...items,
                { idd: uuidv4(), refId: '4', type: 'subitem', ...composition1[0] },
                { idd: uuidv4(), refId: '1.2', type: 'subitem', ...composition2[0] },
                { idd: uuidv4(), refId: '1.1', type: 'subitem', ...composition2[0] },
            ];
            setItems(sortItems(newItems));
            console.log(composition2[0])


        };

        fetchData();

    }, []);


    const [showSubItemForm, setShowSubItemForm] = useState(false);

    const addStage = () => {
        const newStage = {
            idd: uuidv4(),
            refId: (items.length + 1).toString(),
            type: 'stage',
            name: 'New Stage'
        };
        setItems(sortItems([...items, newStage])); // <-- Use the sorting function
    };

    const sortItems = (itemsToSort) => {
        console.log('Before sorting:', itemsToSort.map(item => item.refId));

        // Create a shallow copy for immutable sorting
        const itemsToSortCopy = [...itemsToSort];

        const sortedItems = itemsToSortCopy.sort((a, b) => {
            // Split refId by period and convert to numbers
            const partsA = a.refId.split('.').map(Number);
            const partsB = b.refId.split('.').map(Number);

            console.log(`Comparing: ${a.refId} with ${b.refId}`);

            // Iterate over the parts to find the first difference
            for (let i = 0; i < Math.min(partsA.length, partsB.length); i++) {
                if (partsA[i] !== partsB[i]) {
                    return partsA[i] - partsB[i];
                }
            }

            // If no differences were found so far, sort by depth (length of refId parts)
            return partsA.length - partsB.length;
        });
        console.log('After sorting:', sortedItems.map(item => item.refId));

        return sortedItems;
    };

    const handleAddSubItem = () => {
        // Capture data from form (For now, using dummy data)
        const newSubItem = {
            idd: uuidv4(),
            refId: `1.3`,
            type: 'subitem',
            codigo: 'NewCode',
            name: 'NewDescription',
            unit: 'Unit',
            quantity: 0,
            unitCost: 0,
        };

        setItems(sortItems([...items, newSubItem]));
        // Hide the form
        setShowSubItemForm(false);
    };

    const handleAddComposition = (composition) => {
        const newSubItem = {
            id: uuidv4(),
            refId: `1.${items.length + 1}`,
            type: 'subitem',
            ...composition
        };
        setItems(sortItems([...items, newSubItem]));
    }

    const handleSubItemChange = (updatedSubItem) => {
        console.log("Updating sub item", updatedSubItem);
        setItems(prevItems => {
            // Update the item first
            const updatedItems = prevItems.map(item =>
                item.idd === updatedSubItem.idd ? updatedSubItem : item
            );

            // Now, sort the updatedItems
            return sortItems(updatedItems);

        });
    };



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
                        <th>Código</th>
                        <th>Descrição</th>
                        <th>Unidade</th>
                        <th>Quantidade</th>
                        <th>Custo Unitário</th>
                        <th>Total Cost</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {items.map(item => {
                        if (item.type === 'stage') {
                            return <Stage key={item.idd} stage={item} />;
                        }
                        //Separate SubItem component
                        return <SubItem key={item.idd} subItem={item} onSubItemChange={handleSubItemChange} />;
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
            <button className="btn btn-secondary mb-2" onClick={() => setShowModal(true)}>Adicionar Composição</button>

            <SearchCompositionModal
                isOpen={showModal}
                onClose={() => setShowModal(false)}
                onAddComposition={handleAddComposition}
            />
        </div>
    );
};

export default Budget;
