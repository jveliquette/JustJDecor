function VehicleModelsList({models}) {

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
                            <td><img src={model.picture_url} alt={model.name} /></td>
                        </tr>
                    ))}

                </tbody>
            </table>
            ) : (
                <p>No models available.</p>
            )}
        </>
    )
}
export default VehicleModelsList;
