// src/App.jsx

import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate, useLocation } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { LayoutProvider, useLayout } from "./context/LayoutContext";
import { Toaster } from "react-hot-toast";

// Import semua komponen dan halaman yang dibutuhkan
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import Home from "./pages/Home";
// import LandingPage from "./pages/LandingPage";
import Food from "./pages/Food";
import About from "./pages/AboutUs";
import Tracker from "./pages/Tracker";
import Education from "./pages/Education";
import Login from "./pages/Login";
import SignUp from "./pages/Register.jsx";
import ProfileSettings from "./pages/setting/ProfileSettings";
import Settings from "./pages/setting/Settings";
import JellBot from "./pages/JellBot";
import FoodMap from "./pages/FoodMap";

// Komponen Layout yang akan mengatur tampilan Navbar dan Footer
const Layout = ({ children }) => {
  const location = useLocation();
  const { showHeaderFooter } = useLayout();
  const isLandingPage = location.pathname === '/';
  const isLoginPage = location.pathname === '/login';
  const isSignUpPage = location.pathname === '/signup';

  // Jangan tampilkan header/footer di Login, SignUp, atau jika showHeaderFooter false
  if (isLoginPage || isSignUpPage || !showHeaderFooter) {
    return children;
  }

  return (
    <>
      <Navbar />
      <main>{children}</main>
      <Footer />
      {!isLandingPage && !isLoginPage && !isSignUpPage && <JellBot />}
    </>
  );
};

function App() {
  return (
    <AuthProvider>
      <LayoutProvider>
        <Router>
          {/* Komponen Toaster untuk notifikasi di seluruh aplikasi */}
          <Toaster
            position="top-right"
            toastOptions={{
              duration: 3000,
              style: {
                background: '#fff',
                color: '#1f2937',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
                borderRadius: '0.5rem',
                padding: '0.75rem 1rem',
                fontSize: '0.875rem',
                lineHeight: '1.25rem',
                maxWidth: '24rem',
              },
              success: {
                style: {
                  background: '#f0fdf4',
                  color: '#166534',
                  borderLeft: '4px solid #22c55e',
                },
                iconTheme: {
                  primary: '#22c55e',
                  secondary: '#fff',
                },
              },
              error: {
                style: {
                  background: '#fef2f2',
                  color: '#991b1b',
                  borderLeft: '4px solid #ef4444',
                },
                iconTheme: {
                  primary: '#ef4444',
                  secondary: '#fff',
                },
              },
            }}
          />
          
          <Routes>
            {/* Redirect dari root path ke /home */}
            <Route path="/" element={<Navigate to="/home" replace />} />
            
            {/* Rute-rute lainnya */}
            <Route path="/login" element={
              <>
                <Login />
              </>
            } />
            
            <Route path="/signup" element={
              <>
                <SignUp />
              </>
            } />
            
            <Route path="/profile" element={
              <ProfileSettings />
            } />
            
            <Route path="/settings" element={
              <Settings />
            } />
            
            <Route path="/home" element={
              <Layout>
                <Home />
              </Layout>
            } />
            
            <Route path="/food" element={
              <Layout>
                <Food />
              </Layout>
            } />
            
            <Route path="/food-map" element={
              <FoodMap />
            } />
            
            <Route path="/aboutus" element={
              <Layout>
                <About />
              </Layout>
            } />
            
            <Route path="/tracker" element={
              <Layout>
                <Tracker />
              </Layout>
            } />
            
            <Route path="/education/*" element={
              <Layout>
                <Education />
              </Layout>
            }>
              <Route path="article/:articleId" element={null} />
            </Route>
            
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Router>
      </LayoutProvider>
    </AuthProvider>
  );
}

export default App;
