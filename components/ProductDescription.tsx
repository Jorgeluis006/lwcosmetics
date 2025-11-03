'use client'

import { useState } from 'react'

interface ProductDescriptionProps {
  description: string
}

// Función para formatear la descripción
function formatDescription(description: string) {
  if (!description) return ''
  
  // Convertir texto en negrita usando ** o palabras clave
  let formatted = description
    // Detectar patrones como "Descripción:", "Material o Ingredientes:", etc.
    .replace(/^(Descripción|Material o Ingredientes|Beneficios|Modo de uso|Contenido|DESCRIPCION|MATERIAL O INGREDIENTES|BENEFICIOS|MODO DE USO|CONTENIDO):/gmi, '<strong>$1:</strong>')
    // Detectar patrones al inicio de línea seguidos de dos puntos
    .replace(/^([A-ZÁÉÍÓÚÑ][A-Za-záéíóúñ\s]+):/gm, '<strong>$1:</strong>')
    // Convertir saltos de línea dobles en párrafos
    .split('\n\n')
    .map(paragraph => `<p>${paragraph.replace(/\n/g, '<br>')}</p>`)
    .join('')
  
  return formatted
}

export default function ProductDescription({ description }: ProductDescriptionProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  
  const formattedDescription = formatDescription(description)
  const isLongDescription = description.length > 500
  
  const displayDescription = isExpanded || !isLongDescription 
    ? formattedDescription 
    : formattedDescription.substring(0, 500) + '...'

  return (
    <div className="producto-descripcion-container">
      <div 
        className={`producto-descripcion-larga ${!isExpanded && isLongDescription ? 'collapsed' : ''}`}
        dangerouslySetInnerHTML={{ __html: displayDescription }}
      />
      {isLongDescription && (
        <button 
          onClick={() => setIsExpanded(!isExpanded)}
          className="ver-mas-btn"
        >
          {isExpanded ? 'Ver menos ▲' : 'Ver más ▼'}
        </button>
      )}
    </div>
  )
}
