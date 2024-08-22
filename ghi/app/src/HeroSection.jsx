import React, { useEffect, useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import axios from 'axios'

function HeroSection() {
    const [photos, setPhotos] = useState([]);

    useEffect(() => {
        const fetchPhotos = async () => {
          try {
            const response = await axios.get('https://api.pexels.com/v1/search', {
              headers: {
                Authorization: import.meta.env.VITE_PEXELS_API_KEY,
              },
              params: {
                query: 'home decor',
                per_page: 10,
              },
            });

            setPhotos(response.data.photos);
          } catch (error) {
                console.error('Error fetching photos from Pexels API', error);
          }
        };

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
                <img className="d-block w-100" src={photo.src.landscape} alt={photo.alt}/>
              </Carousel.Item>
            ))}
          </Carousel>
        </div>
      </div>
    </div>
  );
}

export default HeroSection;
