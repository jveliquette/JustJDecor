import { useState, useEffect } from "react";

function ServiceHistory() {
    const [appointments, setAppointments] = useState([]);
    const [automobiles, setAutomobiles] = useState([]);
    const [filteredAppointments, setFilteredAppointments] = useState([]);

    const fetchAppointments = async () => {
        const url = "http://localhost:8080/api/appointments/";
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            setAppointments(data.appointments);
            setFilteredAppointments(data.appointments);
        } else {
            console.error("Failed to load appointments")
        }
    };

    const fetchAutos = async () => {
        const url = "http://localhost:8100/api/automobiles/";
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            setAutomobiles(data.autos);
        } else {
            console.error("Failed to load automobiles")
        }
    };

    useEffect(() => {
        fetchAppointments();
        fetchAutos();
    }, []);

    const isVip = (vin) => automobiles.some(auto => auto.vin === vin && auto.sold);

    const formatDateTime = (dateTimeString) => {
        const date = new Date(dateTimeString);
        const formattedDate = date.toLocaleDateString('en-US', {
            year: 'numeric', month: 'numeric', day: 'numeric'
        });

        const formattedTime = date.toLocaleTimeString('en-US', {
            hour: '2-digit', minute: '2-digit', hour12: true, timeZone: 'UTC'
        });

        return `${formattedDate}, ${formattedTime}`;
    };

    const [vinSearch, setVinSearch] = useState('')

    const handleVinChange = (event) => {
        const value = event.target.value;
        setVinSearch(value);
    }

    const handleVinSearch = (event) => {
        event.preventDefault();
        if (vinSearch.trim() === '') {
            setFilteredAppointments(appointments);
        } else {
            setFilteredAppointments(appointments.filter(appointment => appointment.vin.includes(vinSearch)));
        }

    }

    return (
        <>
            <h1>Service History</h1>
            <form onSubmit={handleVinSearch} className="d-flex mb-4">
                <div className="form-floating flex-grow-1 me-2">
                    <input onChange={handleVinChange} value={vinSearch} placeholder="Search by VIN..." type="text" name="search" id="search" className="form-control"/>
                    <label htmlFor="search">Search by VIN...</label>
                </div>
                <button className="btn btn-dark" type="submit">Search</button>
            </form>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>VIN</th>
                        <th>Is VIP?</th>
                        <th>Customer</th>
                        <th>Date</th>
                        <th>Time</th>
                        <th>Technician</th>
                        <th>Reason</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredAppointments.map(appointment => {
                        const formattedDateTime = formatDateTime(appointment.date_time);
                        const [date, time] = formattedDateTime.split(', ');
                        return (
                            <tr key={appointment.id}>
                            <td>{appointment.vin}</td>
                            <td>{isVip(appointment.vin) ? "Yes" : "No"}</td>
                            <td>{appointment.customer}</td>
                            <td>{date}</td>
                            <td>{time}</td>
                            <td>{appointment.technician.first_name} {appointment.technician.last_name}</td>
                            <td>{appointment.reason}</td>
                            <td>{appointment.status}</td>
                        </tr>
                        )
                    })}
                </tbody>
            </table>
        </>
    )
}
export default ServiceHistory;
