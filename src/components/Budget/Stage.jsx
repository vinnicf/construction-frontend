
const Stage = ({ stage }) => {
    return (
        <tr>
            <td>{stage.refId}</td>
            <td></td> {/* Código */}
            <td colSpan="5">{stage.name}</td>
            <td>{stage.totalCost?.toFixed(2)}</td>

        </tr>
    );
};

export default Stage;
