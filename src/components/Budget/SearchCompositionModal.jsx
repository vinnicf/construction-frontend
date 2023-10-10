import React, { useState } from 'react';
import { fetchCompositions, fetchCompositionByCodigo } from '../../api';
import Modal from './Modal';

const SearchCompositionModal = ({ isOpen, onClose, onAddComposition, stageRefId }) => {
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
            const results = await fetchCompositions(params);
            console.log('Fetched Results:', results);
            setSearchResults(results);
        } catch (error) {
            console.error("Error during search:", error);
        }
    }

    const handleAddFromSearch = async (composition) => {
        try {
            const fetchedData = await fetchCompositionByCodigo(composition.codigo);
            onAddComposition(fetchedData, stageRefId);
            console.log(fetchedData);
            setSearchQuery("");
            setSearchResults([]);
        } catch (error) {
            console.error("Error fetching composition:", error);
        }
        onClose();
    }

    const handleClose = () => {
        // Clear search query and results
        setSearchQuery("");
        setSearchResults([]);
        onClose();
    }

    return (
        <Modal isOpen={isOpen} onClose={handleClose}>
            <h5 className="modal-title">Pesquise composições por Código SINAPI ou Descrição</h5>
            <div className="input-group mb-3">
                <input
                    type="text"
                    className="form-control"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search compositions..."
                />
                <div className="input-group-append">
                    <button className="btn btn-outline-secondary" type="button" onClick={handleSearch}>Search</button>
                </div>
            </div>
            <ul className="list-group">
                {searchResults.map(result => (
                    <li key={result.id} className="list-group-item d-flex justify-content-between align-items-center">
                        {result.name} ({result.codigo})
                        <button className="btn btn-primary btn-sm" onClick={() => handleAddFromSearch(result)}>+ Add</button>
                    </li>
                ))}
            </ul>
        </Modal>
    );
};


function isNumeric(str) {
    return !isNaN(str) && !isNaN(parseFloat(str));
}

export default SearchCompositionModal;