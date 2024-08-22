import { useState } from "react";

function AddRoomForm({ onRoomAdded, onClose }) {
    const [name, setName] = useState("");
    const [imageUrl, setImageUrl] = useState("");
    const [error, setError] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const url = "http://localhost:8100/api/rooms/";
        const data = {};
        data.name = name;
        data.image_url = imageUrl

        try {
            const response = await fetch(url, {
                method: "POST",
                body: JSON.stringify(data),
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (response.ok) {
                const newRoom = await response.json();
                onRoomAdded(newRoom);
                setName("");
                setImageUrl("");
                onClose();
            } else {
                console.error("Failed to add room");
                setError(true);
            }
        } catch (e) {
            console.error("Error adding room:", e);
            setError(true);
        }
    };

    return (
        <div className="modal fade show" tabIndex="-1" style={{ display: "block" }}>
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title text-dark">Add Room</h5>
                        <button type="button" className="btn-close" onClick={onClose}></button>
                    </div>
                    <div className="modal-body">
                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label htmlFor="name" className="text-dark">Room Name</label>
                                <input type="text" className="form-control" id="name" value={name} onChange={(e) => setName(e.target.value)} required />
                            </div>
                            {/* <div className="form-group">
                                <label htmlFor="image_url" className="text-dark">Image URL</label>
                                <input className="form-control" id="image_url"value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} required />
                            </div> */}
                            {error && <div className="alert alert-danger">Failed to add room.</div>}
                            <button type="submit" className="btn btn-primary mt-2">Add Room</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default AddRoomForm;
