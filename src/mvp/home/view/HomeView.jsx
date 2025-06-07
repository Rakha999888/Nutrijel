import React from 'react';
import { Link } from 'react-router-dom';

const FeatureCard = ({ icon, title, description, alt }) => (
  <div className="group bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 border border-gray-100">
    <div className="flex items-center mb-6">
      <div className="bg-gradient-to-r from-green-100 to-green-50 p-3 rounded-xl mr-4 group-hover:scale-110 transition-transform duration-300">
        <img src={icon} alt={alt} className="h-12 w-12 object-contain" />
      </div>
      <h3 className="text-xl font-bold text-gray-800 group-hover:text-[#196D0D] transition-colors">
        {title}
      </h3>
    </div>
    <p className="text-gray-600 leading-relaxed">
      {description}
    </p>
  </div>
);

const ActionButton = ({ to, primary = false, children, onClick, className = '' }) => {
  const baseClasses = "px-8 py-3 rounded-4xl text-xl transition-colors";
  const primaryClasses = primary 
    ? "bg-[#196D0D] text-white hover:bg-[#155d07]"
    : "bg-transparent border-2 border-[#196D0D] text-[#196D0D] hover:bg-[#196D0D] hover:text-white";

  return (
    <Link 
      to={to} 
      className={`${baseClasses} ${primaryClasses} ${className}`} 
      onClick={onClick}
    >
      {children}
    </Link>
  );
};

const HomeView = ({ 
  currentUser, 
  features, 
  onGetStartedClick, 
  onSignInClick,
  onDashboardClick,
  onExploreFoodClick,
  onTrackProgressClick,
  onSeeMoreClick
}) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-100 via-yellow-50 to-orange-50">
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
                  <ActionButton to="/tracker" onClick={onTrackProgressClick}>
                    Track Progress
                  </ActionButton>
                  <ActionButton to="/food" onClick={onExploreFoodClick}>
                    Explore Food
                  </ActionButton>
                </>
              ) : (
                <>
                  <ActionButton to="/signup" primary onClick={onGetStartedClick}>
                    Start Now
                  </ActionButton>
                  <ActionButton to="/education" onClick={onSeeMoreClick}>
                    See More
                  </ActionButton>
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
          <div className="grid md:grid-cols-3 gap-8 mb-20">
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
                    onClick={onTrackProgressClick}
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
                    onClick={onGetStartedClick}
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

export default HomeView;
