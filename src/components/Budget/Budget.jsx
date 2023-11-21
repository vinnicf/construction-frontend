import React, { useEffect, useState, useContext } from 'react';
import { v4 as uuidv4 } from 'uuid';
import AuthContext from '../../AuthContext';

import Stage from './Stage';
import SubItem from './SubItem';
import Totals from './Totals';
import SearchCompositionModal from './SearchCompositionModal';
import SearchInsumoModal from './SearchInsumoModal';
import processData from './InitialData';
import TopContainer from './TopContainer';
import StageAddModal from './StageAddModal';
import NewBudgetModal from './NewBudgetModal';
import ModalMensagem from './ModalMensagem';
import { exportToExcel } from '../../api';
import { fetchOrcamento, transformApiDataToAppFormat, createOrcamentoItem, updateOrcamentoItem, deleteOrcamentoItem } from '../../api/orcamentoapi';
import '../../styles/budget.css'
import Decimal from 'decimal.js';


const Budget = () => {

    const { user } = useContext(AuthContext);
    const [isEditingTitle, setIsEditingTitle] = useState(false);
    const [showStageForm, setShowStageForm] = useState(false);
    const [isBDIModalOpen, setBDIModalOpen] = useState(false);
    const [isSearchModalOpen, setSearchModalOpen] = useState(false);
    const [isInsumoModalOpen, setInsumoModalOpen] = useState(false);
    const [isNewBudgetModalOpen, setNewBudgetModalOpen] = useState(false);
    const [currentStageRefId, setCurrentStageRefId] = useState(null);
    const [isAddStageModalOpen, setIsAddStageModalOpen] = useState(false);
    const [isWelcomeModalOpen, setIsWelcomeModalOpen] = useState(false);

    const [appData, setAppData] = useState({
        items: [],
        BDI: 0.1,
        desonerado: 'nao_desonerado',
        state: 'RS',
        name: ''
    });

    const handleBDIChange = (newBDI) => {
        setAppData(prevAppData => {
            return { ...prevAppData, BDI: newBDI };
        });
    };

    const handleDesoneradoChange = () => {
        console.log('Dummy');
    };

    const handleNewBudgetFormSubmit = (data) => {
        setAppData(prevData => ({
            ...prevData,
            items: [],
            BDI: data.BDI,
            desonerado: data.desonerado,
            state: data.state,
            name: data.name
        }));
    };

    const handleOpenAddInsumoModal = () => {
        setInsumoModalOpen(true);
    };

    const handleOpenNewBudgetModal = () => {
        setNewBudgetModalOpen(true);
    }

    const handleCloseWelcomeModal = () => {
        setIsWelcomeModalOpen(false);
    };

    useEffect(() => {
        window.logItems = () => console.log("Items state:", appData);
    }, [appData]);

    window.toggleModal = () => {
        setIsWelcomeModalOpen(!isWelcomeModalOpen);
    };

    useEffect(() => {
        // Check if the modal has been shown before
        const hasShownModal = localStorage.getItem('hasShownModal');
        if (!hasShownModal) {
            setIsWelcomeModalOpen(true);
            localStorage.setItem('hasShownModal', 'true');
        }
        console.log(user)

        const fetchData = async () => {
            let newAppData = {
                items: [],
                BDI: 0.1,
                state: 'RS',
                desonerado: 'nao_desonerado',
                name: ''
            };

            try {
                const orcamentoData = await fetchOrcamento(5);
                console.log('Fetched Orcamento Data:', orcamentoData);
                if (orcamentoData) {
                    newAppData = transformApiDataToAppFormat(orcamentoData);

                } else {
                    const initialItems = await processData();
                    newAppData.items = initialItems;
                }
            } catch (error) {
                console.error('Error fetching Orcamento data:', error);

            }

            for (let item of newAppData.items) {
                if (item.type === "subitem" && item.unitCost !== null) {
                    item.costWithBDI = Math.floor(parseFloat(item.unitCost) * (1 + parseFloat(newAppData.BDI)) * 100) / 100;
                }
            }

            newAppData.items = sortItems(calculateAllStages(newAppData.items));
            setAppData(newAppData);

        };

        fetchData();
    }, []);



    useEffect(() => {
        console.log('Items:', appData.items);
    }, [appData.items]);


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

        // Check for items with undefined or null refId
        itemsToSort.forEach(item => {
            if (typeof item.refId !== 'string') {
                console.log('Item with invalid refId:', item);
            }
        });

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
                const costWithBDI = new Decimal(parseFloat(child.costWithBDI) || 0);  // Make sure it's a float, default to 0 if it's not a number
                const quantity = new Decimal(parseFloat(child.quantity) || 0); // Same here

                // Round down to 2 decimal places before adding to total
                const roundedProduct = costWithBDI.times(quantity).toDecimalPlaces(2, Decimal.ROUND_DOWN);

                total += roundedProduct.toNumber();

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

    const handleItemChange = async (changedItem, action) => {
        let updatedItems = [...appData.items];
        let itemWithoutId = changedItem;
        console.log("Initial changedItem:", changedItem);

        if (action === 'add') {
            // Optimistically add the item
            const { id, ...tempItemWithoutId } = changedItem;
            itemWithoutId = tempItemWithoutId;

            // Optimistically add the item (without ID)
            updatedItems.push(itemWithoutId);

            console.log("Before API call - Optimistically added item:", updatedItems);

        } else if (action === 'update') {
            // Optimistically update the item
            updatedItems = updatedItems.map(item => item.id === changedItem.id ? changedItem : item);
            console.log("Optimistically updated item:", updatedItems);
        } else if (action === 'delete') {
            // Optimistically remove the item
            updatedItems = updatedItems.filter(item => item.id !== changedItem.id);
        }

        // Apply sorting and calculations
        const sortedUpdatedItems = sortItems(updatedItems);
        const finalUpdatedItems = calculateAllStages(sortedUpdatedItems);

        // Update state optimistically
        setAppData(prevAppData => ({
            ...prevAppData,
            items: finalUpdatedItems
        }));

        try {
            // Make the API call
            if (action === 'add') {
                const newItemFromApi = await createOrcamentoItem(itemWithoutId);
                console.log("New item from API:", newItemFromApi);

                // Replace the item with the one returned from the API
                updatedItems = updatedItems.map(item => {
                    if (item === itemWithoutId) {
                        console.log("Replacing item:", item, "with:", newItemFromApi);
                        return newItemFromApi;
                    }
                    return item;
                });
                console.log("Updated items after API call:", updatedItems);

                // Apply sorting and calculations
                const sortedUpdatedItems = sortItems(updatedItems);
                console.log("Sorted Updated items:", sortedUpdatedItems);
                const finalUpdatedItems = calculateAllStages(sortedUpdatedItems);
                console.log("final updated items:", finalUpdatedItems);

                // Update state with the final list of items including the new item from API
                setAppData(prevAppData => ({
                    ...prevAppData,
                    items: finalUpdatedItems
                }));



            } else if (action === 'update') {
                await updateOrcamentoItem(changedItem.id, changedItem);


            } else if (action === 'delete') {
                await deleteOrcamentoItem(changedItem.id);
            }
        } catch (error) {
            console.error('Error handling item change:', error);
            // If an error occurs, revert the optimistic update
            // Fetch the latest data from the API or roll back to the previous state
        }
    };


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
            subtype: 'composition',
            quantity: 1,
            ...composition
        };

        // Use handleItemChange for adding a composition/subitem
        handleItemChange(newSubItem, 'add');
    }

    const handleAddInsumo = (insumo, stageRefId = null) => {
        const newInsumo = {
            idd: uuidv4(),
            refId: stageRefId ? `${stageRefId}.1` : `1.${appData.items.length + 1}`,
            type: 'subitem',
            subtype: 'insumo',
            quantity: 1,
            ...insumo
        };

        // Use handleItemChange for adding an insumo
        handleItemChange(newInsumo, 'add');
    }

    return (
        <div id="main-container">
            <div>Olá {user.username}</div>
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
                <TopContainer
                    handleOpenAddStageModal={handleOpenAddStageModal}
                    handleOpenNewBudgetModal={handleOpenNewBudgetModal}
                    setSearchModalOpen={setSearchModalOpen}
                    handleOpenAddInsumoModal={handleOpenAddInsumoModal}
                    exportToExcel={exportToExcel}
                    appData={appData}
                    setBDIModalOpen={setBDIModalOpen}
                    isBDIModalOpen={isBDIModalOpen}
                    handleBDIChange={handleBDIChange}
                    handleDesoneradoChange={handleDesoneradoChange}
                />

                <StageAddModal
                    isOpen={isAddStageModalOpen}
                    onClose={handleCloseAddStageModal}
                    onAddStage={handleAddStage}
                />

                {/* Master Table */}
                <table className="table table-bordered table-hover table-custom">
                    <thead className="table-light sticky-header tabela-header">
                        <tr className='header-row-stick'>
                            <th style={{ width: '0', padding: '0', margin: '0' }}></th>
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
                                    handleOpenAddInsumoModal={handleOpenAddInsumoModal}
                                    onStageChange={handleItemChange}
                                />;
                            }
                            //Separate SubItem component
                            return <SubItem
                                key={item.id}
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
                    state={appData.state}
                    desonerado={appData.desonerado}
                />

                <SearchInsumoModal
                    isOpen={isInsumoModalOpen}
                    onClose={() => setInsumoModalOpen(false)}
                    onAddInsumo={handleAddInsumo}
                    stageRefId={currentStageRefId}
                    state={appData.state}
                    desonerado={appData.desonerado}
                />
                <NewBudgetModal
                    isOpen={isNewBudgetModalOpen}
                    onClose={() => setNewBudgetModalOpen(false)}
                    onSubmit={handleNewBudgetFormSubmit}

                />
                <ModalMensagem isOpen={isWelcomeModalOpen} onClose={handleCloseWelcomeModal} />


            </div>
        </div>
    );
};

export default Budget;