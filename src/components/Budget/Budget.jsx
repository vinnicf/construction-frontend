import React, { useEffect, useState } from 'react';
import { parse, v4 as uuidv4 } from 'uuid';

import Stage from './Stage';
import SubItem from './SubItem';
import Totals from './Totals';
import SearchCompositionModal from './SearchCompositionModal';
import processData from './InitialData';
import BDIChangeModal from './BDIChangeModal';
import StageAddModal from './StageAddModal';
import { exportToExcel } from '../../api';
import '../../styles/budget.css'


const Budget = () => {


    const [isEditingTitle, setIsEditingTitle] = useState(false);
    const [showStageForm, setShowStageForm] = useState(false);
    const [isBDIModalOpen, setBDIModalOpen] = useState(false);
    const [isSearchModalOpen, setSearchModalOpen] = useState(false);
    const [currentStageRefId, setCurrentStageRefId] = useState(null);
    const [isAddStageModalOpen, setIsAddStageModalOpen] = useState(false);
    const [appData, setAppData] = useState({
        items: [],
        BDI: 0.1,
        desonerado: 'nao_desonerado',
        name: ''
    });



    const handleBDIChange = (newBDI) => {
        setAppData(prevAppData => {
            return { ...prevAppData, BDI: newBDI };
        });
    };

    const handleDesoneradoChange = (newDesonerado) => {
        setAppData(prevAppData => {
            return { ...prevAppData, desonerado: newDesonerado };
        });
    };

    useEffect(() => {
        window.logItems = () => console.log("Items state:", items);
    }, [appData.items]);

    useEffect(() => {
        const fetchData = async () => {
            let newAppData = {
                items: [],
                BDI: 0.1,
                desonerado: 'nao_desonerado',
                name: ''
            };

            const localData = localStorage.getItem('appData');

            if (localData) {
                // Existing data in local storage
                const parsedData = JSON.parse(localData);
                newAppData = { ...newAppData, ...parsedData };
            } else {
                // No existing data, fetch initial data
                const initialItems = await processData();
                newAppData.items = initialItems;
            }

            // Perform calculations
            for (let item of newAppData.items) {
                if (item.type === "subitem" && item.unitCost !== null) {
                    item.costWithBDI = Math.floor(parseFloat(item.unitCost) * (1 + parseFloat(newAppData.BDI)) * 100) / 100;
                }
            }

            newAppData.items = sortItems(calculateAllStages(newAppData.items));

            // Save to state and local storage
            setAppData(newAppData);
            localStorage.setItem('appData', JSON.stringify(newAppData));
        };

        fetchData();
    }, []);



    useEffect(() => {
        console.log('Items:', appData.items);
    }, [appData.items]);



    useEffect(() => {
        if (appData.items.length > 0) {
            localStorage.setItem('appData', JSON.stringify(appData));
        }
    }, [appData.items, appData.BDI, appData.desonerado, appData.name]);


    useEffect(() => {
        const updatedItems = [...appData.items];  // Create a shallow copy

        let hasChanges = false;

        // Recalculate costWithBDI for all subitems
        for (let item of updatedItems) {
            if (item.type === "subitem" && item.unitCost !== null) {
                const newCostWithBDI = Math.floor(parseFloat(item.unitCost) * (1 + parseFloat(appData.BDI)) * 100) / 100;
                if (newCostWithBDI !== item.costWithBDI) {
                    item.costWithBDI = newCostWithBDI;
                    hasChanges = true;
                }
            }
        }

        // If there are any changes, then update the state and local storage
        if (hasChanges) {
            const finalUpdatedItems = calculateAllStages(updatedItems);
            const newAppData = { ...appData, items: finalUpdatedItems }; // Updating only the 'items' field of appData
            setAppData(newAppData);
            localStorage.setItem('appData', JSON.stringify(newAppData)); // Update local storage too
            console.log('Updating items in the updateditems effect');
        }
    }, [appData.BDI]);  // Dependency array includes only appData.BDI

    const handleOpenCompositionModal = (stageRefId) => {
        setSearchModalOpen(true);
        setCurrentStageRefId(stageRefId);
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

                // Round down to 2 decimal places before adding to total
                const cwbInteger = costWithBDI * 100
                const product = (cwbInteger * quantity) / 100
                const roundedProduct = Math.floor(product * 100) / 100;

                total += roundedProduct;

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

            }
        }

        return [...items];  // return a new array to ensure re-render
    }

    const handleItemChange = (changedItem, action) => {
        console.log('Updating items in the handleitemchange function')

        setAppData(prevAppData => {
            const prevItems = prevAppData.items;  // Extract previous items from appData
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

            // Calculate totals for all stages
            const finalUpdatedItems = calculateAllStages(sortedUpdatedItems);

            return {
                ...prevAppData,
                items: finalUpdatedItems
            };

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
            refId: stageRefId ? `${stageRefId}.1` : `1.${appData.items.length + 1}`,
            type: 'subitem',
            quantity: 1,
            ...composition
        };

        // Use handleItemChange for adding a composition/subitem
        handleItemChange(newSubItem, 'add');
    }

    return (
        <>

            <div className="container mt-5">

                {
                    isEditingTitle ? (
                        <input
                            className="form-control mb-3"
                            value={appData.name}
                            onChange={(e) => {
                                const newName = e.target.value;
                                setAppData(prevAppData => ({
                                    ...prevAppData,
                                    name: newName
                                }));
                            }}
                            onBlur={() => setIsEditingTitle(false)}  // Exit edit mode when the input loses focus
                            autoFocus   // Automatically focus the input when it's rendered
                        />
                    ) : (
                        <div className="title mb-3" onClick={() => setIsEditingTitle(true)}>
                            {appData.name || "Clique para adicionar um nome ao orçamento"}
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
                                <div className="flex-cell">SINAPI 08/2023</div>
                            </div>
                            <div className="flex-row">

                                <div className="your-other-content">
                                    <button onClick={() => exportToExcel(items, BDI, name, desonerado)}>Export to Excel</button>

                                    <button onClick={() => setBDIModalOpen(true)}>Open BDI Modal</button>
                                    <BDIChangeModal
                                        initialBDI={appData.BDI}
                                        initialDesonerado={appData.desonerado}
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
                    <thead className="table-light sticky-header tabela-header">
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
                        {appData.items.map(item => {
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
                                BDI={appData.BDI}
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

                <Totals items={appData.items} BDI={appData.BDI} />


                <SearchCompositionModal
                    isOpen={isSearchModalOpen}
                    onClose={() => setSearchModalOpen(false)}
                    onAddComposition={handleAddComposition}
                    stageRefId={currentStageRefId}
                />
            </div>
        </>
    );
};

export default Budget;
