import React, { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { fetchAllOrcamentos } from '../../api/orcamentoapi';


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

    return (
        <div className="container mt-3">
            <h2 className="mb-4">Orçamentos</h2>
            <table className="table">
                <thead>
                    <tr>
                        <th>Nome</th>
                        <th>Criado em</th>
                        <th>Estado</th>
                        <th>Data Sinapi</th>
                    </tr>
                </thead>
                <tbody>
                    {budgets.map((budget, index) => (
                        <tr key={index}>
                            <td><Link to={`/budget/${budget.id}`}>{budget.name}</Link></td>
                            <td>{budget.created_at}</td>
                            <td>{budget.state}</td>
                            <td>{budget.desonerado}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default MainScreen;