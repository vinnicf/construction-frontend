
const Stage = ({ stage }) => {
    return (
        <tr>
            <td>{stage.refId}</td>
            <td colSpan="7">{stage.name}</td>
        </tr>
    );
};

export default Stage;
