import React from 'react'
import { Route, Routes } from 'react-router';
import Home from './pages/Home/components/MainSection';
import Layout from './layout/Layout';
import ProductDetails from './pages/ProductDetails/ProductDetails';
import HomePage from './pages/Home';
import { ToastContainer } from 'react-toastify';
import CategoryDetails from './pages/Category/CategoryDetails';

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path='/category/:categoryId' element={<CategoryDetails />} />
          <Route path='productDetail/:id' element={<ProductDetails />} />
        </Route>
      </Routes>
      <ToastContainer />
    </>
  )
};

export default App;