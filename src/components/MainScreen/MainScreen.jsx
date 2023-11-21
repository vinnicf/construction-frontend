import React, { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';


const MainScreen = () => {

    const [budgets] = useState([
        {
            name: 'EMEI Santa Catarina',
            dateCreated: '2023-01-01',
            estado: 'São Paulo',
            dataSinapi: '05/2023',
            id: '1'
        },
        {
            name: 'Pavilhão da Usina de Tratamento de Resíduos',
            dateCreated: '2023-02-10',
            estado: 'Santa Catarina',
            dataSinapi: '06/2023',
            id: '2'
        },
        {
            name: 'Quadra Esportiva Escola CAIC',
            dateCreated: '2023-03-15',
            estado: 'Rio Grande do Sul',
            dataSinapi: '07/2023',
            id: '3'
        },
        // ... other budgets ...
    ]);

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
                            <td>{budget.dateCreated}</td>
                            <td>{budget.estado}</td>
                            <td>{budget.dataSinapi}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default MainScreen;