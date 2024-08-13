import { useState } from "react";

function ManufacturerForm() {
    // States and handlers
    const [manufacturer, setManufacturer] = useState('');
    const handleManufacturerChange = (event) => {
        const value = event.target.value;
        setManufacturer(value);
    }



    // Form submission
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
                // reset form
                setManufacturer('')
            } else {
                console.error(`Error: ${response.status} ${response.statusText}`);
            }
        } catch {
            console.error('Fetch error:', e);
        }
    };

    return (
        <div className="row">
            <div className="offset-3 col-6">
                <div className="shadow p-4 mt-4 text-center" role="alert">
                    <h1>Create a Manufacturer</h1>
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
