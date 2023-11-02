import React, { useState } from 'react';
import { fetchInsumos, fetchInsumoByCodigo } from '../../api';
import Modal from './Modal';



const SearchInsumoModal = ({ isOpen, onClose, onAddInsumo, stageRefId, state, desonerado }) => {
    const [searchQuery, setSearchQuery] = useState("");
    const [searchResults, setSearchResults] = useState([]);

    const handleSearch = async () => {
        try {
            let params = {};
            if (isNumeric(searchQuery)) {
                params.codigo = searchQuery;
            } else {
                params.name = searchQuery;
            }
            console.log('Search Query:', searchQuery);
            console.log('Params:', params);
            const results = await fetchInsumos(params); // Fetch insumos
            console.log('Fetched Results:', results);
            setSearchResults(results);
        } catch (error) {
            console.error("Error during search:", error);
        }
    }

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    };

    const handleAddFromSearch = async (insumo) => {
        try {
            const fetchedData = await fetchInsumoByCodigo(insumo.codigo, state, desonerado);

            onAddInsumo(fetchedData, stageRefId);
            console.log(fetchedData);
            setSearchQuery("");
            setSearchResults([]);
        } catch (error) {
            console.error("Error fetching insumo:", error);
        }
        onClose();
    }

    const handleClose = () => {
        setSearchQuery("");
        setSearchResults([]);
        onClose();
    }

    return (
        <Modal isOpen={isOpen} onClose={handleClose} title="Pesquise insumos por Código SINAPI ou Descrição">
            <div className="input-group mb-3 input-pesquisar">
                <input
                    type="text"
                    className="form-control"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Pesquisar composições..."
                />
                <div className="input-group-append">
                    <button className="btn btn-outline-secondary" type="button" onClick={handleSearch}>Pesquisar</button>
                </div>
            </div>
            <ul className="list-group">
                {searchResults.map(result => (
                    <li key={result.id} className="list-group-item d-flex justify-content-between align-items-center">
                        <span className="codigo-column">{result.codigo}</span>
                        <span className="name-column">{result.name} ({result.unit})</span>
                        <button className="btn btn-primary btn-sm add-button" onClick={() => handleAddFromSearch(result)}>
                            <svg className="add-icon" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                                <path d="M8 1a1 1 0 0 1 1 1v5h5a1 1 0 0 1 0 2H9v5a1 1 0 0 1-2 0V9H2a1 1 0 0 1 0-2h5V2a1 1 0 0 1 1-1z" />
                            </svg>
                            Add
                        </button>
                    </li>
                ))}
            </ul>
        </Modal>
    );
};

function isNumeric(str) {
    return !isNaN(str) && !isNaN(parseFloat(str));
}

export default SearchInsumoModal;