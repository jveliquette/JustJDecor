import { useState, useEffect } from "react";

function AutomobileForm() {
    const [models, setModels] = useState([]);

    // Fetch models
    const fetchData = async () => {
        const url = "http://localhost:8100/api/models/";
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            setModels(data.models);
            console.log(data.models)
        } else {
            console.error("Failed to load models")
        }
    };

    // States and handlers
    const [color, setColor] = useState('');
    const handleColorChange = (event) => {
        const value = event.target.value;
        setColor(value);
    }

    const [year, setYear] = useState('');
    const handleYearChange = (event) => {
        const value = event.target.value;
        setYear(value);
    }

    const [vin, setVin] = useState('');
    const handleVinChange = (event) => {
        const value = event.target.value;
        setVin(value);
    }

    const [modelId, setModelId] = useState('');
    const handleModelIdChange = (event) => {
        const value = event.target.value;
        setModelId(value);
    }

    useEffect(() => {
        fetchData();
    }, []);

    // Form submission
    const handleSubmit = async (event) => {
        event.preventDefault();
        // create empty JSON object
        const data = {};
        data.color = color;
        data.year = year;
        data.vin = vin;
        data.model_id = modelId;

        const autoUrl = "http://localhost:8100/api/automobiles/";
        const fetchConfig = {
            method: "post",
            body: JSON.stringify(data),
            headers: {
                'Content-Type': "application/json",
            }
        };

        try {
            const response = await fetch(autoUrl, fetchConfig);
            if (response.ok) {
                const newAuto = await response.json();
                console.log(newAuto);
                resetForm();
            } else {
                console.error(`Error: ${response.status} ${response.statusText}`);
            }
        } catch {
            console.error('Fetch error:', e);
        }
    }

    // reset form
    const resetForm = () => {
        setColor('');
        setYear('');
        setVin('')
        setModelId('');
    }

    return (
        <div className="row">
            <div className="offset-3 col-6">
                <div className="shadow p-4 mt-4 text-center" role="alert">
                    <h1>Add an automobile to inventory</h1>
                    <form onSubmit={handleSubmit} id="create-auto-form">
                        <div className="form-floating mb-3">
                            <input onChange={handleColorChange} value={color} placeholder="Color" required type="text" name="color" id="color" className="form-control" />
                            <label htmlFor="color">Color...</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input onChange={handleYearChange} value={year} placeholder="Year" required type="text" name="year" id="year" className="form-control" />
                            <label htmlFor="year">Year...</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input onChange={handleVinChange} value={vin} placeholder="VIN" required type="text" name="vin" id="vin" className="form-control" />
                            <label htmlFor="vin">VIN...</label>
                        </div>
                        <div className="mb-3">
                            <select onChange={handleModelIdChange} value={modelId} placeholder="Model Id" required name="model_id" id="model_id" className="form-select">
                                <option value="">Choose a model...</option>
                                {models.map((model) => {
                                    return (
                                        <option key={model.id} value={model.id}>
                                            {model.name}
                                        </option>
                                    )
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
export default AutomobileForm;
