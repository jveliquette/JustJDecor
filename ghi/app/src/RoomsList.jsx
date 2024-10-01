import { useState, useEffect } from "react";
import AddRoomForm from "./AddRoomForm";
import RoomDeleteConfirmationModal from "./RoomDeleteConfirmationModal";
import { Link } from "react-router-dom";

function RoomsList() {
    const [rooms, setRooms] = useState([]);
    const [error, setError] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [roomToDelete, setRoomToDelete] = useState(null);

    const fetchData = async () => {
        const url = `http://localhost:8100/api/rooms/`;
        try {
            const response = await fetch(url);
            if (response.ok) {
                const data = await response.json();
                setRooms(data.rooms);
            } else {
                console.error("Failed to load rooms");
                setError(true);
            }
        } catch (e) {
            console.error('Fetch error:', e);
            setError(true);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleRoomAdded = (newRoom) => {
        setRooms([...rooms, newRoom]);
    };

    const handleOpenModal = () => {
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    const handleDeleteRoom = async (roomId) => {
        const url = `http://localhost:8100/api/rooms/${roomId}/`;
        try {
            const response = await fetch(url, {
                method: "DELETE",
            });
            if (response.ok) {
                setRooms(rooms.filter((room) => room.id !== roomId));
                setShowDeleteModal(false);
            } else {
                console.error("Failed to delete room");
                setError(true);
            }
        } catch (e) {
            console.error("Error deleting room:", e);
            setError(true);
        }
    };

    const handleShowDeleteModal = (room) => {
        setRoomToDelete(room);
        setShowDeleteModal(true);
    };

    const handleCloseDeleteModal = () => {
        setShowDeleteModal(false);
    };


    return (
        <div className="container">
            <h1>My Rooms</h1>
            <button className="btn btn-primary my-4" onClick={handleOpenModal}>Add Room</button>

            {showModal && <div className="modal-overlay show"></div>}
            {showDeleteModal && <div className="modal-overlay show"></div>}
            {showModal && (
                <AddRoomForm onRoomAdded={handleRoomAdded} onClose={handleCloseModal} />
            )}
            {showDeleteModal && (
                <RoomDeleteConfirmationModal room={roomToDelete} onDeleteConfirm={handleDeleteRoom} onClose={handleCloseDeleteModal} />
            )}
            <div className="row">
                {error && <div className="alert alert-danger">Failed to load rooms.</div>}
                {rooms.map(room => (
                    <div className="col-md-4 mb-4" key={room.id}>
                        <div className="expand-card card bg-dark text-center">
                            <div className="card-body mb-5">
                                <h5 className="card-title text-light">{room.name}</h5>
                                <img src={room.image_url} alt={room.name} className="img-fluid rounded mb-3" style={{ maxHeight: '200px', objectFit: 'cover', width: '100%' }} />
                                <Link to={`/rooms/${room.id}`} className="btn btn-secondary">View Room</Link>
                                <button className="btn btn-light ms-2" onClick={() => handleShowDeleteModal(room)}>Delete <i className="fa-solid fa-trash"></i></button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default RoomsList;
