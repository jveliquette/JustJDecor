import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function ProjectPins() {
    const { projectId } = useParams();
    const [pins, setPins] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchProjectPins = async () => {
        try {
            const response = await fetch(`http://localhost:8100/api/projects/${projectId}/pins/`);
            if (response.ok) {
                const data = await response.json();
                setPins(data.pins);
            } else {
                console.error('Failed to fetch pins.');
            }
        } catch (error) {
            console.error('An error occurred while fetching pins:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProjectPins();
    }, [projectId]);

    if (loading) {
        return <p>Loading pins...</p>;
    }

    if (pins.length === 0) {
        return <p>No pins found for this project.</p>;
    }

    return (
        <div className="container mt-5">
            <h2 className="mb-4">Project Pins</h2>
            <div className="row">
                {pins.map((pin) => (
                    <div className="col-md-4 mb-4" key={pin.id}>
                        <div className="card bg-dark text-light">
                            <img src={pin.image_url} alt={pin.title} className="card-img-top" />
                            <div className="card-body">
                                <h5 className="card-title">{pin.title}</h5>
                                <p className="card-text">{pin.description}</p>
                                <p className="card-text">
                                    <small className="text-muted">Pinned on {new Date(pin.pinned_at).toLocaleDateString()}</small>
                                </p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
export default ProjectPins;
