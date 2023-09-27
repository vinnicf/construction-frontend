import React, { useState } from 'react';
import Stage from './Stage';

const Budget = () => {
    const [name, setName] = useState('');
    const [stages, setStages] = useState([]);

    const addStage = () => {
        setStages([...stages, { id: stages.length + 1, subItems: [] }]);
    };

    return (
        <div className="container mt-5">
            <input
                className="form-control mb-3"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Budget Name"
            />
            {stages.map(stage => <Stage key={stage.id} stage={stage} />)}
            <button className="btn btn-primary mt-2" onClick={addStage}>Add Stage</button>
        </div>
    );
}

export default Budget;
