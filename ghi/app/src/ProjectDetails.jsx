import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

function ProjectDetails() {
    const { id } = useParams();
    const [project, setProject] = useState(null);
    const [error, setError] = useState(false);

    const fetchProjectDetails = async () => {
        const url = `http://localhost:8090/api/projects/${id}/`;
        try {
            const response = await fetch(url);
            if (response.ok) {
                const data = await response.json();
                setProject(data);
            } else {
                console.error("Failed to load project details");
                setError(true);
            }
        } catch (e) {
            console.error('Fetch error:', e);
            setError(true);
        }
    };

    useEffect(() => {
        fetchProjectDetails();
    }, [id]);

    if (error) {
        return <div className="alert alert-danger">Failed to load project details.</div>;
    }

    if (!project) {
        return <div>Loading...</div>;
    }

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-8 offset-md-2">
                    <div className="card mt-4">
                        <div className="card-body">
                            <h3 className="card-title">{project.name}</h3>
                            <p className="card-text"><strong>Description:</strong> {project.description}</p>
                            <p className="card-text"><strong>Created At:</strong> {new Date(project.created_at).toLocaleDateString()}</p>
                            <hr />
                            <h5>Room Details</h5>
                            <p><strong>Name:</strong> {project.room.name}</p>
                            <p><strong>Type:</strong> {project.room.room_type}</p>
                            <p><strong>Description:</strong> {project.room.description}</p>
                            <hr />
                            <h5>User Details</h5>
                            <p><strong>Username:</strong> {project.user.username}</p>
                            <p><strong>Email:</strong> {project.user.email}</p>
                            <p><strong>Bio:</strong> {project.user.bio}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProjectDetails;
