import React, { useState, useEffect } from 'react';
import { fetchInsumos, fetchInsumoByCodigo } from '../../api';
import Modal from './Modal';
import '../../styles/searchcompositionmodal.css'
import AddButton from '../../assets/add-button.svg'



const SearchInsumoModal = ({ isOpen, onClose, onAddInsumo, stageRefId, state, desonerado }) => {
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
        setHasSearched(false);
        onClose();
    }


    useEffect(() => {
        setHasSearched(false);
    }, [searchQuery]);

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
            {searchResults.length > 0 ? (
                <ul className="list-group">
                    {searchResults.map(result => (
                        <li key={result.id} className="list-group-item d-flex justify-content-between align-items-center">
                            <span className="codigo-column">{result.codigo}</span>
                            <span className="name-column">{result.name} ({result.unit})</span>
                            <button className="btn add-button" onClick={() => handleAddFromSearch(result)}>
                                <span><img src={AddButton} alt="" /></span>
                                Add
                            </button>
                        </li>
                    ))}
                </ul>
            ) : (
                hasSearched && searchQuery && <div className="text-center mt-3"><b>Nenhuma composição encontrada.</b></div>
            )
            }
        </Modal>
    );
};

function isNumeric(str) {
    return !isNaN(str) && !isNaN(parseFloat(str));
}

export default SearchInsumoModal;