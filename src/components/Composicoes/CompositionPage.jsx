
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { fetchCompositionByCodigo } from '../../api';

const CompositionPage = () => {
    const { codigo } = useParams(); // from the URL
    const [composition, setComposition] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const data = await fetchCompositionByCodigo(codigo);
            setComposition(data);
        };
        fetchData();
    }, [codigo]);

    if (!composition) {
        return <div>Loading...</div>;
    }

    return (
        <div className="container mt-5">
            <h3>Detalhes da Composição</h3>
            <hr />

            <h4>{composition.name} ({composition.codigo})</h4>
            <p>Unidade: {composition.unit}</p>
            <p>Custo total da Composição: R${composition.comp_cost}</p>

            <h5>Insumos e Composições:</h5>
            <table className="table table-bordered">
                <thead>
                    <tr>
                        <th scope="col">Tipo</th>
                        <th scope="col">Código</th>
                        <th scope="col">Nome</th>
                        <th scope="col">Quantidade</th>
                        <th scope="col">Unidade</th>
                        <th scope="col">Custo Unitário</th>
                        <th scope="col">Custo na Composição</th>
                    </tr>
                </thead>
                <tbody>
                    {composition.compositionchild_set.map((child, index) => (
                        <tr key={index}>
                            <td>C</td>
                            <td><Link to={`/composicoes/${child.composition_codigo}`}>{child.composition_codigo}</Link></td>
                            <td>{child.composition_name}</td>
                            <td>{parseFloat(child.quantity).toFixed(3)}</td>
                            <td>{child.composition_unit}</td> {/* Unit for child composition, if available */}
                            <td>{parseFloat(child.composition_cost).toFixed(2)}</td>
                            <td>{(child.composition_cost * child.quantity).toFixed(2)}</td>
                        </tr>
                    ))}

                    {composition.compositioninsumo_set.map((insumo, index) => (
                        <tr key={index}>
                            <td>I</td>
                            <td>{insumo.insumo_codigo}</td>
                            <td>{insumo.insumo_name}</td>
                            <td>{parseFloat(insumo.quantity).toFixed(3)}</td>
                            <td>{insumo.insumo_unit}</td> {/* Unit for insumo, if available */}
                            <td>{parseFloat(insumo.insumo_cost).toFixed(2)}</td>
                            <td>{(insumo.insumo_cost * insumo.quantity).toFixed(2)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default CompositionPage;
