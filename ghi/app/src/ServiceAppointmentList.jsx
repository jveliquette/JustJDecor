import { useEffect, useState } from "react";

function ServiceAppointmentList() {
    const [appointments, setAppointments] = useState([]);
    const [automobiles, setAutomobiles] = useState([]);

    // Fetch scheduled appointments
    const fetchAppointments = async () => {
        const url = "http://localhost:8080/api/appointments/";
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            // filter scheduled appointments
            const scheduledAppointments = data.appointments.filter(appointment => appointment.status === "scheduled");
            setAppointments(scheduledAppointments)
        } else {
            console.error("Failed to load appointments")
        }
    };

    // Fetch all automobiles
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

    // If VIN # was sold, auto = VIP
    const isVip = (vin) => automobiles.some(auto => auto.vin === vin && auto.sold);

    useEffect(() => {
        fetchAppointments();
        fetchAutos();
    }, []);

    // TODO:
    // date time string split into date and time individually

    // Status change
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

    return (
        <>
            <h1>Service Appointments</h1>
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
                    {appointments.map(appointment => (
                        <tr key={appointment.id}>
                            <td>{appointment.vin}</td>
                            <td>{isVip(appointment.vin) ? "Yes" : "No"}</td>
                            <td>{appointment.customer}</td>
                            <td></td>
                            <td></td>
                            <td>{appointment.technician.first_name}</td>
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
                    ))}
                </tbody>
            </table>
        </>
    )
}
export default ServiceAppointmentList;
