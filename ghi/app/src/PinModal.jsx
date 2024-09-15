import React from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const API_BASE_URL = process.env.REACT_APP_API_URL;

function PinModal({ pin, onClose, fetchProjectPins }) {
    const handleUnpin = async () => {
        try {
            const response = await fetch(`${API_BASE_URL}/api/pins/${pin.id}/`, {
                method: "DELETE",
            });

            if (response.ok) {
                toast.success("Image successfully unpinned.");
                fetchProjectPins();
                onClose();
            } else {
                toast.error("Failed to unpin the image.");
            }
        } catch (error) {
            toast.error("An error occurred while unpinning.");
        }
    };

    return (
        <div className="modal fade show" tabIndex="-1" style={{ display: "block" }}>
            <div className="modal-dialog modal-lg">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title text-dark">Pin Details</h5>
                        <button type="button" className="btn-close" onClick={onClose}></button>
                    </div>
                    <div className="modal-body text-center text-dark text-center">
                        <img src={pin.image_url} alt={pin.title} className="img-fluid mb-4" />
                        <h5>{pin.title}</h5>
                        <p>{pin.description}</p>
                        <p className="text-muted">Pinned on {new Date(pin.pinned_at).toLocaleDateString()}</p>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-danger" onClick={handleUnpin}>Unpin</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PinModal;
