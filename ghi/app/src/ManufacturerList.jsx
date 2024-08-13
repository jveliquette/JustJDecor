function ManufacturerList({manufacturers}) {
    return (
        <>
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
                <p>No manufacturers available.</p>
            )}
        </>
    )
}
export default ManufacturerList;
