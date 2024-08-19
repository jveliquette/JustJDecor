import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function ServiceAppointmentList() {
    const [appointments, setAppointments] = useState([]);
    const [automobiles, setAutomobiles] = useState([]);
    const navigate = useNavigate();

    const fetchAppointments = async () => {
        const url = "http://localhost:8080/api/appointments/";
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            const scheduledAppointments = data.appointments.filter(appointment => appointment.status === "scheduled");
            setAppointments(scheduledAppointments)
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

    const handleStatusChange = async (appointmentId, newStatus) => {
        const url = `http://localhost:8080/api/appointments/${appointmentId}/${newStatus}/`
        const fetchConfig = {
            method: "put",
            headers: {
                'Content-Type': "application/json",
            }
        };
        try {
            const response = await fetch(url, fetchConfig);
            if (response.ok) {
                setAppointments(appointments.filter(appointment => appointment.id !== appointmentId));
            } else {
                console.error(`Error: ${response.status} ${response.statusText}`);
            }
        } catch {
            console.error('Fetch error:', e);
        }
    };

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

    const handleCreateAppointment = () => {
        navigate('/appointments/new');
    }

    return (
        <div>
            <h1>Scheduled Service Appointments</h1>
            {appointments.length === 0 ? (
                <div>
                    <p>No appointments available.</p>
                    <button onClick={handleCreateAppointment} className="btn btn-dark">Create Service Appointment</button>
                </div>
            ) : (
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
                        <th>Update Status</th>
                    </tr>
                </thead>
                <tbody>
                    {appointments.map(appointment => {
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
                            <td>
                                <button className="btn btn-danger" onClick={() => handleStatusChange(appointment.id, 'cancel')}>
                                    Cancel
                                </button>
                                <button className="btn btn-success" onClick={() => handleStatusChange(appointment.id, 'finish')}>
                                    Finish
                                </button>
                            </td>
                        </tr>
                        )
                    }

                    )}
                </tbody>
            </table>
            )}
        </div>
    )
}
export default ServiceAppointmentList;
