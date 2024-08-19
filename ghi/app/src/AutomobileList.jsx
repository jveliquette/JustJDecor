import { useNavigate } from "react-router-dom";

function AutomobileList({autos}) {
    const navigate = useNavigate();

    const handleCreateAutomobile = () => {
        navigate('/automobiles/new');
    }

    return (
        <div>
            <h1>Automobiles</h1>
            {autos && autos.length > 0 ? (
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th scope="col">VIN</th>
                        <th scope="col">Color</th>
                        <th scope="col">Year</th>
                        <th scope="col">Manufacturer</th>
                        <th scope="col">Sold</th>
                    </tr>
                </thead>
                <tbody>
                    {autos.map((auto) => (
                        <tr key={auto.id}>
                            <td>{auto.vin}</td>
                            <td>{auto.color}</td>
                            <td>{auto.year}</td>
                            <td>{auto.model.name}</td>
                            <td>{auto.sold ? 'Yes' : 'No'}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            ) : (
                <div>
                    <p>No automobiles available.</p>
                    <button onClick={handleCreateAutomobile} className="btn btn-dark">Create Automobile</button>
                </div>
            )}
        </div>
    )
}
export default AutomobileList;
