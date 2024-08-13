function AutomobileList({autos}) {
    return (
        <>
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
                <p>No automobiles available.</p>
            )}
        </>
    )
}
export default AutomobileList;
