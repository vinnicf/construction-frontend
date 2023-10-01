import React, { useEffect, useState } from 'react';
import Stage from './Stage';
import SubItem from './SubItem';
import Totals from './Totals';
import SearchCompositionModal from './SearchCompositionModal';
import { v4 as uuidv4 } from 'uuid';
import { fetchCompositions } from '../../api';
import '../../styles/budget.css'
import processData from './InitialData';

const BDI = 0.1;


const Budget = () => {

    const [name, setName] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [showStageForm, setShowStageForm] = useState(false);
    const [items, setItems] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const initialItems = await processData();
            const updatedItems = calculateAllStages(initialItems);
            setItems(sortItems(updatedItems));

        };

        fetchData();

    }, []);



    const addStage = () => {
        setShowStageForm(true);
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

    // Helper function to get children of a given refId
    const getChildren = (refId, items) => {
        return items.filter(item => item.refId.startsWith(refId + ".") && item.refId.split(".").length === refId.split(".").length + 1);
    }

    // Helper function to calculate the total for a given refId (stage or subitem)
    const calculateTotalForRefId = (refId, items) => {
        let total = 0;

        const directChildren = getChildren(refId, items);
        for (let child of directChildren) {
            if (child.type === "subitem") {
                total += (child.costWithBDI || child.unitCost) * child.quantity;  // or use the calculated cost with BDI
            } else if (child.type === "stage") {
                total += calculateTotalForRefId(child.refId, items);
            }
        }

        return total;
    }

    // Calculate totals for all stages and update their total costs
    const calculateAllStages = (items) => {
        for (let item of items) {
            if (item.type === "stage") {
                item.totalCost = calculateTotalForRefId(item.refId, items);

                console.log(`Total for stage ${item.name} (RefId: ${item.refId}): ${item.totalCost}`);
            }
        }

        return [...items];  // return a new array to ensure re-render
    }


    const handleItemChange = (changedItem, action) => {
        setItems(prevItems => {
            let updatedItems;

            if (action === 'update') {
                updatedItems = prevItems.map(item => item.idd === changedItem.idd ? changedItem : item);
            } else if (action === 'add') {
                updatedItems = [...prevItems, changedItem];
            } else {
                return prevItems;
            }

            // Calculate totals for all stages and return
            return calculateAllStages(updatedItems);
        });
    }

    const handleAddStage = (name, refId) => {
        const newStage = {
            idd: uuidv4(),
            refId,
            type: 'stage',
            name
        };

        // 2. Use handleItemChange for adding stage
        handleItemChange(newStage, 'add');
        setShowStageForm(false);
    };

    const handleAddComposition = (composition) => {
        const newSubItem = {
            idd: uuidv4(),
            refId: `1.${items.length + 1}`,
            type: 'subitem',
            quantity: 1,
            ...composition
        };

        // Use handleItemChange for adding a composition/subitem
        handleItemChange(newSubItem, 'add');
    }



    const handleSubItemChange = (updatedSubItem) => {

        handleItemChange(updatedSubItem, 'update');
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
            <table className="table table-bordered table-hover">
                <thead className="table-light">
                    <tr>
                        <th>Item</th>
                        <th>Código</th>
                        <th>Descrição</th>
                        <th>Unidade</th>
                        <th>QTD</th>
                        <th>Custo Unit</th>
                        <th>Custo com BDI</th>
                        <th>Total</th>

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
