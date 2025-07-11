import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './view/Home/index'
import Pages from './view/Pages/index'
import './App.css'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/page/:page" element={<Pages />} />
        <Route path="*" element={<Home />} /> {/* fallback */}
      </Routes>
    </BrowserRouter>
  );
}
