import { useState } from "react";

function ManufacturerForm({addManufacturer}) {
    const [manufacturer, setManufacturer] = useState('');
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(null);

    const handleManufacturerChange = (event) => {
        const value = event.target.value;
        setManufacturer(value);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = {
        name: manufacturer,
        }
        const manufacturerUrl = 'http://localhost:8100/api/manufacturers/';
        const fetchConfig = {
            method: "post",
            body: JSON.stringify(data),
            headers: {
                'Content-Type': "application/json",
            }
        };
        try {
            const response = await fetch(manufacturerUrl, fetchConfig);
            if (response.ok) {
                const newManufacturer = await response.json();
                console.log(newManufacturer);
                addManufacturer(newManufacturer);
                setSuccess(true);
                setError(null);
                // reset form
                setManufacturer('')
            } else {
                const errorData = await response.json();
                if (response.status === 400) {
                    setError("Manufacturer already exists.");
                } else if (errorData.detail) {
                    setError(errorData.detail)
                } else {
                    setError(`Error: ${response.status} ${response.statusText}`);
                }
                setSuccess(false);
            }
        } catch (e) {
            console.error('Fetch error:', e);
            setError("Unexpected error.")
        }
    };

    return (
        <div className="row">
            <div className="offset-3 col-6">
                <div className="shadow p-4 mt-4 text-center" role="alert">
                    <h1>Create a Manufacturer</h1>
                    {success && (
                        <div className="alert alert-success">Manufacturer was added successfully!</div>
                    )}
                    {error && (
                        <div className="alert alert-danger">{error}</div>
                    )}
                    <form onSubmit={handleSubmit} id="create-manufacturer-form">
                        <div className="form-floating mb-3">
                            <input onChange={handleManufacturerChange} value={manufacturer} placeholder="Manufacturer" required type="text" name="manufacturer" id="manufacturer" className="form-control" />
                            <label htmlFor="manufacturer">Manufacturer</label>
                        </div>
                        <button type="submit" className="btn btn-dark">Create</button>
                    </form>
                </div>
            </div>
        </div>
    )
}
export default ManufacturerForm;
