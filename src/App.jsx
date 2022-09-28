import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";

import Register from "./pages/Register";
import Login from "./pages/Login";

import Index from "./pages/dashboard/Index";

import Categories from "./pages/dashboard/categories/Categories";
import AddCategory from "./pages/dashboard/categories/AddCategory";
import EditCategory from "./pages/dashboard/categories/EditCategory";

// import Annonces from "./pages/dashboard/annonces/Annonces";
import AddAnnonce from "./pages/dashboard/annonces/AddAnnonce";
// import EditAnnonce from "./pages/dashboard/annonces/EditAnnonce";

function App() {

  const token = localStorage.getItem("access_token");

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="*" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        {/* <Route path="/dashboard/index" element={<Index />} /> */}
        <Route path="/dashboard/index" element={token ? <Index/> : <Login/> }></Route>

          <Route path="/dashboard/categories/add" element={<AddCategory />} />
          <Route path="/dashboard/categories/edit/:category" element={<EditCategory />} />
        <Route path="/dashboard/categories" element={<Categories />} /> 
{/* 
        <Route path="/dashboard/annonces" element={<Annonces />} /> */}
        <Route path="/dashboard/annonces/add" element={<AddAnnonce />} />
        {/* <Route path="/dashboard/annonces/edit/:annonces" element={<EditAnnonce />} /> */}
     
     </Routes>
    </BrowserRouter>
  );
}

export default App;
