import React, { useRef, useCallback, forwardRef, useState, useEffect } from 'react';
import HTMLFlipBook from 'react-pageflip';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faDiscord, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { Github, MessageCircle, Linkedin } from 'lucide-react';

const EnhancedProfileCard = ({ name, role, university, imageSrc, githubUrl, discordUrl, linkedinUrl }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={`bg-white rounded-2xl overflow-hidden transform transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
      <div className="text-center">
        {/* Header Background with Gradient */}
        <div className="bg-gradient-to-br from-[#CFEBD1] via-[#B8E0BC] to-[#A8D5AB] py-12 relative">
          {/* Decorative Elements */}
          <div className="absolute top-4 left-4 w-6 h-6 bg-white bg-opacity-30 rounded-full animate-pulse"></div>
          <div className="absolute top-8 right-6 w-4 h-4 bg-white bg-opacity-20 rounded-full animate-pulse delay-300"></div>
          <div className="absolute bottom-6 left-8 w-3 h-3 bg-white bg-opacity-25 rounded-full animate-pulse delay-500"></div>
          
          {/* Profile Image with Hover Effect */}
          <div className="group relative">
            <img 
              src={imageSrc}
              alt={name}
              className="w-36 h-36 rounded-full object-cover border-6 border-white shadow-2xl mx-auto transition-all duration-500 group-hover:scale-110 group-hover:shadow-3xl"
            />
            {/* Glow Effect on Hover */}
            <div className="absolute inset-0 w-36 h-36 rounded-full mx-auto bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-500"></div>
          </div>
        </div>
        
        {/* Content Section */}
        <div className="px-6 py-6">
          {/* Name with Slide-in Animation */}
          <h2 className={`text-xl font-bold text-gray-800 mt-4 mb-3 transition-all duration-700 delay-300 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'}`}>
            {name}
          </h2>
          
          {/* Role Badge */}
          <div className={`inline-block transition-all duration-700 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            <p className="text-gray-700 text-xs font-semibold mb-3 bg-gradient-to-r from-[#CFEBD1] to-[#B8E0BC] px-4 py-1 rounded-full shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105">
              {role}
            </p>
          </div>
          
          {/* University */}
          <p className={`text-gray-500 text-sm mb-6 transition-all duration-700 delay-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            {university}
          </p>
          
          {/* Social Links with Staggered Animation */}
          <div className="flex justify-center gap-4">
            {[
              { href: githubUrl, icon: Github, color: "hover:bg-gray-800", delay: "delay-700" },
              { href: discordUrl, icon: MessageCircle, color: "hover:bg-indigo-500", delay: "delay-800" },
              { href: linkedinUrl, icon: Linkedin, color: "hover:bg-blue-600", delay: "delay-900" }
            ].map((social, index) => (
              <a 
                key={index}
                href={social.href} 
                className={`w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-gray-600 hover:text-white transition-all duration-500 hover:scale-125 hover:rotate-6 hover:shadow-xl transform ${social.color} ${social.delay} ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
              >
                <social.icon size={18} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// Page component with forwardRef
const Page = forwardRef(({ children, pageNumber, className = "" }, ref) => {
  return (
    <div className={`w-full h-full bg-white rounded-4xl shadow-sm relative overflow-hidden ${className}`} ref={ref}>
      <div className="w-full h-full flex flex-col justify-start">
        {children}
      </div>
      {pageNumber && (
        <div className="absolute bottom-6 right-6 text-sm text-gray-400 font-medium bg-white/80 px-3 rounded-full">
          {pageNumber}
        </div>
      )}
    </div>
  );
});

// Enhanced Animated Header Component
const AnimatedHeader = () => {
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    // Trigger animation after component mounts
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="text-center mb-12">
      {/* Main Title with Gradient Animation */}
      <h1 className={`text-6xl font-extrabold mb-8 transition-all duration-1000 ease-out ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}>
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 via-green-700 to-green-900 animate-pulse">
          Meet Our
        </span>
        <br />
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-800 via-emerald-600 to-[#a6c0a8] relative">
          Team
          {/* Glowing effect */}
          <span className="absolute inset-0 text-transparent bg-clip-text bg-gradient-to-r from-green-800 via-emerald-600 to-teal-600 blur-sm opacity-50 animate-pulse"></span>
        </span>
      </h1>
      {/* Decorative Line */}
      <div className={`flex justify-center mb-8 transition-all duration-800 delay-500 ${
        isVisible ? 'opacity-100 scale-x-100' : 'opacity-0 scale-x-0'
      }`}>
        <div className="h-1 w-24 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full"></div>
      </div>
      {/* Subtitle with Typewriter Effect */}
      <div className={`transition-all duration-1000 delay-700 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
      }`}>
        <p className="text-xl text-gray-600 leading-relaxed max-w-2xl mx-auto">
          <span className="font-medium text-gray-700">Passionate individuals</span> dedicated to helping you achieve your{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-emerald-800 font-semibold">
            health and wellness goals
          </span>
        </p>
      </div>
      {/* Floating Icons */}
      <div className={`relative mt-8 transition-all duration-1000 delay-1000 ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}>
        <div className="absolute -top-4 left-1/4 w-3 h-3 bg-green-400 rounded-full animate-bounce delay-100"></div>
        <div className="absolute -top-2 right-1/4 w-2 h-2 bg-emerald-400 rounded-full animate-bounce delay-300"></div>
        <div className="absolute top-2 left-1/3 w-1.5 h-1.5 bg-teal-400 rounded-full animate-bounce delay-500"></div>
      </div>
    </div>
  );
};

const AboutUs = () => {
  const book = useRef();
  const onFlip = useCallback((e) => console.log('Current page: ' + e.data), []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-100 via-yellow-50 to-orange-50 py-4 px-2 relative overflow-hidden flex items-center justify-center pt-35">
      {/* Custom CSS untuk mengatur bayangan flipbook */}
      <style jsx>{`
        .flipbook-container .stf__parent {
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08) !important;
        }
        
        .flipbook-container .stf__parent .stf__block {
          box-shadow: none !important;
        }
        
        .flipbook-container .stf__parent .stf__block .stf__item {
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06) !important;
        }
        
        .flipbook-container .stf__parent .stf__block .stf__item:hover {
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1) !important;
        }
        
        /* Mengurangi bayangan saat flip */
        .flipbook-container .stf__parent .stf__block .stf__item.--left {
          box-shadow: 2px 0 8px rgba(0, 0, 0, 0.08) !important;
        }
        
        .flipbook-container .stf__parent .stf__block .stf__item.--right {
          box-shadow: -2px 0 8px rgba(0, 0, 0, 0.08) !important;
        }
        
        /* Bayangan halus untuk transisi flip */
        .flipbook-container .stf__parent .stf__block .stf__item.--active {
          box-shadow: 0 6px 20px rgba(0, 0, 0, 0.12) !important;
        }
      `}</style>

      <div className="max-w-6xl mx-auto text-center relative z-10">
        {/* Enhanced Animated Header */}
        <AnimatedHeader />

        <div className="flex justify-center gap-4 mb-12">
          <button 
            onClick={() => book.current?.pageFlip().flipPrev()} 
            className="px-4 py-2 bg-[#CFEBD1] text-gray-800 rounded-2xl font-semibold transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105 hover:bg-[#B8E0BC] border border-gray-200"
          >
            Previous
          </button>
          <button 
            onClick={() => book.current?.pageFlip().flipNext()} 
            className="px-4 py-2 bg-[#CFEBD1] text-gray-800 rounded-2xl font-semibold transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105 hover:bg-[#B8E0BC] border border-gray-200"
          >
            Next
          </button>
        </div>

        <div className="flex justify-center flipbook-container rounded-4xl">
          <HTMLFlipBook
            width={400} 
            height={500} 
            size="fixed" 
            flippingTime={800}
            onFlip={onFlip} 
            ref={book}
            className="shadow-none"
            style={{
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
              borderRadius: '2rem'
            }}
            usePortrait={false}
            startPage={0}
            drawShadow={true}
            maxShadowOpacity={0.3}
            shadowOpacity={0.2}
            showCover={false}
            mobileScrollSupport={true}
          >
            {/* Page 1 - Enhanced Profile Card */}
            <Page>
              <EnhancedProfileCard 
                name="Muhammad Rakha Akbar"
                role="Front-End & Back-end"
                university="Universitas Mikroskil"
                imageSrc="/assets/image/foto-rakha.png"
                githubUrl="https://github.com/yourgithub"
                discordUrl="https://discord.com/users/yourdiscord"
                linkedinUrl="https://linkedin.com/in/yourlinkedin"
              />
            </Page>
            <Page>
              <EnhancedProfileCard 
                name="Rio Fauzi Febian"
                role="Front-End & Back-end"
                university="Universitas Bayangkara"
                imageSrc="/assets/image/foto-rakha.png"
                githubUrl="https://github.com/yourgithub"
                discordUrl="https://discord.com/users/yourdiscord"
                linkedinUrl="https://linkedin.com/in/yourlinkedin"
              />
            </Page>
            <Page>
              <EnhancedProfileCard 
                name="Rio Fauzi Febian"
                role="Front-End & Back-end"
                university="Universitas Bayangkara"
                imageSrc="/assets/image/foto-rakha.png"
                githubUrl="https://github.com/yourgithub"
                discordUrl="https://discord.com/users/yourdiscord"
                linkedinUrl="https://linkedin.com/in/yourlinkedin"
              />
            </Page>
            <Page>
              <EnhancedProfileCard 
                name="Rio Fauzi Febian"
                role="Front-End & Back-end"
                university="Universitas Bayangkara"
                imageSrc="/assets/image/foto-rakha.png"
                githubUrl="https://github.com/yourgithub"
                discordUrl="https://discord.com/users/yourdiscord"
                linkedinUrl="https://linkedin.com/in/yourlinkedin"
              />
            </Page>
            <Page>
              <EnhancedProfileCard 
                name="Rio Fauzi Febian"
                role="Front-End & Back-end"
                university="Universitas Bayangkara"
                imageSrc="/assets/image/foto-rakha.png"
                githubUrl="https://github.com/yourgithub"
                discordUrl="https://discord.com/users/yourdiscord"
                linkedinUrl="https://linkedin.com/in/yourlinkedin"
              />
            </Page>
            <Page>
              <EnhancedProfileCard 
                name="Rio Fauzi Febian"
                role="Front-End & Back-end"
                university="Universitas Bayangkara"
                imageSrc="/assets/image/foto-rakha.png"
                githubUrl="https://github.com/yourgithub"
                discordUrl="https://discord.com/users/yourdiscord"
                linkedinUrl="https://linkedin.com/in/yourlinkedin"
              />
            </Page>
            
          </HTMLFlipBook>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;