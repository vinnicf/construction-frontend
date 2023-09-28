import axios from 'axios';
import React, { useEffect, useState } from 'react';

function CompositionList() {
    const [compositions, setCompositions] = useState([]);

    useEffect(() => {
        axios.get('')
            .then(response => {
                setCompositions(response.data);
            });
    }, []);

    return (
        <div>
            {compositions.map(comp => (
                <div key={comp.codigo}>
                    {comp.name} - {comp.codigo}
                </div>
            ))}
        </div>
    );
}


export default CompositionList;