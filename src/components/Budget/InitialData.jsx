import { v4 as uuidv4 } from 'uuid';
import { fetchCompositionByCodigo } from '../../api';

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
    { refId: '2.2.2', codigo: '96547', quantity: 315, type: 'subitem' }

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
            const fetchedData = await fetchCompositionByCodigo(item.codigo);
            processedData.push({
                ...item, // Spread existing item data
                idd: uuidv4(),
                ...fetchedData  // Incorporate fetched data
            });
        }
    }

    return processedData;
};

export default processData;