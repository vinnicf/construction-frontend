import React, { useEffect, useState } from 'react';
import Stage from './Stage';
import SubItem from './SubItem';
import Totals from './Totals';
import SearchCompositionModal from './SearchCompositionModal';
import { v4 as uuidv4 } from 'uuid';
import { fetchCompositions } from '../../api';
import '../../styles/budget.css'

const BDI = 0.1;


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
            const composition1 = await fetchCompositions({ codigo: '89869' });
            const composition2 = await fetchCompositions({ codigo: '95282' });


            const newItems = [
                ...items,
                { idd: uuidv4(), refId: '4', type: 'subitem', quantity: 1.5, ...composition1[0] },
                { idd: uuidv4(), refId: '1.2', type: 'subitem', quantity: 1.5, ...composition2[0] },
                { idd: uuidv4(), refId: '1.1', type: 'subitem', quantity: 1.5, ...composition2[0] },
            ];
            setItems(sortItems(newItems));


        };

        fetchData();

    }, []);



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


    const totalWithoutBDI = items.reduce((sum, item) => {
        if (item.type === 'subitem') {
            console.log(item.unitCost, item.quantity);
            return sum + (item.unitCost * item.quantity);
        }
        return sum;
    }, 0);

    const totalBDI = items.reduce((sum, item) => {
        if (item.type === 'subitem') {
            console.log(item.unitCost, BDI, item.quantity);
            return sum + (item.unitCost * BDI * item.quantity);
        }
        return sum;
    }, 0);

    const grandTotal = totalWithoutBDI + totalBDI;


    const handleAddComposition = (composition) => {
        const newSubItem = {
            id: uuidv4(),
            refId: `1.${items.length + 1}`,
            type: 'subitem',
            quantity: 1,
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

            <div className="topcontainer">
                <div className="buttons-container">
                    <button className="btn btn-primary mb-2 mr-2" onClick={addStage}>Adicionar Etapa</button>
                    <button className="btn btn-danger mb-2 mr-2" onClick={() => setShowModal(true)}>Adicionar Composição</button>
                </div>
                <div className="dados-container my-2">
                    <table className="table table-bordered" style={{ margin: '10px' }}>
                        <tbody>
                            <tr>
                                <td className="bg-light" style={{ width: '50%' }}>Bancos</td>
                                <td>SINAPI 09/2023</td>
                            </tr>
                            <tr>
                                <td className="bg-light">BDI</td>
                                <td>10%</td>
                            </tr>
                            <tr>
                                <td className="bg-light">Encargos Sociais</td>
                                <td><p>Não desonerada</p>
                                    <p>Horista</p>
                                    <p>Mensalista</p>
                                </td>
                            </tr>

                        </tbody>
                    </table>
                </div>
            </div>



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
                        <th>Cost with BDI</th>
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
                <Totals items={items} BDI={BDI} />


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
