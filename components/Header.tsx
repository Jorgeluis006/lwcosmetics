'use client'

import Link from 'next/link'
import { useState, useRef, useEffect } from 'react'
import { useCart } from '../context/CartContext'
import { useRouter } from 'next/navigation'

export default function Header(){
  const [showCategorias, setShowCategorias] = useState(false)
  const [showContacto, setShowContacto] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const dropdownRef = useRef<HTMLDivElement>(null)
  const { getTotalItems } = useCart()
  const router = useRouter()

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowCategorias(false)
      }
    }
    if (showCategorias) {
      document.addEventListener('mousedown', handleClickOutside)
    } else {
      document.removeEventListener('mousedown', handleClickOutside)
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [showCategorias])

  function handleDropdownClick() {
    setShowCategorias((v) => !v)
  }

  function handleOptionClick() {
    setShowCategorias(false)
  }

  function handleSearch(e: React.FormEvent) {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/productos?buscar=${encodeURIComponent(searchQuery.trim())}`)
      setSearchQuery('')
    }
  }

  function handleSearchKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter') {
      handleSearch(e as any)
    }
  }

  return (
    <>
      <div className="topbar">
        <div className="topbar-content">
          <span>Envíos gratis por compras desde $150.000 COP</span>
          <span className="topbar-right">
            <span role="img" aria-label="Colombia" style={{marginRight:8}}>🇨🇴</span>
            <Link href="/perfil" className="topbar-link">Mi Cuenta</Link>
          </span>
        </div>
      </div>
      <header className="site-header pretty-header">
        <div className="container header-inner">
          <div className="brand">
            <Link href="/" className="brand-logo">LW<span className="brand-accent">Cosmetics</span></Link>
          </div>
          <div className="search-bar">
            <input 
              type="text" 
              placeholder="Buscar..." 
              className="search-input" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={handleSearchKeyDown}
            />
            <span className="search-icon" onClick={handleSearch} style={{cursor:'pointer'}}>🔍</span>
          </div>
          <nav className="nav">
            {/* <Link href="/productos" className="nav-link">Productos</Link> */}
            <div className="nav-dropdown" ref={dropdownRef}>
              <span className="nav-link" onClick={handleDropdownClick} style={{cursor:'pointer'}}>
                Categorías ▾
              </span>
              {showCategorias && (
                <ul className="dropdown-list">
                  <li><Link href="/productos/categoria/ojos" className="dropdown-link" onClick={handleOptionClick}>Ojos</Link></li>
                  <li><Link href="/productos/categoria/labios" className="dropdown-link" onClick={handleOptionClick}>Labios</Link></li>
                  <li><Link href="/productos/categoria/rostro" className="dropdown-link" onClick={handleOptionClick}>Rostro</Link></li>
                  <li><Link href="/productos/categoria/unas" className="dropdown-link" onClick={handleOptionClick}>Uñas</Link></li>
                </ul>
              )}
            </div>
            <Link href="/carrito" className="nav-link cart-link">
              Carrito 🛒
              {getTotalItems() > 0 && (
                <span className="cart-badge">{getTotalItems()}</span>
              )}
            </Link>
            <Link href="/login" className="nav-link">Perfil 👤</Link>
              <span className="nav-link" style={{cursor:'pointer'}} onClick={() => setShowContacto(true)}>Contacto</span>
              {showContacto && (
                <div style={{position:'fixed',top:0,left:0,width:'100vw',height:'100vh',background:'rgba(0,0,0,0.25)',zIndex:9999,display:'flex',alignItems:'center',justifyContent:'center'}} onClick={()=>setShowContacto(false)}>
                  <div style={{background:'#fff',borderRadius:16,padding:32,boxShadow:'0 4px 24px #c026d344',minWidth:320,textAlign:'center',fontFamily:'var(--font-title)',fontSize:'1.3rem',color:'#7c3aed',position:'relative'}} onClick={e=>e.stopPropagation()}>
                    <div style={{fontWeight:600,fontSize:'1.5rem',marginBottom:12}}>Contacto</div>
                    <div>Luisa Escobar</div>
                    <div style={{margin:'8px 0'}}>📞 300 3476918</div>
                    <button style={{marginTop:18,padding:'8px 24px',borderRadius:8,border:'none',background:'#c026d3',color:'#fff',fontWeight:500,fontSize:'1.1rem',cursor:'pointer'}} onClick={()=>setShowContacto(false)}>Cerrar</button>
                  </div>
                </div>
              )}
          </nav>
        </div>
      </header>
    </>
  )
}
