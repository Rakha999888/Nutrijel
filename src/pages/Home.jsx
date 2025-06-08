// src/pages/Home.jsx
import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "../styles/index.css";

const Home = () => {
  const { currentUser } = useAuth();

  const features = [
    {
      icon: "/assets/image/features-icon-1.png",
      title: "Food",
      description: "Complete information about food nutrition and diet recommendations according to your needs.",
      alt: "Food Icon"
    },
    {
      icon: "/assets/image/features-icon-2.png", 
      title: "Track",
      description: "Track your health progress with easy-to-use and informative tracking tools.",
      alt: "Track Icon"
    },
    {
      icon: "/assets/image/features-icon-3.png",
      title: "Education", 
      description: "Access a variety of articles, videos and courses on health and healthy lifestyle.",
      alt: "Education Icon"
    }
  ];

  const FeatureCard = ({ icon, title, description, alt }) => (
    <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
      <div className="flex items-center mb-6">
        <div className="bg-gradient-to-r from-[#E8F5E9] to-[#C8E6C9] p-4 rounded-xl mr-4">
          <img 
            src={icon} 
            alt={alt} 
            className="h-12 w-12 object-contain" 
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = 'https://via.placeholder.com/48?text=' + encodeURIComponent(title[0]);
            }}
          />
        </div>
        <h3 className="text-xl font-bold text-gray-800">
          {title}
        </h3>
      </div>
      <p className="text-gray-600 leading-relaxed">
        {description}
      </p>
    </div>
  );

  const ActionButton = ({ to, primary = false, children }) => {
    const baseClasses = "px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-green-200";
    const primaryClasses = primary 
      ? "bg-gradient-to-r from-[#196D0D] to-[#155d07] text-white shadow-lg hover:shadow-xl hover:from-[#155d07] hover:to-[#0f4a05]"
      : "bg-transparent border-2 border-[#196D0D] text-[#196D0D] hover:bg-[#196D0D] hover:text-white hover:shadow-lg";
    
    return (
      <Link to={to} className={`${baseClasses} ${primaryClasses} inline-block`}>
        {children}
      </Link>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-yellow-50 to-orange-50">
      {/* Floating background elements */}
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden z-0">
        <div className="absolute top-20 left-10 w-40 h-40 bg-green-100 rounded-full filter blur-3xl opacity-20"></div>
        <div className="absolute bottom-20 right-10 w-60 h-60 bg-yellow-100 rounded-full filter blur-3xl opacity-20"></div>
        <div className="absolute top-1/2 left-1/4 w-80 h-80 bg-orange-100 rounded-full filter blur-3xl opacity-10"></div>
      </div>
      {/* Hero Section */}
      <section className="py-16 md:py-25">
        <div className="flex flex-col md:flex-row justify-between items-center rounded-lg px-4">
          <div className="w-full md:w-1/2 text-center text-[#333] mb-8 md:mb-0 md:ml-10">
            <h1 className="text-3xl md:text-5xl font-bold text-[#1e3c3f] tracking-tighter leading-normal">
              Welcome to a <span className="text-[#196D0D]">Healthy and Educational</span> platform for <br className="hidden md:block" />a better life
            </h1>
            {currentUser && (
              <p className="text-lg md:text-xl text-[#196D0D] font-semibold mb-4">
                Hello, {currentUser.displayName || currentUser.email}! Ready to continue your health journey?
              </p>
            )}
            <p className="text-lg md:text-2xl leading-8">
              Discover how to live a healthy life, monitor your progress, <br className="hidden md:block" />
              and learn the best nutrition for your body.
            </p>
            <div className="mt-6 flex flex-col md:flex-row justify-center gap-4">
              {currentUser ? (
                <>
                  <Link 
                    to="/tracker" 
                    className="relative overflow-hidden bg-gradient-to-r from-[#196D0D] to-emerald-600 text-white px-8 py-3 rounded-4xl text-xl font-medium transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 hover:from-[#155d07] hover:to-[#0f4a05]"
                  >
                    <span className="relative z-10 flex items-center justify-center gap-2">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                      </svg>
                      Track Progress
                    </span>
                  </Link>
                  <Link 
                    to="/food" 
                    className="btn-pulse relative overflow-hidden bg-white/90 border-2 border-[#196D0D] text-[#196D0D] px-8 py-3 rounded-4xl text-xl font-medium transition-all duration-300 hover:bg-[#196D0D] hover:text-white hover:shadow-lg"
                  >
                    <span className="relative z-10 flex items-center justify-center gap-2">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 15.546c-.523 0-1.046.151-1.5.454a2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0 2.7 2.7 0 00-1.5-.454M9 6v2m3-2v2m3-2v2M9 3h3m3 0h3m-9 3a4 4 0 00-4 4v9.5a2.5 2.5 0 002.5 2.5h11a2.5 2.5 0 002.5-2.5V10a4 4 0 00-4-4H9z" />
                      </svg>
                      Explore Food
                    </span>
                  </Link>
                </>
              ) : (
                <>
                  <Link 
                    to="/signup" 
                    className="btn-float bg-[#196D0D] text-white px-8 py-3 rounded-4xl text-xl hover:bg-[#155d07] transition-colors shadow-lg"
                  >
                    Start Now
                  </Link>
                  <Link 
                    to="/education" 
                    className="btn-shake btn-border bg-transparent border-2 border-[#196D0D] text-[#196D0D] px-8 py-3 rounded-4xl text-xl hover:bg-[#196D0D] hover:text-white transition-colors"
                  >
                    See More
                  </Link>
                </>
              )}
            </div>
          </div>
          <div className="w-full md:w-[40%]">
            <img src="/assets/image/home-hero.png" alt="Healthy food" className="w-full h-auto rounded-xl" />
          </div>
        </div>
      </section>

      {/* Key Features Section */}
      <section className="py-20 bg-gradient-to-b from-white to-green-25">
        <div className="container mx-auto px-6">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              Our <span className="text-[#196D0D]">Key Features</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Discover various features that will help you live a healthy lifestyle and gain useful knowledge.
            </p>
          </div>
          
          {/* Features Grid */}
          <div className="relative z-10 grid md:grid-cols-3 gap-8 mb-20">
          {/* Connecting line */}
          <div className="hidden md:block absolute top-1/2 left-0 w-full h-1 bg-gradient-to-r from-green-200 via-yellow-200 to-orange-200 -z-10"></div>
            {features.map((feature, index) => (
              <FeatureCard 
                key={index}
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
                alt={feature.alt}
              />
            ))}
          </div>
          
          {/* Call to Action */}
          <div className="relative bg-gradient-to-br from-[#CFEBD1] via-emerald-50 to-[#CFEBD1] rounded-3xl p-8 md:p-12 text-center shadow-xl border border-green-200/50">
            <div className="absolute top-4 right-4 w-20 h-20 bg-green-200/30 rounded-full blur-xl"></div>
            <div className="absolute bottom-4 left-4 w-16 h-16 bg-emerald-200/30 rounded-full blur-xl"></div>
            <div className="max-w-2xl mx-auto space-y-6">
              <h2 className="text-4xl font-bold text-[#196D0D]">
                Ready to start your healthy journey?
              </h2>
              <p className="text-lg text-gray-700 leading-relaxed">
                Join now to experience the benefits of our platform and start living healthier today.
              </p>
              <div className="pt-4">
                {currentUser ? (
                  <Link 
                    to="/tracker"
                    className="inline-flex items-center gap-2 bg-gradient-to-r from-[#196D0D] to-emerald-600 text-white px-8 py-4 rounded-full text-lg font-semibold shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
                  >
                    Continue Journey!
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </Link>
                ) : (
                  <Link 
                    to="/signup"
                    className="inline-flex items-center gap-2 bg-gradient-to-r from-[#196D0D] to-emerald-600 text-white px-8 py-4 rounded-full text-lg font-semibold shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
                  >
                    Join Now!
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </Link>
                )}
              </div>
            </div>
            
          </div>
          
        </div>
      </section>
    </div>
  );
};

export default Home;