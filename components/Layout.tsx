import React from 'react'
import Header from './Header'
import Footer from './Footer'

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="site">
      <Header />
      <main className="container content">{children}</main>
      <Footer />
    </div>
  )
}

export default Layout
