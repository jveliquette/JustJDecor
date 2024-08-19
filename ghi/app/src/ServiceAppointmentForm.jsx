import { useState, useEffect } from "react";

function ServiceAppointmentForm() {
    const [technicians, setTechnicians] = useState([]);
    const [success, setSuccess] = useState(false);

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

    const [date, setDate] = useState('');
    const handleDateChange = (event) => {
        const value = event.target.value;
        setDate(value);
    }

    const [time, setTime] = useState('');
    const handleTimeChange = (event) => {
        const value = event.target.value;
        setTime(value);
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

    const handleSubmit = async (event) => {
        event.preventDefault();
        const dateTime = `${date}T${time}`
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
                setSuccess(true);
                resetForm();
            } else {
                console.error(`Error: ${response.status} ${response.statusText}`);
                console.error(responseBody);
            }
        } catch {
            console.error('Fetch error:', e);
        }
    }

    const resetForm = () => {
        setVin('');
        setCustomerName('');
        setDate('');
        setTime('');
        setTechnicianId('');
        setReason('');
    }

    return (
        <div className="row">
            <div className="offset-3 col-6">
                <div className="shadow p-4 mt-4 text-center" role="alert">
                    <h1>Create a Service Appointment</h1>
                    {success && (
                        <div className="alert alert-success">Appointment was added successfully!</div>
                    )}
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
                            <label className="form-label" htmlFor="date">Date</label>
                            <input onChange={handleDateChange} value={date} placeholder="Date" required type="date" name="date" id="date" className="form-control" />
                        </div>
                        <div className="mb-3">
                            <label className="form-label" htmlFor="time">Time</label>
                            <input onChange={handleTimeChange} value={time} placeholder="Time" required type="time" name="time" id="time" className="form-control" />
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
