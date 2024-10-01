import React, { useEffect, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaCouch, FaBed, FaUtensils } from 'react-icons/fa';

function IdeasPage() {
    const [query, setQuery] = useState("");
    const [images, setImages] = useState([]);
    const [selectedImage, setSelectedImage] = useState(null);
    const [rooms, setRooms] = useState([]);
    const [selectedRoom, setSelectedRoom] = useState("");
    const [projects, setProjects] = useState([]);
    const [selectedProject, setSelectedProject] = useState("");

    useEffect(() => {
        fetchRooms();
    }, []);

    const fetchRooms = async () => {
        const response = await fetch(`http://localhost:8100/api/rooms/`);
        if (response.ok) {
            const data = await response.json();
            setRooms(data.rooms);
        } else {
            console.error("Failed to fetch rooms");
        }
    };

    const handleRoomChange = async (roomId) => {
        setSelectedRoom(roomId);
        fetchProjects(roomId);
    }

    const fetchProjects = async (roomId) => {
        const response = await fetch(`http://localhost:8100/api/rooms/${roomId}/projects/`);
        if (response.ok) {
            const data = await response.json();
            setProjects(data.projects);
        } else {
            console.error("Failed to fetch projects");
        }
    }

    const handleSearch = async (searchQuery) => {
        const queryToUse = searchQuery || query;

        if (!queryToUse.trim()) {
            console.error("Search query is empty");
            return;
        }

        const response = await fetch(`http://localhost:8100/api/search-inspiration?query=${queryToUse}`);
        if (response.ok) {
            const data = await response.json();
            setImages(data.photos);
        } else {
            console.error("Failed to fetch images from Pexels");
        }
    };

    const handleCategorySearch = (category) => {
        setQuery(category);
        handleSearch(category);
    };

    const handleImageClick = (image) => {
        setSelectedImage(image);
    };

    const handleAddPin = async () => {
        if (selectedImage) {
        const pinData = {
            title: "Pinned Image",
            image_url: selectedImage.picture_url,
            description: "Pinned from Ideas",
            project: selectedProject,
        };

        const response = await fetch(`http://localhost:8100/api/pins/`, {
            method: "POST",
            body: JSON.stringify(pinData),
            headers: {
                "Content-Type": "application/json",
            },
        });
        if (response.ok) {
            toast.success("Image successfully added as a pin!");
            console.log("Image added as a pin");
        } else {
            toast.error("Failed to add pin.");
            console.error("Failed to add pin");
        }
    }
}

return (
    <div className="mt-4 ideas-page-container">
        <ToastContainer />

        <div className="inspo-section bg-dark">
            <h1 className="inspo-title">Find Your Inspiration</h1>
            <p className="inspo-description">Discover ideas for your home decor and create beautiful spaces.</p>
            <div className="search-bar-container">
                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search for inspiration..."
                    className="form-control form-control-lg bg-dark text-light border-secondary search-input"
                />
                <button onClick={() => handleSearch(query)} className="btn btn-primary btn-lg search-button">Search</button>
            </div>
        </div>

    {images.length === 0 && (
        <div className="placeholder-section">
            <h2 className="placeholder-title">Explore Categories</h2>
            <div className="placeholder-cards">
                <div className="card placeholder-card" style={{cursor: "pointer"}} onClick={() => handleCategorySearch("Living room")}>
                    <div className="inspo-card-img-top text-center icon-background" style={{ fontSize: "5rem", padding: "2rem" }}>
                        <FaCouch />
                    </div>
                    <div className="card-body">
                        <h5 className="card-title">Living Room Ideas</h5>
                        <p className="card-text">Find inspiration for your living room.</p>
                    </div>
                </div>
                <div className="card placeholder-card" style={{cursor: "pointer"}} onClick={() => handleCategorySearch("Bedroom")}>
                    <div className="inspo-card-img-top text-center icon-background" style={{ fontSize: "5rem", padding: "2rem" }}>
                        <FaBed />
                    </div>
                    <div className="card-body">
                        <h5 className="card-title">Bedroom Ideas</h5>
                        <p className="card-text">Create a cozy and relaxing bedroom space.</p>
                    </div>
                </div>
                <div className="card placeholder-card" style={{cursor: "pointer"}} onClick={() => handleCategorySearch("Kitchen")}>
                    <div className="inspo-card-img-top text-center icon-background" style={{ fontSize: "5rem", padding: "2rem" }}>
                        <FaUtensils />
                    </div>
                    <div className="card-body">
                        <h5 className="card-title">Kitchen Ideas</h5>
                        <p className="card-text">Design a beautiful and functional kitchen.</p>
                    </div>
                </div>
            </div>
        </div>
    )}

        <div className="row">
                {images.map((image, index) => (
                    <div key={index} className="col-md-4 col-lg-3 mb-4">
                        <div className="card h-100" style={{ border: "none", boxShadow: "none", borderRadius: "0.5rem" }}>
                            <img src={image.picture_url} alt={`Inspiration ${index}`} className="card-img-top img-fluid" style={{ objectFit: "cover", borderRadius: "0.5rem", height: "300px", border: "none", cursor: "pointer"}} onClick={() => handleImageClick(image)} data-bs-toggle="modal" data-bs-target="#imageModal"/>
                        </div>
                    </div>
                ))}
        </div>

        <div className="modal fade" id="imageModal" tabIndex="-1" aria-labelledby="imageModalLabel" aria-hidden="true">
            <div className="modal-dialog modal-lg">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="imageModalLabel">Enlarged Image</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body text-center">
                        {selectedImage && (
                            <img src={selectedImage.picture_url} alt="Selected Inspiration" className="img-fluid" />
                        )}
                        <div className="mt-4">
                            <div className="form-group mb-3">
                                <label htmlFor='selectRoom'>Select Room</label>
                                <select id='selectRoom' className='form-control' value={selectedRoom} onChange={(e) => handleRoomChange(e.target.value)}>
                                    <option value="">Select a room</option>
                                    {rooms.map(room => (
                                        <option key={room.id} value={room.id}>{room.name}</option>
                                    ))}
                                </select>
                            </div>
                            <div className='form-group'>
                                <label htmlFor='selectProject'>Select Project</label>
                                <select id='selectProject' className='form-control' value={selectedProject} onChange={(e) => setSelectedProject(e.target.value)} disabled={!selectedRoom}>
                                    <option value=''>Select a project</option>
                                    {projects.map(project => (
                                        <option key={project.id} value={project.id}>{project.name}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-primary" onClick={handleAddPin} disabled={!selectedRoom || !selectedProject}>Add as Pin</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
  );
}

export default IdeasPage;
