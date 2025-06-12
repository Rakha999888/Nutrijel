import React, { useRef, useCallback, forwardRef, useState, useEffect } from 'react';
import HTMLFlipBook from 'react-pageflip';
import { Github, MessageCircle, Linkedin, ChevronLeft, ChevronRight, X, ArrowRight, ArrowLeft } from 'lucide-react';

const TutorialModal = ({ isOpen, onClose }) => {
  const [currentStep, setCurrentStep] = useState(0);

  const tutorialSteps = [
    {
      title: "Cara Menggunakan NutriJel",
      content: "Selamat datang di panduan penggunaan NutriJel. Ikuti langkah-langkah berikut untuk memaksimalkan pengalaman Anda.",
      image: "👋"
    },
    {
      title: "1. Daftar / Masuk",
      content: "Buat akun baru atau masuk ke akun Anda untuk memulai melacak nutrisi harian Anda.",
      image: "📝"
    },
    {
      title: "2. Catat Makanan",
      content: "Tambahkan makanan yang Anda konsumsi ke dalam catatan harian. Anda bisa menambahkan detail seperti porsi dan waktu makan.",
      image: "🍽️"
    },
    {
      title: "3. Analisis Nutrisi",
      content: "Dapatkan analisis nutrisi otomatis dari makanan yang Anda konsumsi. Lihat asupan kalori, protein, karbohidrat, dan lemak.",
      image: "📊"
    },
    {
      title: "4. Pantau Perkembangan",
      content: "Lacak perkembangan nutrisi Anda dari waktu ke waktu melalui dashboard yang interaktif dan mudah dipahami.",
      image: "📈"
    }
  ];

  const nextStep = () => {
    if (currentStep < tutorialSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onClose();
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-md w-full mx-4 overflow-hidden shadow-2xl transform transition-all">
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-bold text-gray-800">{tutorialSteps[currentStep].title}</h3>
            <button 
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X size={24} />
            </button>
          </div>
          
          <div className="text-center py-6">
            <div className="text-6xl mb-6">{tutorialSteps[currentStep].image}</div>
            <p className="text-gray-600 mb-6">{tutorialSteps[currentStep].content}</p>
            
            <div className="flex justify-between items-center mt-8">
              <button
                onClick={prevStep}
                disabled={currentStep === 0}
                className={`flex items-center px-4 py-2 rounded-lg ${currentStep === 0 ? 'text-gray-400' : 'text-green-600 hover:bg-green-50'}`}
              >
                <ArrowLeft size={18} className="mr-2" />
                Sebelumnya
              </button>
              
              <div className="flex space-x-2">
                {tutorialSteps.map((_, index) => (
                  <div 
                    key={index} 
                    className={`w-2 h-2 rounded-full ${currentStep === index ? 'bg-green-500' : 'bg-gray-200'}`}
                  />
                ))}
              </div>
              
              <button
                onClick={nextStep}
                className="flex items-center px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
              >
                {currentStep === tutorialSteps.length - 1 ? 'Selesai' : 'Selanjutnya'}
                <ArrowRight size={18} className="ml-2" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

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
  const [showTutorial, setShowTutorial] = useState(false);
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
                What is NutriJel?
              </span>
            </h2>
            <div className="bg-white rounded-3xl p-8 md:p-12 shadow-lg hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2">
              <p className="text-lg md:text-xl text-gray-700 leading-relaxed">
                <span className="font-bold text-green-700">NutriJel (Nutrisi Jelas)</span> adalah aplikasi berbasis kecerdasan buatan (AI) yang dirancang untuk membantu Anda mencapai gaya hidup sehat melalui pemantauan nutrisi yang cerdas dan personal. Dengan menggabungkan teknologi AI dan pengetahuan gizi, NutriJel menghadirkan pengalaman yang mudah, adaptif, dan menyenangkan dalam melacak asupan makanan harian secara otomatis dan sesuai kebutuhan individu.
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

          {/* How It Works Section */}
          <div className="relative overflow-hidden py-20 bg-gradient-to-b from-white to-gray-50">
            {/* Decorative Elements */}
            <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-green-50 to-transparent"></div>
            <div className="absolute top-1/4 right-0 w-64 h-64 bg-green-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
            <div className="absolute top-1/3 left-0 w-64 h-64 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
            <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
            
            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-20">
                <span className="inline-block px-4 py-2 text-sm font-semibold text-green-700 bg-green-100 rounded-full mb-4">
                  Easy Process
                </span>
                <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-green-600 to-emerald-600">
                    How NutriJel Works
                  </span>
                </h2>
                <div className="w-32 h-1.5 bg-gradient-to-r from-green-400 to-emerald-400 rounded-full mx-auto mb-6"></div>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                  Start your nutrition journey in three simple steps
                </p>
              </div>
              
              <div className="relative z-10"></div>
              
              <div className="mt-8 text-center">
                <button 
                  onClick={() => setShowTutorial(true)}
                  className="px-8 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-medium rounded-full shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 flex items-center mx-auto"
                >
                  Learn More
                  <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </button>
              </div>

              {/* Testimonials Section */}
              <div className="mt-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                  <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-green-600 to-emerald-600">
                      What Do They Say?
                    </span>
                  </h2>
                  <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                    See what users say about their experience with NutriJel
                  </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
                  {/* Testimonial 1 */}
                  <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2">
                    <div className="flex items-center mb-6">
                      <div className="w-16 h-16 bg-gradient-to-br from-green-100 to-emerald-100 rounded-full flex items-center justify-center text-2xl font-bold text-emerald-600 mr-4">
                        WB
                      </div>
                      <div>
                        <h4 className="text-lg font-bold text-gray-900">Windah Bersaudara</h4>
                        <p className="text-emerald-600">Pengguna Setia</p>
                      </div>
                    </div>
                    <p className="text-gray-600 italic">
                      "NutriJel sangat membantu saya dan saudara-saudara saya dalam memantau asupan nutrisi harian. Fiturnya lengkap dan mudah digunakan!"
                    </p>
                    <div className="flex mt-4 text-yellow-400">
                      {[...Array(5)].map((_, i) => (
                        <svg key={i} className="w-5 h-5 fill-current" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                  </div>

                  {/* Testimonial 2 */}
                  <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2">
                    <div className="flex items-center mb-6">
                      <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-full flex items-center justify-center text-2xl font-bold text-blue-600 mr-4">
                        JT
                      </div>
                      <div>
                        <h4 className="text-lg font-bold text-gray-900">Joe Tasim</h4>
                        <p className="text-blue-600">Atlet Profesional</p>
                      </div>
                    </div>
                    <p className="text-gray-600 italic">
                      "Sebagai atlet, nutrisi sangat penting. NutriJel membantu saya melacak asupan protein dan nutrisi penting lainnya dengan sangat akurat."
                    </p>
                    <div className="flex mt-4 text-yellow-400">
                      {[...Array(5)].map((_, i) => (
                        <svg key={i} className="w-5 h-5 fill-current" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                  </div>

                  {/* Testimonial 3 */}
                  <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2">
                    <div className="flex items-center mb-6">
                      <div className="w-16 h-16 bg-gradient-to-br from-purple-100 to-pink-100 rounded-full flex items-center justify-center text-2xl font-bold text-purple-600 mr-4">
                        DK
                      </div>
                      <div>
                        <h4 className="text-lg font-bold text-gray-900">Deddy Korbujer</h4>
                        <p className="text-purple-600">Konsultan Gizi</p>
                      </div>
                    </div>
                    <p className="text-gray-600 italic">
                      "Saya merekomendasikan NutriJel kepada klien-klien saya. Antarmukanya user-friendly dan fitur analisis nutrisinya sangat membantu dalam program diet."
                    </p>
                    <div className="flex mt-4 text-yellow-400">
                      {[...Array(5)].map((_, i) => (
                        <svg key={i} className="w-5 h-5 fill-current" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              
              <TutorialModal 
                isOpen={showTutorial} 
                onClose={() => setShowTutorial(false)} 
              />
            </div>
          </div>
        </div>
      </div>      
    </div>
    
  );
};

export default AboutUs;