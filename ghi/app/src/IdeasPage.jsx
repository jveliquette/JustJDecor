import React, { useEffect, useState } from 'react';

function IdeasPage() {
    const [query, setQuery] = useState("");
    const [images, setImages] = useState([]);
    const [selectedImage, setSelectedImage] = useState(null);

    const handleSearch = async () => {
    const response = await fetch(`http://localhost:8100/api/search-inspiration?query=${query}`);
    if (response.ok) {
        const data = await response.json();
        setImages(data.photos);
    } else {
        console.error("Failed to fetch images from Pexels");
    }
    };

    const handleImageClick = (image) => {
        setSelectedImage(image);
    };

    const handleAddPin = async () => {
        if (selectedImage) {
        const pinData = {
            title: "Pinned Image",
            image_url: selectedImage.picture_url,
            description: "Pinned from IdeasPage",
            room: 1, // FIX THIS
        };

        const response = await fetch("http://localhost:8100/api/pins/", {
            method: "POST",
            body: JSON.stringify(pinData),
            headers: {
                "Content-Type": "application/json",
            },
        });
        if (response.ok) {
            console.log("Image added as a pin");
        } else {
            console.error("Failed to add pin");
        }
    }
}

return (
    <div className="container mt-4">
        <div className="row mb-4">
            <div className="col">
                <input type="text" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search for inspiration..." className="form-control form-control-lg"/>
            </div>
            <div className="col-auto">
                <button onClick={handleSearch} className="btn btn-dark btn-lg">Search</button>
            </div>
        </div>
        <div className="row">
            {images.length > 0 ? (
                images.map((image, index) => (
                    <div key={index} className="col-md-4 col-lg-3 mb-4">
                        <div className="card h-100">
                            <img src={image.picture_url} alt={`Inspiration ${index}`} className="card-img-top img-fluid" style={{ objectFit: "cover", height: "300px", border: "none" }} onClick={() => handleImageClick(image)} data-bs-toggle="modal" data-bs-target="#imageModal"/>
                        </div>
                    </div>
                ))
            ) : (
                <p>No images found. Try a different search term.</p>
            )}
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
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-primary" onClick={handleAddPin}>Add as Pin</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
  );
}

export default IdeasPage;
