import { useState } from "react";

function ServiceAppointmentList() {
    const [appointments, setAppointments] = useState([]);

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
            </table>
        </>
    )
}
export default ServiceAppointmentList;
