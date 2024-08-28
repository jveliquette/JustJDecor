import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Notes from './Notes';
import { Link } from 'react-router-dom';
import ProjectDeleteConfirmationModal from './ProjectDeleteConfirmationModal';

function RoomDetail() {
    const { roomId } = useParams();
    const [room, setRoom] = useState(null);
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isAddingProject, setIsAddingProject] = useState(false);
    const [newProjectName, setNewProjectName] = useState("");
    const [newProjectDescription, setNewProjectDescription] = useState("");
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [selectedProject, setSelectedProject] = useState(null);

    const fetchRoomDetails = async () => {
        try {
            const roomResponse = await fetch(`http://localhost:8100/api/rooms/${roomId}/`);
            if (roomResponse.ok) {
                const roomData = await roomResponse.json();
                setRoom(roomData);

                const projectsResponse = await fetch(`http://localhost:8100/api/rooms/${roomId}/projects/`);
                if (projectsResponse.ok) {
                    const projectsData = await projectsResponse.json();
                    setProjects(projectsData.projects);
                } else {
                    console.error("Failed to fetch projects.");
                }
            } else {
                console.error("Failed to fetch room details.");
            }
        } catch (error) {
            console.error("An error occurred while fetching room details:", error);
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        fetchRoomDetails();
    }, [roomId]);

    const handleProjectClick = () => {
        setIsAddingProject(true);
    }

    const handleSaveProject = async () => {
        const data = {};
        data.name = newProjectName;
        data.description = newProjectDescription;
        data.room = roomId;

        try {
            const response = await fetch(`http://localhost:8100/api/projects/`, {
                method: "POST",
                body: JSON.stringify(data),
                headers: {
                    "Content-Type": "application/json",
                }
            });
            if (response.ok) {
                const savedProject = await response.json();
                setProjects([...projects, savedProject]);
                resetForm();
            } else {
                console.error("Failed to save project.");
            }
        } catch (error) {
            console.error("An error occurred while saving the project:", error);
        }
    };

    const handleDeleteProject = (project) => {
        setSelectedProject(project);
        setShowDeleteModal(true);
    };

    const handleDeleteConfirm = async (projectId) => {
        try {
            const response = await fetch(`http://localhost:8100/api/projects/${projectId}/`, {
                method: "DELETE",
            });

            if (response.ok) {
                setProjects(projects.filter(project => project.id !== projectId));
                console.log("Project deleted successfully.");
                setShowDeleteModal(false);
                setSelectedProject(null);
            } else {
                console.error("Failed to delete project.");
            }
        } catch (error) {
            console.error("An error occurred while deleting the project:", error);
        }
    };

    const handleCancelProject = () => {
        resetForm();
    };

    const resetForm = () => {
        setIsAddingProject(false);
        setNewProjectName("");
        setNewProjectDescription("");
    };

    if (loading) {
        return <p>Loading room details...</p>;
    }

    if (!room) {
        return <p>Room not found.</p>;
    }

    return (
        <div className="container mt-5">
            <div className="card bg-dark mb-4">
                <div className="card-body text-center">
                    <h1 className="card-title display-4 text-light">{room.name}</h1>
                    {room.image_url && (
                        <img src={room.image_url} alt={room.name} className="img-fluid rounded my-3" style={{ maxHeight: '400px', objectFit: 'cover' }}/>
                    )}
                </div>
            </div>
            <h2 className="mb-4">Projects</h2>
                <div className="row">
                    {projects.map((project) => (
                        <div className="col-md-6 mb-4" key={project.id}>
                            <div className='card bg-dark h-100 text-center'>
                                <div className='card-body'>
                                    <h5 className='card-title text-light'>{project.name}</h5>
                                    <p className='card-text text-light'>{project.description}</p>
                                </div>
                                <div className='card-body'>
                                    <button className='btn btn-outline-info'>Wishlist <i className="fas fa-heart"></i></button>
                                    <Link to={`/projects/${project.id}/pins`} className='btn btn-outline-info ms-2'>Pins <i className="fas fa-thumbtack"></i></Link>
                                </div>
                                <div className='card-footer text-light'>
                                    Created on: {new Date(project.created_at).toLocaleDateString()}
                                </div>
                                <div className='card-footer text-light'>
                                    <button className='btn btn-secondary btn-sm' onClick={() => handleDeleteProject(project)}>Delete <i className="fas fa-trash"></i></button>
                                </div>
                            </div>
                        </div>
                    ))}
                    <div className="col-md-6 mb-4">
                        {isAddingProject ? (
                            <div className='card bg-dark h-100 text-light p-4'>
                                <div className='mb-3'>
                                    <label className='form-label'>Project Name</label>
                                    <input type="text" className='form-control bg-dark text-light border-secondary' required value={newProjectName} onChange={(e) => setNewProjectName(e.target.value)} />
                                </div>
                                <div className='mb-3'>
                                    <label className='form-label'>Project Description</label>
                                    <textarea className='form-control bg-dark text-light border-secondary' value={newProjectDescription} onChange={(e) => setNewProjectDescription(e.target.value)} rows="3" />
                                </div>
                                <div className='text-center'>
                                    <button className='btn btn-info me-2' onClick={handleSaveProject}>Save</button>
                                    <button className='btn btn-secondary' onClick={handleCancelProject}>Cancel</button>
                                </div>
                            </div>
                        ) : (
                            <div className='card bg-dark h-100 text-light d-flex align-items-center justify-content-center'>
                                <div className='card-body text-center'>
                                    <h5 className='card-title mb-4'>Add a Project</h5>
                                    <button className='btn btn-outline-info' onClick={handleProjectClick}><i className="fas fa-plus"></i></button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            <Notes roomId={roomId} />

            {showDeleteModal && <div className="modal-overlay show"></div>}
            {showDeleteModal && (
                <ProjectDeleteConfirmationModal project={selectedProject} onDeleteConfirm={handleDeleteConfirm} onClose={() => setShowDeleteModal(false)} />
            )}
        </div>
    );
}

export default RoomDetail;
