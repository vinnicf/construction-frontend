import React, { useEffect, useState } from 'react';
import Stage from './Stage';
import SubItem from './SubItem';
import Totals from './Totals';
import SearchCompositionModal from './SearchCompositionModal';
import { v4 as uuidv4 } from 'uuid';
import '../../styles/budget.css'
import processData from './InitialData';
import BDIChangeModal from './BDIChangeModal';
import StageAddModal from './StageAddModal';


const Budget = () => {

    const [name, setName] = useState('');
    const [isEditingTitle, setIsEditingTitle] = useState(false);
    const [showStageForm, setShowStageForm] = useState(false);
    const [items, setItems] = useState([]);
    const [BDI, setBDI] = useState(0.1); // Initialize the BDI state
    const [isBDIModalOpen, setBDIModalOpen] = useState(false);
    const [isSearchModalOpen, setSearchModalOpen] = useState(false);
    const [currentStageRefId, setCurrentStageRefId] = useState(null);
    const [isAddStageModalOpen, setIsAddStageModalOpen] = useState(false);
    const [desonerado, setDesonerado] = useState('nao_desonerado');



    const handleBDIChange = (newBDI) => {
        setBDI(newBDI);
    };

    const handleDesoneradoChange = (newDesonerado) => {
        setDesonerado(newDesonerado);
    };

    useEffect(() => {
        const fetchData = async () => {
            const initialItems = await processData();
            for (let item of initialItems) {
                if (item.type === "subitem" && item.unitCost !== null) {
                    item.costWithBDI = parseFloat((parseFloat(item.unitCost) * (1 + parseFloat(BDI))).toFixed(2));
                }
            }

            console.log("Initial items after fetching and processing:");
            initialItems.forEach(item => {
                console.log(`Name: ${item.name}, UnitCost: ${item.unitCost}`);
            });

            const updatedItems = calculateAllStages(initialItems);
            setItems(sortItems(updatedItems));

        };

        fetchData();

    }, []);

    useEffect(() => {
        const updatedItems = [...items];  // Create a shallow copy

        // Recalculate costWithBDI for all subitems
        for (let item of updatedItems) {
            if (item.type === "subitem" && item.unitCost !== null) {
                item.costWithBDI = parseFloat((parseFloat(item.unitCost) * (1 + parseFloat(BDI))).toFixed(2));
            }
        }

        // Recalculate totals for all stages
        const finalUpdatedItems = calculateAllStages(updatedItems);

        // Update the state
        setItems(finalUpdatedItems);
    }, [BDI]);

    const handleOpenCompositionModal = (stageRefId) => {
        setSearchModalOpen(true);
        setCurrentStageRefId(stageRefId);
    };


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
                const costWithBDI = parseFloat(child.costWithBDI) || 0;  // Make sure it's a float, default to 0 if it's not a number
                const quantity = parseFloat(child.quantity) || 0; // Same here

                total += costWithBDI * quantity;
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
            console.log(`handleItemChange called with action: ${action} and idd: ${changedItem.idd}`); // Debug
            let updatedItems;

            console.log("Prev items:", prevItems);
            console.log("Changed item:", changedItem);
            console.log("Action:", action);

            if (action === 'update') {
                updatedItems = prevItems.map(item => item.idd === changedItem.idd ? changedItem : item);
            } else if (action === 'add') {
                updatedItems = [...prevItems, changedItem];
            } else if (action === 'delete') {
                updatedItems = prevItems.filter(item => item.idd !== changedItem.idd);
            } else {
                return prevItems;
            }

            // Sort the items
            const sortedUpdatedItems = sortItems(updatedItems);

            // Calculate totals for all stages and return
            return calculateAllStages(sortedUpdatedItems);
        });
    }


    const handleOpenAddStageModal = () => {
        setIsAddStageModalOpen(true);
    };

    const handleCloseAddStageModal = () => {
        setIsAddStageModalOpen(false);
    };


    const handleAddStage = (name, refId) => {
        const newStage = {
            idd: uuidv4(),
            refId,
            type: 'stage',
            name
        };

        // 2. Use handleItemChange for adding stage
        handleItemChange(newStage, 'add');
    };

    const handleAddComposition = (composition, stageRefId = null) => {
        const newSubItem = {
            idd: uuidv4(),
            refId: stageRefId ? `${stageRefId}.1` : `1.${items.length + 1}`, // or whatever logic you want
            type: 'subitem',
            quantity: 1,
            ...composition
        };

        // Use handleItemChange for adding a composition/subitem
        handleItemChange(newSubItem, 'add');
    }







    return (
        <div className="container mt-5">

            {
                isEditingTitle ? (
                    <input
                        className="form-control mb-3"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        onBlur={() => setIsEditingTitle(false)}  // Exit edit mode when the input loses focus
                        autoFocus   // Automatically focus the input when it's rendered
                    />
                ) : (
                    <div className="title mb-3" onClick={() => setIsEditingTitle(true)}>
                        {name || "Clique para adicionar um nome ao orçamento"}
                    </div>
                )
            }

            <div className="topcontainer">
                <div className="buttons-container">
                    <button className="btn btn-primary mb-2 mr-2" onClick={handleOpenAddStageModal}>Adicionar Etapa</button>
                    <button className="btn btn-danger mb-2 mr-2" onClick={() => setSearchModalOpen(true)}>Adicionar Composição</button>
                </div>
                <div className="dados-container my-2" style={{ margin: '10px' }}>
                    <div className="flex-container">
                        <div className="flex-row">
                            <div className="flex-cell bg-light" style={{ width: '50%' }}>Bancos</div>
                            <div className="flex-cell">SINAPI 09/2023</div>
                        </div>
                        <div className="flex-row">

                            <div className="your-other-content">
                                <button onClick={() => setBDIModalOpen(true)}>Open BDI Modal</button>
                                <BDIChangeModal
                                    initialBDI={BDI}
                                    initialDesonerado={desonerado}
                                    onBDIChange={handleBDIChange}
                                    onDesoneradoChange={handleDesoneradoChange}
                                    isOpen={isBDIModalOpen}
                                    onClose={() => setBDIModalOpen(false)}
                                />
                            </div>
                        </div>
                        <div className="flex-row">
                            <div className="flex-cell bg-light">Encargos Sociais</div>
                            <div className="flex-cell">
                                <p>Não desonerada</p>
                                <p>Horista</p>
                                <p>Mensalista</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <StageAddModal
                isOpen={isAddStageModalOpen}
                onClose={handleCloseAddStageModal}
                onAddStage={handleAddStage}
            />

            {/* Master Table */}
            <table className="table table-bordered table-hover">
                <thead className="table-light sticky-header">
                    <tr>
                        <th></th>
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
                            return <Stage
                                key={item.idd}
                                stage={item}
                                handleOpenCompositionModal={handleOpenCompositionModal}
                                handleOpenAddStageModal={handleOpenAddStageModal}
                                onStageChange={handleItemChange}
                            />;
                        }
                        //Separate SubItem component
                        return <SubItem
                            key={item.idd}
                            subItem={item}
                            BDI={BDI}
                            onSubItemChange={handleItemChange} />;
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

            <Totals items={items} BDI={BDI} />


            <SearchCompositionModal
                isOpen={isSearchModalOpen}
                onClose={() => setSearchModalOpen(false)}
                onAddComposition={handleAddComposition}
                stageRefId={currentStageRefId}
            />
        </div>
    );
};

export default Budget;
