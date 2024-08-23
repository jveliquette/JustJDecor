import React, { useEffect } from 'react';
import 'aos/dist/aos.css';
import AOS from 'aos';
import { Link } from 'react-router-dom';

function ScrollAnimationSection() {
  useEffect(() => {
    AOS.init({ duration: 1200 });
  }, []);

  return (
    <div className="scroll container">
      <div className="row mb-5">
        <div className="col-12">
          <h2 className="scroll-h2" data-aos="fade-up">Get Started in 4 Easy Steps:</h2>
        </div>
        <div className="col-12" data-aos="fade-up" data-aos-delay="200">
          <h3><i className="steps-icon fas fa-user-plus"></i><span></span>Step 1: Create Your Profile</h3>
          <p className='scroll-p'>Sign up and create your profile. Fill in your preferences and start exploring decor ideas.</p>
        </div>
        <div className="col-12" data-aos="fade-up" data-aos-delay="300">
          <h3><i className="steps-icon fas fa-home"></i><span></span>Step 2: Add Your Rooms</h3>
          <p className='scroll-p'>Start by adding rooms to your profile. Organize your home into different spaces and get personalized suggestions.</p>
        </div>
        <div className="col-12" data-aos="fade-up" data-aos-delay="400">
          <h3><i className="steps-icon fas fa-hammer"></i><span></span>Step 3: Add Projects to Your Rooms</h3>
          <p className='scroll-p'>Bring your vision to life by adding projects to each room. Detail your plans and track your progress as you transform your space.</p>
        </div>
        <div className="col-12" data-aos="fade-up" data-aos-delay="500">
          <h3><i className="steps-icon fas fa-thumbtack"></i><span></span>Step 4: Start Pinning Ideas</h3>
          <p className='scroll-p'>Browse through decor ideas, save your favorites, and start planning your next room makeover.</p>
        </div>
      </div>
      <div className="row text-center">
        <div className="col-12 mb-2">
            <button className="btn btn-light btn-lg" data-aos="zoom-in"><i className="fas fa-sign-in-alt"></i> Sign Up Now</button>
            <Link to="/ideas" className="btn btn-outline-light btn-lg ms-4" data-aos="zoom-in" data-aos-delay="100"><i className="fas fa-search"></i> Explore Decor Ideas</Link>
        </div>
      </div>
    </div>
  );
}

export default ScrollAnimationSection;
