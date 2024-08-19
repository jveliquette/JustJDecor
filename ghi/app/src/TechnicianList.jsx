import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function TechnicianList() {
    const [technicians, setTechnicians] = useState([]);
    const navigate = useNavigate();

    const fetchTechnicians = async () => {
        const url = "http://localhost:8080/api/technicians/";
        try {
            const response = await fetch(url);
            if (response.ok) {
                const data = await response.json();
                setTechnicians(data.technicians);
            } else {
                console.error("Failed to fetch technicians.");
            }
        } catch (e) {
            console.error(e);
        }
    }

    useEffect(() => {
        fetchTechnicians();
    }, []);

    const handleCreateTechnician = () => {
        navigate('/technicians/new');
    }

    return (
        <div>
            <h1>Technicians</h1>
            {technicians.length === 0 ? (
                <div>
                    <p>No technicians available.</p>
                    <button onClick={handleCreateTechnician} className="btn btn-dark">Add Technician</button>
                </div>
            ) : (
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Employee ID</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                    </tr>
                </thead>
                <tbody>
                    {technicians.map(technician => (
                        <tr key={technician.id}>
                            <td>{technician.employee_id}</td>
                            <td>{technician.first_name}</td>
                            <td>{technician.last_name}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            )}
        </div>
    )
}
export default TechnicianList;
