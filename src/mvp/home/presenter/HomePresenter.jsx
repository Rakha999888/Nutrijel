import React, { useState, useEffect } from 'react';
import HomeView from '../view/HomeView';
import HomeModel from '../model/HomeModel';
import { useAuth } from '../../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const HomePresenter = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [features, setFeatures] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadFeatures = async () => {
      try {
        setIsLoading(true);
        const homeModel = new HomeModel();
        const featuresData = await homeModel.getFeatures();
        setFeatures(featuresData);
      } catch (err) {
        console.error('Error loading features:', err);
        setError('Failed to load features. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    loadFeatures();
  }, []);

  const handleGetStartedClick = (e) => {
    e?.preventDefault();
    console.log('Get Started clicked');
    navigate('/signup');
  };

  const handleSignInClick = (e) => {
    e?.preventDefault();
    console.log('Sign In clicked');
    navigate('/login');
  };

  const handleDashboardClick = (e) => {
    e?.preventDefault();
    console.log('Dashboard clicked');
    navigate('/dashboard');
  };

  const handleExploreFoodClick = (e) => {
    e?.preventDefault();
    console.log('Explore Food clicked');
    navigate('/food');
  };

  const handleTrackProgressClick = (e) => {
    e?.preventDefault();
    console.log('Track Progress clicked');
    navigate('/tracker');
  };

  const handleSeeMoreClick = (e) => {
    e?.preventDefault();
    console.log('See More clicked');
    navigate('/education');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#196D0D]"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center p-6 max-w-md mx-auto bg-red-50 rounded-lg">
          <div className="text-red-600 font-semibold mb-2">Error</div>
          <p className="text-gray-700">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 px-4 py-2 bg-[#196D0D] text-white rounded hover:bg-[#155d07] transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <HomeView
      currentUser={currentUser}
      features={features}
      onGetStartedClick={handleGetStartedClick}
      onSignInClick={handleSignInClick}
      onDashboardClick={handleDashboardClick}
      onExploreFoodClick={handleExploreFoodClick}
      onTrackProgressClick={handleTrackProgressClick}
      onSeeMoreClick={handleSeeMoreClick}
    />
  );
};

export default HomePresenter;
