import React, { useState, useEffect } from 'react';
import { fetchCompositions, fetchCompositionByCodigo } from '../../api';
import Modal from './Modal';
import '../../styles/searchcompositionmodal.css'
import AddButton from '../../assets/add-button.svg'

const SearchCompositionModal = ({ isOpen, onClose, onAddComposition, stageRefId, state, desonerado }) => {
    const [searchQuery, setSearchQuery] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [hasSearched, setHasSearched] = useState(false);

    const handleSearch = async () => {
        setHasSearched(true);
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

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    };

    const handleAddFromSearch = async (composition) => {
        try {
            const fetchedData = await fetchCompositionByCodigo(composition.codigo, state, desonerado);
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
        setHasSearched(false);
        onClose();
    }

    useEffect(() => {
        setHasSearched(false);
    }, [searchQuery]);

    return (
        <Modal isOpen={isOpen} onClose={handleClose} title="Pesquise composições por Código SINAPI ou Descrição">

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
            {searchResults.length > 0 ? (
                <ul className="list-group">
                    {searchResults.map(result => (
                        <li key={result.id} className="list-group-item d-flex justify-content-between align-items-center">
                            <span className="codigo-column">{result.codigo}</span>
                            <span className="name-column">{result.name} ({result.unit})</span>
                            <button className="btn add-button" onClick={() => handleAddFromSearch(result)}>
                                <span><img src={AddButton} alt="" /></span>
                            </button>
                        </li>
                    ))}
                </ul>
            ) : (
                hasSearched && searchQuery && <div className="text-center mt-3"><b>Nenhuma composição encontrada.</b></div>
            )
            }
        </Modal >
    );
};


function isNumeric(str) {
    return !isNaN(str) && !isNaN(parseFloat(str));
}

export default SearchCompositionModal;