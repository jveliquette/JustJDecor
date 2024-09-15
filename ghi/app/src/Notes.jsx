import React from "react";
import { useState, useEffect } from "react";

function Notes({ roomId }) {
    const [notes, setNotes] = useState([]);
    const [newNote, setNewNote] = useState('')

    const fetchNotes = async () => {
        try {
            const response = await fetch(`http://${process.env.REACT_APP_API_URL}/api/rooms/${roomId}/notes/`);
            if (response.ok) {
                const data = await response.json();
                setNotes(data.notes);
            } else {
                console.error("Failed to fetch notes.");
            }
        } catch (error) {
            console.error("An error occurred while fetching notes:", error);
        }
    }

    useEffect(() => {
        fetchNotes();
    }, [roomId]);

    const handleAddNote = async () => {
        if (newNote.trim() !== '') {
            try {
                const response = await fetch(`http://${process.env.REACT_APP_API_URL}/api/rooms/${roomId}/notes/`, {
                    method: 'POST',
                    body: JSON.stringify({ content: newNote, completed: false }),
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
                if (response.ok) {
                    const addedNote = await response.json();
                    setNotes([...notes, addedNote]);
                    setNewNote('');
                } else {
                    console.error("Failed to add note.")
                }
            } catch (error) {
                console.error("An error occurred while adding the note:", error);
            }
        }
    };

    const handleToggleComplete = async (note) => {
        const updatedNote = { ...note, completed: !note.completed };
        await fetch(`http://${process.env.REACT_APP_API_URL}/api/notes/${note.id}/`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedNote),
        });
        setNotes(notes.map((n) => (n.id === note.id ? updatedNote : n)));
    };

    const handleDeleteNote = async (noteId) => {
        await fetch(`http://${process.env.REACT_APP_API_URL}/api/notes/${noteId}/`, {
            method: 'DELETE',
        });
        setNotes(notes.filter((note) => note.id !== noteId));
    };

    return (
        <div className="notes-section">
            <h2 className="mb-4">Notes</h2>
            <div className="card bg-dark h-100 p-3">
                    <div className="input-group mb-4">
                        <input type="text" className="form-control border-secondary bg-dark text-light" placeholder="Add a new note" value={newNote} onChange={(e) => setNewNote(e.target.value)} />
                        <button className="btn btn-outline-secondary text-light" onClick={handleAddNote}>Add Note</button>
                    </div>
                <ul className="list-group list-group-flush">
                    {notes.map((note) => (
                        <li key={note.id} className="bg-dark text-light d-flex justify-content-between align-items-center">
                            <div className="input-group mb-4">
                                <div className="input-group-text bg-dark border-secondary">
                                    <input type="checkbox" checked={note.completed} onChange={() => handleToggleComplete(note)} className="form-check-input mt-0" aria-label="Checkbox for following text input" />
                                </div>
                                <input type="text" className={`form-control border-secondary bg-dark text-light ${note.completed ? 'text-decoration-line-through' : ''}`} value={note.content} readOnly />
                                <button className="btn btn-outline-danger btn-med" onClick={() => handleDeleteNote(note.id)}><i className="fas fa-trash"></i></button>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}
export default Notes;
