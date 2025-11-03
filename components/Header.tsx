'use client'

import Link from 'next/link'
import { useState, useRef, useEffect } from 'react'
import { useCart } from '../context/CartContext'
import { useRouter, usePathname } from 'next/navigation'

export default function Header(){
  const [showCategorias, setShowCategorias] = useState(false)
  const [showContacto, setShowContacto] = useState(false)
  const [showUserMenu, setShowUserMenu] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [user, setUser] = useState<any>(null)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const userMenuRef = useRef<HTMLDivElement>(null)
  const { getTotalItems } = useCart()
  const router = useRouter()
  const pathname = usePathname()

  // Función para cargar usuario del localStorage
  const loadUser = () => {
    const userData = localStorage.getItem('user')
    if (userData) {
      setUser(JSON.parse(userData))
    } else {
      setUser(null)
    }
  }

  useEffect(() => {
    // Cargar usuario inicialmente
    loadUser()

    // Escuchar cambios en localStorage (cuando se actualiza desde otra pestaña o componente)
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'user') {
        loadUser()
      }
    }

    // Escuchar evento personalizado para actualizaciones del mismo tab
    const handleUserUpdate = () => {
      loadUser()
    }

    window.addEventListener('storage', handleStorageChange)
    window.addEventListener('userUpdated', handleUserUpdate)

    return () => {
      window.removeEventListener('storage', handleStorageChange)
      window.removeEventListener('userUpdated', handleUserUpdate)
    }
  }, [])

  // Recargar usuario cada vez que cambia la ruta
  useEffect(() => {
    loadUser()
  }, [pathname])

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowCategorias(false)
      }
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setShowUserMenu(false)
      }
    }
    if (showCategorias || showUserMenu) {
      document.addEventListener('mousedown', handleClickOutside)
    } else {
      document.removeEventListener('mousedown', handleClickOutside)
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [showCategorias, showUserMenu])

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

  function handleLogout() {
    localStorage.removeItem('user')
    setUser(null)
    setShowUserMenu(false)
    // Disparar evento para que otros componentes se actualicen
    window.dispatchEvent(new Event('userUpdated'))
    router.push('/')
  }

  function getInitials(name: string) {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2)
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
                  <li><Link href="/productos/categoria/ojos" className="dropdown-link" onClick={handleOptionClick} prefetch={true}>Ojos</Link></li>
                  <li><Link href="/productos/categoria/labios" className="dropdown-link" onClick={handleOptionClick} prefetch={true}>Labios</Link></li>
                  <li><Link href="/productos/categoria/rostro" className="dropdown-link" onClick={handleOptionClick} prefetch={true}>Rostro</Link></li>
                  <li><Link href="/productos/categoria/unas" className="dropdown-link" onClick={handleOptionClick} prefetch={true}>Uñas</Link></li>
                </ul>
              )}
            </div>
            <Link href="/carrito" className="nav-link cart-link">
              Carrito 🛒
              {getTotalItems() > 0 && (
                <span className="cart-badge">{getTotalItems()}</span>
              )}
            </Link>
            
            {/* Avatar de usuario si está logueado, sino mostrar "Perfil" */}
            {user ? (
              <div className="user-avatar-container" ref={userMenuRef}>
                <div 
                  className="user-avatar" 
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  title={user.name}
                >
                  {user.profileImage ? (
                    <img 
                      src={user.profileImage} 
                      alt={user.name}
                      className="user-avatar-img"
                    />
                  ) : (
                    <span className="user-avatar-initials">{getInitials(user.name)}</span>
                  )}
                </div>
                {showUserMenu && (
                  <div className="user-dropdown">
                    <div className="user-dropdown-header">
                      <div className="user-dropdown-name">{user.name}</div>
                      <div className="user-dropdown-email">{user.email}</div>
                    </div>
                    <div className="user-dropdown-divider"></div>
                    <Link href="/mi-perfil" className="user-dropdown-item" onClick={() => setShowUserMenu(false)}>
                      👤 Mi Perfil
                    </Link>
                    <Link href="/mis-pedidos" className="user-dropdown-item" onClick={() => setShowUserMenu(false)}>
                      📦 Mis Pedidos
                    </Link>
                    {user.isAdmin && (
                      <>
                        <div className="user-dropdown-divider"></div>
                        <Link href="/admin" className="user-dropdown-item" onClick={() => setShowUserMenu(false)}>
                          ➕ Admin Productos
                        </Link>
                        <Link href="/admin/pedidos" className="user-dropdown-item" onClick={() => setShowUserMenu(false)}>
                          🛍️ Admin Pedidos
                        </Link>
                      </>
                    )}
                    <div className="user-dropdown-divider"></div>
                    <button className="user-dropdown-item logout-btn" onClick={handleLogout}>
                      🚪 Cerrar Sesión
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link href="/login" className="nav-link">Perfil 👤</Link>
            )}
            
            <span className="nav-link" style={{cursor:'pointer'}} onClick={() => setShowContacto(true)}>Contacto</span>
              {showContacto && (
                <div style={{position:'fixed',top:0,left:0,width:'100vw',height:'100vh',background:'rgba(0,0,0,0.25)',zIndex:9999,display:'flex',alignItems:'center',justifyContent:'center'}} onClick={()=>setShowContacto(false)}>
                  <div style={{background:'#fff',borderRadius:16,padding:32,boxShadow:'0 4px 24px #c026d344',minWidth:320,textAlign:'center',fontFamily:'var(--font-title)',fontSize:'1.3rem',color:'#7c3aed',position:'relative'}} onClick={e=>e.stopPropagation()}>
                    <div style={{fontWeight:600,fontSize:'1.5rem',marginBottom:12}}>Contacto</div>
                    <div>Luisa Escobar</div>
                    <div style={{margin:'8px 0'}}>📞 312 423 9687</div>
                    <a 
                      href="https://wa.me/573124239687" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      style={{display:'inline-block',marginTop:18,padding:'8px 24px',borderRadius:8,border:'none',background:'#25D366',color:'#fff',fontWeight:500,fontSize:'1.1rem',cursor:'pointer',textDecoration:'none'}}
                    >
                      💬 Enviar WhatsApp
                    </a>
                    <button style={{marginTop:12,padding:'8px 24px',borderRadius:8,border:'none',background:'#c026d3',color:'#fff',fontWeight:500,fontSize:'1.1rem',cursor:'pointer',display:'block',width:'100%'}} onClick={()=>setShowContacto(false)}>Cerrar</button>
                  </div>
                </div>
              )}
          </nav>
        </div>
      </header>
    </>
  )
}
