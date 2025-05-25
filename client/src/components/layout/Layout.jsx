import React from 'react'
import AppNavbar from './AppNavbar'
import Footer from './Footer'

const Layout = ({ children }) => {
  return (
    <>
      <AppNavbar />
      {children}
      <Footer />
    </>
  )
}

export default Layout