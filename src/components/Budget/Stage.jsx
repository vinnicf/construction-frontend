
const Stage = ({ stage }) => {
    return (
        <tr>
            <td>{stage.id}</td>
            <td colSpan="7">{stage.name}</td>
        </tr>
    );
};

export default Stage;
