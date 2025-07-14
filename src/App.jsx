import { HashRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from './view/Home/index'
import Pages from './view/Pages/index'
import './App.css'

export default function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/home" />} />
        <Route path="/home" element={<Home />} />
        <Route path="/page/:page" element={<Pages />} />
        <Route path="*" element={<Home />} /> {/* fallback */}
      </Routes>
    </HashRouter>
  );
}
