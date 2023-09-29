import React, { useEffect, useState } from 'react';
import Stage from './Stage';
import SubItem from './SubItem';
import SearchCompositionModal from './SearchCompositionModal';
import { v4 as uuidv4 } from 'uuid';
import { fetchCompositions } from '../../api';




const Budget = () => {

    const [name, setName] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [showStageForm, setShowStageForm] = useState(false);
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


        };

        fetchData();

    }, []);


    const [showSubItemForm, setShowSubItemForm] = useState(false);

    const addStage = () => {
        setShowStageForm(true);
    };

    const handleAddStage = (name, refId) => {
        const newStage = {
            idd: uuidv4(),
            refId,
            type: 'stage',
            name
        };
        setItems(sortItems([...items, newStage]));
        setShowStageForm(false);
    };

    const sortItems = (itemsToSort) => {


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


        return sortedItems;
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




                    {
                        showStageForm && (
                            <tr>
                                <td>
                                    <input
                                        className="form-control"
                                        placeholder="Enter refId"
                                        onChange={(e) => setTempRefId(e.target.value)}
                                    />
                                </td>
                                <td>
                                    <input
                                        className="form-control"
                                        placeholder="Enter Stage Name"
                                        onChange={(e) => setTempStageName(e.target.value)}
                                    />
                                </td>
                                <td>
                                    <button onClick={() => handleAddStage(tempStageName, tempRefId)}>Add</button>
                                </td>
                            </tr>
                        )
                    }

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
