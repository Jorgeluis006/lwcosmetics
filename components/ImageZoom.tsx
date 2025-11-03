'use client'

import { useState } from 'react'
import './ImageZoom.css'

interface ImageZoomProps {
  images: string[]
  productName: string
}

export default function ImageZoom({ images, productName }: ImageZoomProps) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [zoomPosition, setZoomPosition] = useState({ x: 50, y: 50 })

  const handleImageClick = (img: string) => {
    setSelectedImage(img)
  }

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width) * 100
    const y = ((e.clientY - rect.top) / rect.height) * 100
    setZoomPosition({ x, y })
  }

  const closeZoom = () => {
    setSelectedImage(null)
  }

  return (
    <>
      <div className="galeria-imagenes">
        {images.map((img: string, idx: number) => (
          <div 
            className="imagen-principal-wrapper" 
            key={idx} 
            onClick={() => handleImageClick(img)}
          >
            <img 
              src={img} 
              alt={productName + ' ' + (idx + 1)}
              loading={idx === 0 ? 'eager' : 'lazy'}
              decoding="async"
              className="imagen-principal"
            />
            <div className="zoom-hint">🔍 Click para ampliar</div>
          </div>
        ))}
      </div>

      {/* Modal de zoom */}
      {selectedImage && (
        <div className="zoom-modal" onClick={closeZoom}>
          <div className="zoom-modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="zoom-close" onClick={closeZoom}>✕</button>
            <div 
              className="zoom-image-container"
              onMouseMove={handleMouseMove}
              onMouseLeave={() => setZoomPosition({ x: 50, y: 50 })}
            >
              <img 
                src={selectedImage} 
                alt={productName}
                className="zoom-image"
                style={{
                  transformOrigin: `${zoomPosition.x}% ${zoomPosition.y}%`
                }}
              />
            </div>
            <div className="zoom-instructions">
              Mueve el mouse sobre la imagen para hacer zoom
            </div>
          </div>
        </div>
      )}
    </>
  )
}
