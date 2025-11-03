"use client";
import React, { useState } from 'react';
import './Carousel.css';

const images = [
  '/images/lw-cosmetics-nueva.png',
];

export default function Carousel() {
  const [current, setCurrent] = useState(0);

  const prevSlide = () => {
    setCurrent((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrent((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="carousel">
      <button className="carousel-btn left" onClick={prevSlide}>&lt;</button>
      <img 
        src={images[current]} 
        alt={`Slide ${current + 1}`} 
        className="carousel-img"
        loading="eager"
        decoding="async"
      />
      <button className="carousel-btn right" onClick={nextSlide}>&gt;</button>
      <div className="carousel-indicators">
        {images.map((_, idx) => (
          <span
            key={idx}
            className={`indicator${idx === current ? ' active' : ''}`}
            onClick={() => setCurrent(idx)}
          />
        ))}
      </div>
    </div>
  );
}
