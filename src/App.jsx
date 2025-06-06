// src/App.jsx

import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { Toaster } from "react-hot-toast";

// Import semua komponen dan halaman yang dibutuhkan
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import Home from "./pages/Home";
import Food from "./pages/Food";
import About from "./pages/AboutUs";
import Tracker from "./pages/Tracker";
import Education from "./pages/Education";
import Login from "./pages/Login";
import SignUp from "./pages/Register.jsx";

function App() {
  return (
    <AuthProvider>
      <Router>
        {/* Komponen Toaster untuk notifikasi di seluruh aplikasi */}
        <Toaster
          position="top-center"
          reverseOrder={false}
          toastOptions={{
            duration: 3000,
            style: {
              background: "#363636",
              color: "#fff",
            },
          }}
        />
        <Navbar />

        <Routes>
          {/* --- PERBAIKAN DI SINI --- */}
          {/* 1. Tambahkan rute untuk halaman utama */}
          <Route path="/" element={<Home />} />

          {/* Rute-rute lainnya */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/home" element={<Home />} />
          <Route path="/food" element={<Food />} />
          <Route path="/aboutus" element={<About />} />
          <Route path="/tracker" element={<Tracker />} />
          <Route path="/education" element={<Education />} />
          <Route path="*" element={<Navigate to="/home" replace />} />
        </Routes>

        <Footer />
      </Router>
    </AuthProvider>
  );
}

export default App;
