import React, { useEffect, useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';
const API_BASE_URL = process.env.REACT_APP_API_URL;

function HeroSection() {
    const [photos, setPhotos] = useState([]);

  const fetchPhotos = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/main-photos/`);
      if (response.ok) {
        const data = await response.json();
        setPhotos(data.photos);
      } else {
        console.error("Failed to fetch images from Pexels");
      }
    } catch (error) {
      console.error("An error occurred while fetching photos:", error);
    }
  };

  useEffect(() => {
    fetchPhotos();
  }, []);


  return (
    <div className="container-fluid hero-section">
      <div className="row justify-content-center align-items-center text-center">
        <div className="col-12 col-md-8">
          <div className="hero-paragraph p-4">
            <h1 className="display-4">Welcome to JustJDecor</h1>
            <p className="lead">JustJDecor is your ultimate home decor and design tool. Organize your ideas, create beautiful rooms, and get inspired by the latest trends in home decor.</p>
          </div>
            <Carousel>
              {photos.map((photo) => (
                <Carousel.Item key={photo.id}>
                    <img className="d-block w-100 img-fluid" src={photo.picture_url} alt={photo.alt || 'Image'} style={{ height: '500px', objectFit: 'cover' }}/>
                </Carousel.Item>
              ))}
            </Carousel>
        </div>
      </div>
    </div>
  );
}

export default HeroSection;
