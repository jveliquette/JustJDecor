import { useState, useEffect } from "react";

function ProjectsList() {
    const [projects, setProjects] = useState([]);
    const [error, setError] = useState(false);

    const fetchProjects = async () => {
        const url = "http://localhost:8100/api/projects/";
        try {
            const response = await fetch(url);
            if (response.ok) {
                const data = await response.json();
                setProjects(data.projects);
            } else {
                console.error("Failed to load projects");
                setError(true);
            }
        } catch (e) {
            console.error('Fetch error:', e);
            setError(true);
        }
    };

    useEffect(() => {
        fetchProjects();
    }, []);

    return (
        <div className="container">
            <div className="row">
                {error && <div className="alert alert-danger">Failed to load projects.</div>}
                {projects.map(project => (
                    <div className="col-md-4 mb-4" key={project.id}>
                        <div className="expand-card card">
                            <div className="card-body">
                                <h5 className="card-title">{project.name}</h5>
                                <p className="card-text">{project.description}</p>
                                <p className="card-text"><small className="text-muted">Created on: {new Date(project.created_at).toLocaleDateString()}</small></p>
                                <a href={`/projects/${project.id}`} className="btn btn-dark">View Project</a>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
export default ProjectsList;
