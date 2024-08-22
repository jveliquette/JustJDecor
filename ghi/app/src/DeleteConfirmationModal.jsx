function DeleteConfirmationModal({ room, onDeleteConfirm, onClose }) {
    return (
        <div className="modal fade show" tabIndex="-1" style={{ display: "block" }}>
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title text-dark">Delete Room</h5>
                        <button type="button" className="btn-close" onClick={onClose}></button>
                    </div>
                    <div className="modal-body text-dark">
                        <p>Are you sure you want to delete <strong>{room.name}</strong>? This cannot be undone.</p>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" onClick={onClose}>Cancel</button>
                        <button type="button" className="btn btn-danger" onClick={() => onDeleteConfirm(room.id)}>Delete</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DeleteConfirmationModal;
