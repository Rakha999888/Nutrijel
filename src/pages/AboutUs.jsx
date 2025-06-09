import React, { useRef, useCallback, forwardRef, useState, useEffect } from 'react';
import HTMLFlipBook from 'react-pageflip';
import { Github, MessageCircle, Linkedin, ChevronLeft, ChevronRight } from 'lucide-react';

const EnhancedProfileCard = ({ name, role, university, imageSrc, githubUrl, discordUrl, linkedinUrl }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={`bg-white rounded-2xl overflow-hidden transform transition-all duration-1000 h-full ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
      <div className="text-center h-full flex flex-col">
        {/* Header Background with Gradient */}
        <div className="bg-gradient-to-br from-[#CFEBD1] via-[#B8E0BC] to-[#A8D5AB] py-8 md:py-12 relative flex-shrink-0">
          {/* Decorative Elements */}
          <div className="absolute top-4 left-4 w-6 h-6 bg-white bg-opacity-30 rounded-full animate-pulse"></div>
          <div className="absolute top-8 right-6 w-4 h-4 bg-white bg-opacity-20 rounded-full animate-pulse delay-300"></div>
          <div className="absolute bottom-6 left-8 w-3 h-3 bg-white bg-opacity-25 rounded-full animate-pulse delay-500"></div>
          
          {/* Profile Image with Hover Effect */}
          <div className="group relative">
            <img 
              src={imageSrc}
              alt={name}
              className="w-28 h-28 md:w-36 md:h-36 rounded-full object-cover border-4 md:border-6 border-white shadow-2xl mx-auto transition-all duration-500 group-hover:scale-110 group-hover:shadow-3xl"
            />
            {/* Glow Effect on Hover */}
            <div className="absolute inset-0 w-28 h-28 md:w-36 md:h-36 rounded-full mx-auto bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-500"></div>
          </div>
        </div>
        
        {/* Content Section */}
        <div className="px-4 md:px-6 py-4 md:py-6 flex-1 flex flex-col justify-between">
          <div>
            {/* Name with Slide-in Animation */}
            <h2 className={`text-lg md:text-xl font-bold text-gray-800 mt-2 md:mt-4 mb-2 md:mb-3 transition-all duration-700 delay-300 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'}`}>
              {name}
            </h2>
            
            {/* Role Badge */}
            <div className={`inline-block transition-all duration-700 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
              <p className="text-gray-700 text-xs font-semibold mb-2 md:mb-3 bg-gradient-to-r from-[#CFEBD1] to-[#B8E0BC] px-3 md:px-4 py-1 rounded-full shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105">
                {role}
              </p>
            </div>
            
            {/* University */}
            <p className={`text-gray-500 text-sm mb-4 md:mb-6 transition-all duration-700 delay-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
              {university}
            </p>
          </div>
          
          {/* Social Links with Staggered Animation */}
          <div className="flex justify-center gap-3 md:gap-4">
            {[
              { href: githubUrl, icon: Github, color: "hover:bg-gray-800", delay: "delay-700" },
              { href: discordUrl, icon: MessageCircle, color: "hover:bg-indigo-500", delay: "delay-800" },
              { href: linkedinUrl, icon: Linkedin, color: "hover:bg-blue-600", delay: "delay-900" }
            ].map((social, index) => (
              <a 
                key={index}
                href={social.href} 
                className={`w-9 h-9 md:w-10 md:h-10 bg-gray-100 rounded-full flex items-center justify-center text-gray-600 hover:text-white transition-all duration-500 hover:scale-125 hover:rotate-6 hover:shadow-xl transform ${social.color} ${social.delay} ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
              >
                <social.icon size={16} className="md:w-[18px] md:h-[18px]" />
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
    <div className={`w-full h-full bg-white rounded-2xl md:rounded-4xl shadow-sm relative overflow-hidden ${className}`} ref={ref}>
      <div className="w-full h-full flex flex-col justify-start">
        {children}
      </div>
      {pageNumber && (
        <div className="absolute bottom-4 md:bottom-6 right-4 md:right-6 text-xs md:text-sm text-gray-400 font-medium bg-white/80 px-2 md:px-3 py-1 rounded-full">
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
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="text-center pt-30 mb-8 md:mb-12">
      <h1 className={`text-4xl md:text-6xl font-extrabold mb-6 md:mb-8 transition-all duration-1000 ease-out ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}>
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 via-green-700 to-green-900 animate-pulse">
          Meet Our
        </span>
        <br />
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-800 via-emerald-600 to-[#a6c0a8] relative">
          Team
          <span className="absolute inset-0 text-transparent bg-clip-text bg-gradient-to-r from-green-800 via-emerald-600 to-teal-600 blur-sm opacity-50 animate-pulse"></span>
        </span>
      </h1>
      <div className={`flex justify-center mb-6 md:mb-8 transition-all duration-800 delay-500 ${
        isVisible ? 'opacity-100 scale-x-100' : 'opacity-0 scale-x-0'
      }`}>
        <div className="h-1 w-16 md:w-24 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full"></div>
      </div>
      <div className={`transition-all duration-1000 delay-700 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
      }`}>
        <p className="text-lg md:text-xl text-gray-600 leading-relaxed max-w-2xl mx-auto px-4">
          <span className="font-medium text-gray-700">Passionate individuals</span> dedicated to helping you achieve your{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-emerald-800 font-semibold">
            health and wellness goals
          </span>
        </p>
      </div>
      <div className={`relative mt-6 md:mt-8 transition-all duration-1000 delay-1000 ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}>
        <div className="absolute -top-4 left-1/4 w-3 h-3 bg-green-400 rounded-full animate-bounce delay-100"></div>
        <div className="absolute -top-2 right-1/4 w-2 h-2 bg-emerald-400 rounded-full animate-bounce delay-300"></div>
        <div className="absolute top-2 left-1/3 w-1.5 h-1.5 bg-teal-400 rounded-full animate-bounce delay-500"></div>
      </div>
    </div>
  );
};

// Mobile Single Page Viewer Component
const MobileSinglePageViewer = ({ profiles, currentPage, onPageChange }) => {
  const [isAnimating, setIsAnimating] = useState(false);

  const handlePageChange = (newPage) => {
    if (newPage === currentPage || isAnimating) return;
    
    setIsAnimating(true);
    setTimeout(() => {
      onPageChange(newPage);
      setIsAnimating(false);
    }, 300);
  };

  const canGoPrev = currentPage > 0;
  const canGoNext = currentPage < profiles.length - 1;

  return (
    <div className="w-full max-w-sm mx-auto">
      {/* Single Page Container */}
      <div className="relative">
        <div className={`transition-all duration-300 ${isAnimating ? 'opacity-0 scale-95' : 'opacity-100 scale-100'}`}>
          <div 
            className="bg-white rounded-2xl shadow-lg overflow-hidden"
            style={{ 
              height: '500px',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)' 
            }}
          >
            <EnhancedProfileCard {...profiles[currentPage]} />
          </div>
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={!canGoPrev}
          className={`absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white shadow-lg flex items-center justify-center transition-all duration-300 ${
            canGoPrev 
              ? 'text-gray-700 hover:bg-[#CFEBD1] hover:scale-110 hover:shadow-xl' 
              : 'text-gray-300 cursor-not-allowed'
          }`}
        >
          <ChevronLeft size={20} />
        </button>

        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={!canGoNext}
          className={`absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white shadow-lg flex items-center justify-center transition-all duration-300 ${
            canGoNext 
              ? 'text-gray-700 hover:bg-[#CFEBD1] hover:scale-110 hover:shadow-xl' 
              : 'text-gray-300 cursor-not-allowed'
          }`}
        >
          <ChevronRight size={20} />
        </button>
      </div>

      {/* Page Indicator */}
      <div className="flex justify-center mt-6 space-x-2">
        {profiles.map((_, index) => (
          <button
            key={index}
            onClick={() => handlePageChange(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentPage 
                ? 'bg-green-500 scale-125' 
                : 'bg-gray-300 hover:bg-gray-400'
            }`}
          />
        ))}
      </div>

      {/* Page Counter */}
      <div className="text-center mt-4">
        <span className="text-sm text-gray-500 bg-white/80 px-3 py-1 rounded-full">
          {currentPage + 1} of {profiles.length}
        </span>
      </div>
    </div>
  );
};

const AboutUs = () => {
  const book = useRef();
  const [isMobile, setIsMobile] = useState(false);
  const [currentMobilePage, setCurrentMobilePage] = useState(0);
  
  const onFlip = useCallback((e) => console.log('Current page: ' + e.data), []);

  // Check if device is mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Profile data
  const profiles = [
    {
      name: "Muhammad Rakha Akbar",
      role: "Front-End & Back-end",
      university: "Universitas Mikroskil",
      imageSrc: "/assets/image/foto-rakha.png",
      githubUrl: "https://github.com/Rakha999888",
      discordUrl: " https://discord.gg/7Pz2n4b4",
      linkedinUrl: " https://www.linkedin.com/in/muhammad-rakha-akbar/"
    },
    {
      name: "Rio Fauzi Febrian",
      role: "Front-End & Back-end",
      university: "Universitas Bhayangkara Jakarta Raya ",
      imageSrc: "/assets/image/foto-rio.png",
      githubUrl: "https://github.com/Dxzard",
      discordUrl: "https://discord.gg/NRGD7EVD",
      linkedinUrl: "https://www.linkedin.com/in/riofauzifebrian/"
    },
    {
      name: "Nabila Huwaida",
      role: "Front-End & Back-end",
      university: "Universitas Sumatera Utara",
      imageSrc: "/assets/image/foto-nabila.png",
      githubUrl: "https://github.com/elcbil",
      discordUrl: "https://discord.gg/kkd9YbKB",
      linkedinUrl: "https://www.linkedin.com/in/nabilahdaa"
    },
    {
      name: "Octa Dana Rizky Lubis",
      role: "Machine Learning",
      university: "Universitas Mikroskil",
      imageSrc: "/assets/image/foto-octa.png",
      githubUrl: "https://github.com/octalbs",
      discordUrl: "https://discord.gg/bFGjHq9w",
      linkedinUrl: "https://www.linkedin.com/in/octa-dana-rizky-lubis-917689256?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"
    },
    {
      name: "Bagus Darmawan",
      role: "Machine Learning",
      university: "Universitas Bhayangkara Jakarta Raya",
      imageSrc: "/assets/image/foto-bagus.png",
      githubUrl: "https://github.com/Bagusdarmawan11",
      discordUrl: "https://discord.gg/XryWtdAu",
      linkedinUrl: " https://www.linkedin.com/in/bagusdarmawan11"
    },
    {
      name: "Yohanes Aldo Anantha",
      role: "Machine Learning",
      university: "Universitas Mikroskil",
      imageSrc: "/assets/image/foto-aldo.png",
      githubUrl: "https://github.com/Rypper370",
      discordUrl: "https://discord.com/users/604220169849405442",
      linkedinUrl: "https://www.linkedin.com/in/yohanesanantha"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-100 via-yellow-50 to-orange-50 py-4 px-2 relative overflow-hidden flex items-center justify-center">
      {/* Custom CSS untuk desktop flipbook */}
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
        
        .flipbook-container .stf__parent .stf__block .stf__item.--left {
          box-shadow: 2px 0 8px rgba(0, 0, 0, 0.08) !important;
        }
        
        .flipbook-container .stf__parent .stf__block .stf__item.--right {
          box-shadow: -2px 0 8px rgba(0, 0, 0, 0.08) !important;
        }
        
        .flipbook-container .stf__parent .stf__block .stf__item.--active {
          box-shadow: 0 6px 20px rgba(0, 0, 0, 0.12) !important;
        }
      `}</style>

      <div className="max-w-6xl mx-auto text-center relative z-10 w-full">
        <AnimatedHeader />

        {isMobile ? (
          /* Mobile: Single Page View */
          <MobileSinglePageViewer 
            profiles={profiles}
            currentPage={currentMobilePage}
            onPageChange={setCurrentMobilePage}
          />
        ) : (
          /* Desktop: Flipbook View */
          <>
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
                {profiles.map((profile, index) => (
                  <Page key={index} pageNumber={index + 1}>
                    <EnhancedProfileCard {...profile} />
                  </Page>
                ))}
              </HTMLFlipBook>
            </div>
          </>
        )}

        {/* NutriJel Information Sections */}
        <div className="mt-20 space-y-16">
          {/* What is NutriJel Section */}
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-8">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-emerald-800">
                Apa Itu NutriJel?
              </span>
            </h2>
            <div className="bg-white rounded-3xl p-8 md:p-12 shadow-lg hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2">
              <p className="text-lg md:text-xl text-gray-700 leading-relaxed">
                <span className="font-bold text-green-700">NutriJel</span> adalah singkatan dari <span className="font-semibold text-emerald-600">Nutrisi Jelas</span> yang dirancang untuk membantu Anda mencapai gaya hidup sehat melalui pemantauan nutrisi yang cerdas dan personal. Aplikasi ini menggabungkan teknologi terkini dengan pengetahuan gizi untuk memberikan pengalaman yang mudah dan menyenangkan dalam melacak asupan makanan harian Anda.
              </p>
            </div>
          </div>

          {/* Vision & Mission Section */}
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8 md:gap-12">
              {/* Vision */}
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-3xl p-8 md:p-10 shadow-lg hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2 border border-green-100">
                <div className="text-center mb-6">
                  <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                    <span className="text-2xl text-white font-bold">V</span>
                  </div>
                  <h3 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">Visi Kami</h3>
                </div>
                <p className="text-gray-700 leading-relaxed text-center">
                  Menjadi mitra terpercaya dalam perjalanan kesehatan setiap individu dengan menyediakan alat yang mudah digunakan untuk memantau dan meningkatkan kualitas nutrisi harian.
                </p>
              </div>

              {/* Mission */}
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-3xl p-8 md:p-10 shadow-lg hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2 border border-blue-100">
                <div className="text-center mb-6">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                    <span className="text-2xl text-white font-bold">M</span>
                  </div>
                  <h3 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">Misi Kami</h3>
                </div>
                <p className="text-gray-700 leading-relaxed text-center">
                  Memberdayakan masyarakat untuk hidup lebih sehat melalui edukasi nutrisi, pelacakan makanan yang akurat, dan rekomendasi yang dipersonalisasi.
                </p>
              </div>
            </div>
          </div>

          {/* Why Choose NutriJel Section */}
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-12">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-emerald-800">
                Mengapa Memilih NutriJel?
              </span>
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              {/* Feature 1 */}
              <div className="bg-white rounded-2xl p-6 md:p-8 shadow-lg hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2 text-center group">
                <div className="w-16 h-16 bg-gradient-to-r from-green-400 to-emerald-500 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <span className="text-2xl">🔍</span>
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-4">Pemindaian Makanan Cerdas</h3>
                <p className="text-gray-600 leading-relaxed">
                  Input makanan dan dapatkan analisis nutrisi instan dengan teknologi yang akurat dan mudah digunakan.
                </p>
              </div>

              {/* Feature 2 */}
              <div className="bg-white rounded-2xl p-6 md:p-8 shadow-lg hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2 text-center group">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-400 to-indigo-500 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <span className="text-2xl">🎯</span>
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-4">Rekomendasi Personal</h3>
                <p className="text-gray-600 leading-relaxed">
                  Dapatkan saran nutrisi yang disesuaikan dengan tujuan dan kebutuhan kesehatan Anda secara personal.
                </p>
              </div>

              {/* Feature 3 */}
              <div className="bg-white rounded-2xl p-6 md:p-8 shadow-lg hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2 text-center group">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-400 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <span className="text-2xl">📚</span>
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-4">Education</h3>
                <p className="text-gray-600 leading-relaxed">
                  Video sehat dan artikel yang sangat bermanfaat untuk meningkatkan pengetahuan nutrisi Anda.
                </p>
              </div>
            </div>
          </div>

          {/* How It Works Section */}
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-12">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-emerald-800">
                Cara Kerja
              </span>
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              {/* Step 1 */}
              <div className="relative">
                <div className="bg-white rounded-2xl p-6 md:p-8 shadow-lg hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2 text-center group">
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-8 h-8 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center text-white font-bold shadow-lg">
                    1
                  </div>
                  <div className="w-16 h-16 bg-gradient-to-r from-green-100 to-emerald-100 rounded-2xl flex items-center justify-center mx-auto mb-6 mt-4 group-hover:scale-110 transition-transform duration-300">
                    <span className="text-2xl">👤</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-4">Create an Account</h3>
                  <p className="text-gray-600 leading-relaxed">
                    Sign up and set up your profile with basic information to get started on your nutrition journey.
                  </p>
                </div>
              </div>

              {/* Step 2 */}
              <div className="relative">
                <div className="bg-white rounded-2xl p-6 md:p-8 shadow-lg hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2 text-center group">
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-8 h-8 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white font-bold shadow-lg">
                    2
                  </div>
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-100 to-indigo-100 rounded-2xl flex items-center justify-center mx-auto mb-6 mt-4 group-hover:scale-110 transition-transform duration-300">
                    <span className="text-2xl">🍽️</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-4">Log Your Meals</h3>
                  <p className="text-gray-600 leading-relaxed">
                    Easily add foods to your daily log and track your nutritional intake with our smart scanning feature.
                  </p>
                </div>
              </div>

              {/* Step 3 */}
              <div className="relative">
                <div className="bg-white rounded-2xl p-6 md:p-8 shadow-lg hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2 text-center group">
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full flex items-center justify-center text-white font-bold shadow-lg">
                    3
                  </div>
                  <div className="w-16 h-16 bg-gradient-to-r from-purple-100 to-pink-100 rounded-2xl flex items-center justify-center mx-auto mb-6 mt-4 group-hover:scale-110 transition-transform duration-300">
                    <span className="text-2xl">📊</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-4">Track Progress</h3>
                  <p className="text-gray-600 leading-relaxed">
                    Monitor reports and insights about your nutrition journey to achieve your health goals effectively.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>      
    </div>
    
  );
};

export default AboutUs;