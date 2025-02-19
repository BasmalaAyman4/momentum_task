import React from 'react'
import { Route, Routes, useLocation, BrowserRouter } from "react-router-dom";
import Home from './Pages/Home';
import Products from './Component/Products/Products';
import Productdetails from './Component/Productdetails/Productdetails';
const Routers = () => {
  return (
    <>
     <Routes>
            <Route exact path="/" element={<Home/>} />
            <Route path='/products' element={<Products/>}/>
            <Route path="/product-details/:id" element={<Productdetails/>} />
        </Routes>
    </>
  )
}

export default Routers