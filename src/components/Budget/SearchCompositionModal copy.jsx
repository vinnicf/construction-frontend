import React, { useState } from 'react';
import { fetchCompositions } from '../../api';
import ReactDOM from 'react-dom';

const SearchCompositionModal = ({ isOpen, onClose, onAddComposition }) => {
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

    const handleAddFromSearch = (composition) => {
        onAddComposition(composition);
        onClose();
    }

    return isOpen ? ReactDOM.createPortal(
        <div className={`modal fade show`} tabIndex="-1" role="dialog" style={{ display: 'block' }}>
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Search Compositions</h5>
                        <button type="button" className="close" aria-label="Close" onClick={onClose}>
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
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
                                    <button className="btn btn-primary btn-sm" onClick={() => handleAddFromSearch(result)}>Add</button>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>,
        document.body
    ) : null;
}


function isNumeric(str) {
    return !isNaN(str) && !isNaN(parseFloat(str));
}

export default SearchCompositionModal;