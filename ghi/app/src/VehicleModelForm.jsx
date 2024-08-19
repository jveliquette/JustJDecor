import { useState, useEffect } from "react";

function VehicleModelForm({addModel}) {
    const [manufacturers, setManufacturers] = useState([]);
    const [success, setSuccess] = useState(false);

    const fetchData = async () => {
        const url = "http://localhost:8100/api/manufacturers/";
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            setManufacturers(data.manufacturers);
            console.log(data.manufacturers)
        } else {
            console.error("Failed to load manufacturers")
        }
    };

    const [name, setName] = useState('');
    const handleNameChange = (event) => {
        const value = event.target.value;
        setName(value);
    }

    const [pictureUrl, setPictureUrl] = useState('');
    const handlePictureUrlChange = (event) => {
        const value = event.target.value;
        setPictureUrl(value);
    }

    const [manufacturerId, setManufacturerId] = useState('');
    const handleManufacturerIdChange = (event) => {
        const value = event.target.value;
        setManufacturerId(value);
    }

    useEffect(() => {
        fetchData();
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = {};
        data.name = name;
        data.picture_url = pictureUrl;
        data.manufacturer_id = manufacturerId;
        const modelUrl = "http://localhost:8100/api/models/";
        const fetchConfig = {
            method: "post",
            body: JSON.stringify(data),
            headers: {
                'Content-Type': "application/json",
            }
        };
        try {
            const response = await fetch(modelUrl, fetchConfig);
            if (response.ok) {
                const newModel = await response.json();
                console.log(newModel);
                addModel(newModel);
                setSuccess(true)
                resetForm();
            } else {
                console.error(`Error: ${response.status} ${response.statusText}`);
            }
        } catch {
            console.error('Fetch error:', e);
        }
    }

    const resetForm = () => {
        setName('');
        setPictureUrl('');
        setManufacturerId('');
    }

    return (
        <div className="row">
            <div className="offset-3 col-6">
                <div className="shadow p-4 mt-4 text-center" role="alert">
                    <h1>Create a Vehicle Model</h1>
                    {success && (
                        <div className="alert alert-success">Model was added successfully!</div>
                    )}
                    <form onSubmit={handleSubmit} id="create-model-form">
                        <div className="form-floating mb-3">
                            <input onChange={handleNameChange} value={name} placeholder="Model" required type="text" name="name" id="name" className="form-control" />
                            <label htmlFor="name">Model name...</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input onChange={handlePictureUrlChange} value={pictureUrl} placeholder="Picture Url" required type="text" name="picture_url" id="picture_url" className="form-control" />
                            <label htmlFor="picture_url">Picture url...</label>
                        </div>
                        <div className="mb-3">
                            <select onChange={handleManufacturerIdChange} value={manufacturerId} placeholder="Manufacturer Id" required name="manufacturer_id" id="manufacturer_id" className="form-select">
                                <option value="">Choose a manufacturer...</option>
                                {manufacturers.map((manufacturer) => {
                                    return (
                                        <option key={manufacturer.id} value={manufacturer.id}>
                                            {manufacturer.name}
                                        </option>
                                    );
                                })}
                            </select>
                        </div>
                        <button className="btn btn-dark" type="submit">Create</button>
                    </form>
                </div>
            </div>
        </div>
    )
}
export default VehicleModelForm;
