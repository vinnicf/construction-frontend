
import React, { useState } from 'react';
import NewBudgetModal from './NewBudgetModal';
import { createOrcamento } from '../../api/orcamentoapi';
import { useNavigate } from 'react-router-dom';

const BudgetCreation = () => {
    const [isModalOpen, setModalOpen] = useState(true); // Start with modal open
    const navigate = useNavigate();

    const handleModalSubmit = async (formData) => {
        try {
            const newOrcamento = await createOrcamento(formData);
            // Redirect to the newly created budget's detail page
            navigate(`/budget/${newOrcamento.id}`);
        } catch (error) {
            console.error('Failed to create orcamento:', error);
            // Handle error (e.g., show error message)
        }
    };

    const handleModalClose = () => {
        setModalOpen(false);
        navigate('/'); // Redirect back to main screen or another appropriate location
    };

    return (
        <NewBudgetModal 
            isOpen={isModalOpen} 
            onClose={handleModalClose} 
            onSubmit={handleModalSubmit} 
        />
    );
};

export default BudgetCreation;