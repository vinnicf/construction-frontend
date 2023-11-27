import React, { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { fetchAllOrcamentos, deleteOrcamento } from '../../api/orcamentoapi';
import InfoBox from './InfoBox';


const MainScreen = () => {

    const [budgets, setBudgets] = useState([]);

    useEffect(() => {
        const getOrcamentos = async () => {
            try {
                const data = await fetchAllOrcamentos();
                setBudgets(data); // Update the state with the fetched data
            } catch (error) {
                console.error('Failed to fetch orcamentos:', error);
                // Handle errors or show a message to the user
            }
        };

        getOrcamentos();
    }, []); // Empty dependency array to run only on mount

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based
        const year = date.getFullYear();
    
        return `${day}-${month}-${year}`;
    };

    const handleDelete = async (budgetId) => {
        // Prompt the user to confirm the deletion
        const isConfirmed = window.confirm("Tem certeza que deseja deletar este orçamento?");
    
        // If the user clicked 'OK', proceed with the deletion
        if (isConfirmed) {
            try {
                await deleteOrcamento(budgetId);
                setBudgets(budgets.filter(budget => budget.id !== budgetId));
                // You may add a success message or some state update here if needed
            } catch (error) {
                // Handle the error, maybe show an alert or a message to the user
                console.error('Error during deletion:', error);
                // You may add an error message or some state update here if needed
            }
        }
        // If the user clicked 'Cancel', do nothing
    };


    return (
      
        
        <div className="container mt-3">
              <InfoBox />
            <h2 className="mb-4">Seus Orçamentos</h2>
            <table className="table">
                <thead>
                    <tr>
                        <th>Nome</th>
                        <th>Criado em</th>
                        <th>Estado</th>
                        <th>Data Sinapi</th>
                        <th>Deletar</th>
                    </tr>
                </thead>
                <tbody>
                    {budgets.map((budget, index) => (
                        <tr key={index}>
                            <td><Link to={`/budget/${budget.id}`}>{budget.name}</Link></td>
                            <td>{formatDate(budget.created_at)}</td>
                            <td>{budget.state}</td>
                            <td>{budget.desonerado === 'desonerado' ? 'Desonerado' : 'Não Desonerado'}</td>
                            <td>
                <button 
                    className="btn btn-danger" 
                    onClick={() => handleDelete(budget.id)}
                >
                    X
                </button>
            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default MainScreen;