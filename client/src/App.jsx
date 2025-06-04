import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import ProductByBrandPage from './pages/ProductByBrandPage'
import ProductByCategoryPage from './pages/ProductByCategoryPage'
import ProductByKeywordPage from './pages/ProductByKeywordPage'
import ProductDetailsPage from './pages/ProductDetailsPage'
import LoginPage from './pages/LoginPage'
import OTPPage from './pages/OTPPage'

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/by-brand/:id' element={<ProductByBrandPage />} />
          <Route path='/by-category/:id' element={<ProductByCategoryPage />} />
          <Route path='/by-keyword/:keyword' element={<ProductByKeywordPage />} />
          <Route path='/details/:id' element={<ProductDetailsPage />} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/verify-otp' element={<OTPPage />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App