import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import ProductByBrand from './pages/ProductByBrand'
import ProductByCategory from './pages/ProductByCategory'
import ProductByKeyword from './pages/ProductByKeyword'

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/by-brand/:id' element={<ProductByBrand />} />
          <Route path='/by-category/:id' element={<ProductByCategory />} />
          <Route path='/by-keyword/:keyword' element={<ProductByKeyword />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App