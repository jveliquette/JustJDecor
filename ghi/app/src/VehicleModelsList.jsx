import { useNavigate } from "react-router-dom";

function VehicleModelsList({models}) {
    const navigate = useNavigate();

    const handleCreateModel = () => {
        navigate('/models/new');
    }

    return (
        <>
            <h1>Models</h1>
            {models && models.length > 0 ? (
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th scope="col">Name</th>
                        <th scope="col">Manufacturer</th>
                        <th scope="col">Picture</th>
                    </tr>
                </thead>
                <tbody>
                    {models.map((model) => (
                        <tr key={model.id}>
                            <td>{model.name}</td>
                            <td>{model.manufacturer.name}</td>
                            <td><img src={model.picture_url} alt={model.name} style={{maxHeight: "200px"}}/></td>
                        </tr>
                    ))}

                </tbody>
            </table>
            ) : (
                <div>
                    <p>No models available.</p>
                    <button onClick={handleCreateModel} className="btn btn-dark">Create Model</button>
                </div>
            )}
        </>
    )
}
export default VehicleModelsList;
