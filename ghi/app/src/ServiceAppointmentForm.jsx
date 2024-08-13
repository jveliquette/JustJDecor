import { useState, useEffect } from "react";

function ServiceAppointmentForm() {
    const [technicians, setTechnicians] = useState([]);

    // Fetch technicians
    const fetchData = async () => {
        const url = "http://localhost:8080/api/technicians/";
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            setTechnicians(data.technicians);
            console.log(data.technicians);
        } else {
            console.error("Failed to load technicians")
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    // States and handlers

    const [vin, setVin] = useState('');
    const handleVinChange = (event) => {
        const value = event.target.value;
        setVin(value);
    }

    const [customerName, setCustomerName] = useState('');
    const handleCustomerNameChange = (event) => {
        const value = event.target.value;
        setCustomerName(value);
    }

    const [dateTime, setDateTime] = useState('');
    const handleDateTimeChange = (event) => {
        const value = event.target.value;
        setDateTime(value);
    }

    const [technicianId, setTechnicianId] = useState('');
    const handleTechnicianIdChange = (event) => {
        const value = event.target.value;
        setTechnicianId(value);
    }

    const [reason, setReason] = useState('');
    const handleReasonChange = (event) => {
        const value = event.target.value;
        setReason(value);
    }

    // Form submission
    const handleSubmit = async (event) => {
        event.preventDefault();
        // create empty JSON object
        const data = {};
        data.vin = vin;
        data.customer = customerName;
        data.date_time = dateTime;
        data.technician = technicianId;
        data.reason = reason;
        data.status = "scheduled";

        const serviceAppointmentUrl = "http://localhost:8080/api/appointments/"
        const fetchConfig = {
            method: "post",
            body: JSON.stringify(data),
            headers: {
                'Content-Type': "application/json",
            }
        };

        try {
            const response = await fetch(serviceAppointmentUrl, fetchConfig);
            if (response.ok) {
                const newServiceAppointment = await response.json();
                console.log(newServiceAppointment);
                resetForm();
            } else {
                console.error(`Error: ${response.status} ${response.statusText}`);
                console.error(responseBody);
            }
        } catch {
            console.error('Fetch error:', e);
        }
    }

    // reset form
    const resetForm = () => {
        setVin('');
        setCustomerName('');
        setDateTime('');
        setTechnicianId('');
        setReason('');
    }

    return (
        <div className="row">
            <div className="offset-3 col-6">
                <div className="shadow p-4 mt-4 text-center" role="alert">
                    <h1>Create a service appointment</h1>
                    <form onSubmit={handleSubmit} id="create-service-appointment-form" className="text-start">
                        <div className="mb-3 mt-3">
                            <label className="form-label" htmlFor="vin">Automobile VIN</label>
                            <input onChange={handleVinChange} value={vin} required type="text" name="vin" id="vin" className="form-control" />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="customer">Customer Name</label>
                            <input onChange={handleCustomerNameChange} value={customerName} required type="text" name="customer" id="customer" className="form-control" />
                        </div>
                        <div className="mb-3">
                            <label className="form-label" htmlFor="date_time">Date and Time</label>
                            <input onChange={handleDateTimeChange} value={dateTime} placeholder="Date and Time" required type="datetime-local" name="date_time" id="date_time" className="form-control" />
                        </div>
                        <div className="mb-3">
                            <label className="form-label" htmlFor="technician">Assigned Technician</label>
                            <select onChange={handleTechnicianIdChange} value={technicianId} required name="technician" id="technician" className="form-select">
                                <option value="">Choose a technician...</option>
                                {technicians.map(technician => (
                                    <option key={technician.id} value={technician.id}>
                                        {technician.first_name} {technician.last_name}
                                    </option>
                                ))}
                            </select>
                            <div className="mb-3 mt-3">
                                <label htmlFor="reason">Reason</label>
                                <input onChange={handleReasonChange} value={reason} required type="text" name="reason" id="reason" className="form-control" />
                            </div>
                        </div>
                        <button className="btn btn-dark" type="submit">Create</button>
                    </form>
                </div>
            </div>
        </div>
    )

}
export default ServiceAppointmentForm;
