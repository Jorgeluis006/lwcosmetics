"use client";
import React, { useState, useEffect } from 'react';
import './Carousel.css';

const images = [
  '/images/lw-cosmetics-nueva.png',
  '/images/318318607_1135578437145790_2604222484458761246_n.jpg',
  '/images/hermosa-mujer-joven-con-maquillaje-profesional.jpg',
  '/images/vista-lateral-del-cepillo-de-labios-de-mano.jpg',
];

export default function Carousel() {
  const [current, setCurrent] = useState(0);

  // Auto-play: cambiar imagen cada 5 segundos
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

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
