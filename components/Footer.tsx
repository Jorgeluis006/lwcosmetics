import Link from 'next/link'

export default function Footer(){
  return (
    <footer className="site-footer">
      <div className="container">
        <p>© {new Date().getFullYear()} LWCosmetics — Hecho con <span style={{color:'#c026d3'}}>❤️</span></p>
        <div className="footer-social">
          <a href="https://instagram.com" target="_blank" rel="noopener" title="Instagram">📸</a>
          <a href="https://facebook.com" target="_blank" rel="noopener" title="Facebook">📘</a>
          <a href="mailto:info@lwcosmetics.com" title="Email">✉️</a>
        </div>
        <div style={{marginTop: '12px', fontSize: '0.9rem'}}>
          <Link href="/admin/productos" className="footer-admin-link">Administración</Link>
        </div>
      </div>
    </footer>
  )
}
