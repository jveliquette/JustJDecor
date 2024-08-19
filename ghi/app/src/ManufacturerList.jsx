import { useNavigate } from "react-router-dom";

function ManufacturerList({manufacturers}) {
    const navigate = useNavigate();

    const handleCreateManufacturer = () => {
        navigate('/manufacturers/new');
    }

    return (
        <div>
            <h1>Manufacturer List</h1>
            {manufacturers && manufacturers.length > 0 ? (
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th scope="col">Name</th>
                    </tr>
                </thead>
                <tbody>
                    {manufacturers.map(manufacturer => {
                        return (
                            <tr key={manufacturer.id}>
                                <td> {manufacturer.name} </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
            ) : (
                <div>
                    <p>No manufacturers available.</p>
                    <button onClick={handleCreateManufacturer} className="btn btn-dark">Create Manufacturer</button>
                </div>
            )}
        </div>
    )
}
export default ManufacturerList;
