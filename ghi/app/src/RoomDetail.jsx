import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function RoomDetail() {
    const { roomId } = useParams();
    const [room, setRoom] = useState(null);
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);


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
            {projects.length > 0 ? (
                <div className="row">
                    {projects.map((project) => (
                        <div className="col-md-6 mb-4" key={project.id}>
                            <div className='card bg-dark h-100'>
                                <div className='card-body'>
                                    <h5 className='card-title text-light'>{project.name}</h5>
                                    <p className='card-text text-light'>{project.description}</p>
                                </div>
                                <div className='card-body'>
                                    <button className='btn btn-secondary'>View Project Wishlist</button>
                                    <button className='btn btn-light ms-2'>View Project Pins</button>
                                </div>
                                <div className='card-footer text-light'>
                                    Created at: {new Date(project.created_at).toLocaleDateString()}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <p>No projects associated with this room.</p>
            )}
        </div>
    );
}

export default RoomDetail;
