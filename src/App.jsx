// src/App.jsx
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Footer from "./components/Footer.jsx";
import Navbar from "./components/Navbar.jsx";
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
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/food" element={<Food />} />
          <Route path="/aboutus" element={<About />} />
          <Route path="/tracker" element={<Tracker />} />
          <Route path="/education" element={<Education />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
        <Footer />
      </Router>
    </AuthProvider>
  );
}

export default App;
