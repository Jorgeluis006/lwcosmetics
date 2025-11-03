"use client";
import React, { useState, useEffect } from 'react';
import './Carousel.css';

const images = [
  '/images/imagenes del carrusel/lw-cosmetics-nueva.png',
  '/images/imagenes del carrusel/maquillaje_con_productos_tambien_puedes_hacerlas_de_este_tamaao_porfa_2400_x_800_pixels_proporcin_3_w71lpe0gy3mm5sn24gyq_1.png',
  '/images/imagenes del carrusel/maquillaje_con_productos_tambien_puedes_hacerlas_de_este_tamaao_porfa_2400_x_800_pixels_proporcin_3_iu37mj0fi2amof5xrdjc_1.png',
  '/images/imagenes del carrusel/maquillaje_con_productos_tambien_puedes_hacerlas_de_este_tamaao_porfa_2400_x_800_pixels_proporcin_3_fcjmtvqjkkziqplps4f4_2.png',
  '/images/imagenes del carrusel/maquillaje_con_productos_tambien_puedes_hacerlas_de_este_tamaao_porfa_2400_x_800_pixels_proporcin_3_o6h9o36phh98tjtebqus_2.png',
  '/images/imagenes del carrusel/maquillaje_con_productos_tambien_puedes_hacerlas_de_este_tamaao_porfa_2400_x_800_pixels_proporcin_3_iyjcu9gejromfl192xnf_3.png',
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
