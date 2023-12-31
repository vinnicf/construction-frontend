import React, { useState } from 'react';
import Modal from './Modal';


const states = [
    'AC', 'AL', 'AP', 'AM',
    'BA', 'CE', 'DF', 'ES',
    'GO', 'MA', 'MT', 'MS',
    'MG', 'PA', 'PB', 'PR',
    'PE', 'PI', 'RJ', 'RN',
    'RO', 'RR', 'RS', 'SC',
    'SE', 'SP', 'TO'
];

// Month options
const monthOptions = [
    { display: '09/2023', value: '202309' },
    { display: '10/2023', value: '202310' }
];


const NewBudgetModal = ({ isOpen, onClose, onSubmit }) => {
    const [formData, setFormData] = useState({
        name: 'Orçamento de Obra',
        bdi: '0.1',
        desonerado: 'nao_desonerado',
        state: 'SP',
        datasinapi: '202310'
    });

    const handleChange = (e) => {
        const { name, value } = e.target;

        let adjustedValue = name === 'bdi' ? parseFloat(value) / 100 : value;
        setFormData(prevFormData => ({
            ...prevFormData,
            [name]: adjustedValue
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const dataToSubmit = {
            ...formData,
            bdi: formData.bdi.toString(), // Ensure 'bdi' is a string
            desonerado: formData.desonerado === 'desonerado' ? 'desonerado' : 'nao_desonerado'
        };
        onSubmit(dataToSubmit); // Send the correctly formatted data
        onClose(); // Close the modal after submission
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} title="Criar Novo Orçamento">
            <div className="modal-body">
                <form onSubmit={handleSubmit}>

                    {/* Name input */}
                    <div className="mb-3">
                        <label htmlFor="name" className="form-label">Nome do Orçamento</label>
                        <input
                            className="form-control"
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Digite o nome do orçamento"
                        />
                    </div>

                    <div className="row">
                        {/* State input */}
                        <div className="col-md-3 mb-3">
                            <label htmlFor="state" className="form-label">Estado</label>
                            <select
                                className="form-select"
                                id="state"
                                name="state"
                                value={formData.state}
                                onChange={handleChange}
                            >
                                {states.map((state, index) => (
                                    <option key={index} value={state}>{state}</option>
                                ))}
                            </select>
                        </div>

                        {/* Month Dropdown */}
                        <div className="mb-3">
                            <label htmlFor="month" className="form-label">Mês</label>
                            <select
                                className="form-select"
                                id="datasinapi"
                                name="datasinapi"
                                value={formData.datasinapi}
                                onChange={handleChange}
                            >
                                {monthOptions.map((option, index) => (
                                    <option key={index} value={option.value}>{option.display}</option>
                                ))}
                            </select>
                        </div>

                        {/* BDI input */}
                        <div className="col-md-3 mb-3">
                            <label htmlFor="BDI" className="form-label">BDI</label>
                            <input
                                className="form-control"
                                type="number"
                                id="bdi"
                                name="bdi"
                                value={formData.bdi * 100}  // Display as percentage
                                onChange={handleChange}
                                placeholder="Digite o BDI (em %)"
                            />
                            <small className="text-muted">Ex: Para 10%, coloque 10</small>
                        </div>
                    </div>

                    {/* Desonerado status input */}
                    <div className="mb-3">
                        <label htmlFor="desonerado" className="form-label">Encargos Sociais</label>
                        <select
                            className="form-select"
                            id="desonerado"
                            name="desonerado"
                            value={formData.desonerado}
                            onChange={handleChange}
                        >
                            <option value="nao_desonerado">Não Desonerado</option>
                            <option value="desonerado">Desonerado</option>
                        </select>
                    </div>

                    {/* Submit button */}
                    <div className="d-grid gap-2">
                        <button className="btn btn-primary" type="submit">Criar</button>
                    </div>
                </form>
            </div>
        </Modal>
    );
};


export default NewBudgetModal;