import { v4 as uuidv4 } from 'uuid';
import { fetchCompositions } from '../../api';

const initialStages = [
    {
        refId: '1',
        name: "Serviços Iniciais",
        type: 'stage',
    },
    { refId: '1.1', codigo: '99059', quantity: 65, type: 'subitem' },
    { refId: '1.2', codigo: '98525', quantity: 400, type: 'subitem' },
    { refId: '1.3', codigo: '96521', quantity: 82.5, type: 'subitem' },
    { refId: '1.4', codigo: '96622', quantity: 150, type: 'subitem' },

    {
        refId: '2',
        name: "Fundações e Estrutura em Concreto Armado",
        type: 'stage',
    },
    {
        refId: '2.1',
        name: "Fundações e Vigas Baldrame",
        type: 'stage',
    },
    { refId: '2.1.1', codigo: '96535', quantity: 60, type: 'subitem' },
    { refId: '2.1.2', codigo: '96558', quantity: 16, type: 'subitem' },
    { refId: '2.1.3', codigo: '96543', quantity: 412, type: 'subitem' },
    { refId: '2.1.4', codigo: '96546', quantity: 398, type: 'subitem' },


    {
        refId: '2.2',
        name: "Vigas de Baldrame",
        type: 'stage',
    },
    { refId: '2.2.1', codigo: '103674', quantity: 14, type: 'subitem' },
    { refId: '2.2.2', codigo: '96547', quantity: 315, type: 'subitem' },
    {
        refId: '3',
        name: "Alvenarias e Paredes, com Acabamentos",
        type: 'stage',
    },
    { refId: '3.1', codigo: '103330', quantity: 120, type: 'subitem' },
    { refId: '3.2', codigo: '103324', quantity: 63, type: 'subitem' },
    { refId: '3.3', codigo: '87905', quantity: 363, type: 'subitem' },
    { refId: '3.4', codigo: '87529', quantity: 363, type: 'subitem' },
    { refId: '3.5', codigo: '95626', quantity: 63, type: 'subitem' },
    { refId: '3.6', codigo: '88497', quantity: 120, type: 'subitem' },

    {
        refId: '4',
        name: "Esquadrias",
        type: 'stage',
    },
    { refId: '4.1', codigo: '90846', quantity: 1, type: 'subitem' },
    { refId: '4.2', codigo: '90821', quantity: 4, type: 'subitem' },
    { refId: '4.3', codigo: '90820', quantity: 1, type: 'subitem' },
    { refId: '4.4', codigo: '100666', quantity: 6.72, type: 'subitem' },
    { refId: '4.5', codigo: '100668', quantity: 1.20, type: 'subitem' },

    {
        refId: '5',
        name: "Cobertura",
        type: 'stage',
    },
    { refId: '5.1', codigo: '92575', quantity: 180, type: 'subitem' },
    { refId: '5.2', codigo: '94226', quantity: 180, type: 'subitem' },
    { refId: '5.3', codigo: '94195', quantity: 180, type: 'subitem' }
];


const processData = async () => {
    let processedData = [];

    for (let item of initialStages) {
        if (item.type === 'stage') {
            // If it's a stage, we just push it to the processed data array after adding a UUID
            processedData.push({
                ...item,
                idd: uuidv4()
            });
        } else if (item.type === 'subitem') {
            // If it's a subitem, fetch additional data for it, then push
            const fetchedData = await fetchCompositions({ codigo: item.codigo });
            processedData.push({
                ...item, // Spread existing item data
                idd: uuidv4(),
                ...fetchedData[0]  // Incorporate fetched data
            });
        }
    }

    return processedData;
};

export default processData;