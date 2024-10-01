import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import PinModal from "./PinModal";
import { ToastContainer } from "react-toastify";

function ProjectPins() {
    const { projectId } = useParams();
    const [pins, setPins] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showPinModal, setShowPinModal] = useState(false);
    const [selectedPin, setSelectedPin] = useState(null);

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

    const handleDetailsClick = (pin) => {
        setSelectedPin(pin);
        setShowPinModal(true);
    };

    const handleCloseModal = () => {
        setShowPinModal(false);
        setSelectedPin(null);
    };

    useEffect(() => {
        fetchProjectPins();
    }, [projectId]);

    if (loading) {
        return (
            <div className="text-center mt-5">
                <p>Loading pins...</p>
            </div>
        );
    }

    if (pins.length === 0) {
        return (
            <div className="text-center mt-5">
                <p>No pins found for this project.</p>
                <Link to="/ideas" className="btn btn-primary">
                    Get Ideas
                </Link>
            </div>
        );
    }

    return (
        <div className="container mt-5">
            <h2 className="mb-4">Project Pins</h2>
            <div className="row">
                {pins.map((pin) => (
                    <div className="col-md-4 mb-4" key={pin.id}>
                        <div className="card bg-dark text-light expand-card">
                            <img src={pin.image_url} alt={pin.title} className="card-img-top img-fluid" style={{ objectFit: "cover", height: "300px", border: "none" }}/>
                            <div className="card-footer bg-secondary text-center pin-footer">
                                <button className="btn btn-secondary" onClick={() => handleDetailsClick(pin)}>Details</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {showPinModal && <div className="modal-overlay show"></div>}
            {showPinModal && (
                <PinModal pin={selectedPin} onClose={handleCloseModal} fetchProjectPins={fetchProjectPins} />
            )}
            <ToastContainer />
        </div>
    );
}
export default ProjectPins;
