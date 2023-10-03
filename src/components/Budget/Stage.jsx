
const Stage = ({ stage }) => {
    return (
        <tr>
            <td>{stage.refId}</td>
            <td></td> {/* Código */}
            <td colSpan="5" className="stage-name">{stage.name}</td>
            <td className='total-display'>{
                stage.totalCost?.toLocaleString(`pt-BR`, { minimumFractionDigits: 2, maximumFractionDigits: 2 })
            }
            </td>

        </tr>
    );
};

export default Stage;
