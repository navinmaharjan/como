import React from 'react'
import Header from './components/Header'
import Footer from './components/Footer'

const ClientLayout = ({ children }) => {
  return (
    <div>
      <div>
        <Header />
      </div>
      {children}
      {/* <Footer /> */}
    </div>
  )
}

export default ClientLayout