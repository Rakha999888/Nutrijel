import React, { useState } from "react";
import { Navigation, Pagination, Scrollbar, A11y, Autoplay } from 'swiper/modules'; 
import { Swiper, SwiperSlide } from 'swiper/react';
import '../styles/index.css';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import 'swiper/css/autoplay';

const Education = () => {
  const videos = [
    {
      id: 1,
      title: "Nutrition and Why it Matters",
      thumbnail: "/assets/image/edu-thumbnail-1.png",
      embedId: "Evji_ebWZQU"
    },
    {
      id: 2,
      title: "How to Power Up Your Mind: Essential Nutrients for a Healthy Brain",
      thumbnail: "/assets/image/edu-thumbnail-2.png",
      embedId: "E_LVUM4-d70"
    },
    {
      id: 3,
      title: "How The Six Basic Nutrients Affect Your Body",
      thumbnail: "/assets/image/edu-thumbnail-3.png",
      embedId: "inEPlZZ_SfA"
    },
    {
      id: 4,
      title: "Pedoman Gizi Seimbang",
      thumbnail: "/assets/image/edu-thumbnail-4.png",
      embedId: "p4W-bvGvyfk"
    },
    {
      id: 5,
      title: "What's the Best Diet? Healthy Eating 101",
      thumbnail: "/assets/image/edu-thumbnail-5.png",
      embedId: "fqhYBTg73fw"
    },
    {
      id: 6,
      title: "Balanced Nutrition for Daily Life",
      thumbnail: "/assets/image/edu-thumbnail-5.png",
      embedId: "fqhYBTg73fw"
    },
    {
      id: 7,
      title: "Understanding Macronutrients",
      thumbnail: "/assets/image/edu-thumbnail-5.png",
      embedId: "fqhYBTg73fw"
    },
    {
      id: 8,
      title: "Healthy Meal Planning Tips",
      thumbnail: "/assets/image/edu-thumbnail-5.png",
      embedId: "fqhYBTg73fw"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-100 via-yellow-50 to-orange-50">
      {/* Hero Section */}
      <section className="py-20 lg:py-35 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-12">
            {/* Text Content */}
            <div className="w-full lg:w-3/5 text-center lg:text-left">
              <div className=" p-8 sm:p-12 lg:p-16 rounded-3xl relative overflow-hidden">
                <div className="relative z-10">
                  <h1 className="text-4xl text-center sm:text-4xl lg:text-5xl font-bold text-[#1e3c3f] tracking-tight leading-tight mb-2 animate-pulse">
                    <span className="text-[#196D0D] inline-block">Discover</span> The Best<br />
                    <span className="bg-gradient-to-r from-[#196D0D] to-emerald-600 bg-clip-text text-transparent">
                      Nutrition Tips
                    </span>
                  </h1>
                  <p className="text-lg sm:text-xl lg:text-2xl text-gray-700 leading-relaxed mb-8">
                    Explore articles and videos to learn more about how nutrition impacts your{' '}
                    <span className="text-[#196D0D] font-semibold">health</span> and <span className="text-[#196D0D] font-semibold">well-being.</span>
                  </p>
                  <button className="group relative inline-flex items-center gap-2 bg-transparent border-2 border-[#196D0D] text-[#196D0D] px-8 py-4 rounded-full text-lg font-semibold hover:bg-[#196D0D] hover:text-white transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
                    <span>See More</span>
                    <svg className="w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>

            {/* Slider */}
            <div className="w-full lg:w-1/2 max-w-lg">
              <div className="relative p-6 bg-white/50 backdrop-blur-sm rounded-3xl shadow-2xl">
                <Swiper
                  modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
                  spaceBetween={20}
                  slidesPerView={1}
                  centeredSlides={true}
                  slideToClickedSlide={true}
                  loop={true}
                  autoplay={{
                    delay: 3000,
                    disableOnInteraction: false,
                    reverseDirection: true,
                  }}
                  pagination={{ clickable: true }}
                  className="rounded-2xl overflow-hidden"
                >
                  {[1, 2, 3, 4].map((num) => (
                    <SwiperSlide key={num}>
                      <div className="relative group">
                        <img
                          src={`/assets/image/food-slider-${num}.gif`}
                          alt={`Food ${num}`}
                          className="w-full h-64 sm:h-80 object-cover rounded-2xl transition-transform duration-300 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Video & Article Section */}
      <section className="py-16 bg-gradient-to-br from-[#FDFAF6] to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-[#196D0D] to-emerald-600 rounded-full shadow-lg mb-6">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#196D0D] mb-4">
              Video & Article
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Learn from expert nutritionists and discover valuable insights about healthy living
            </p>
          </div>

          {/* Video Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8">
            {videos.map((video) => (
              <div key={video.id} className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden border border-green-100">
                <a href={video.url} target="_blank" rel="noopener noreferrer" className="block">
                  {/* Video Thumbnail */}
                  <div className="relative overflow-hidden">
                    <img 
                      src={video.thumbnail} 
                      alt={video.title}
                      className="w-full h-48 sm:h-56 object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    
                    {/* Play Button Overlay */}
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center transform scale-75 group-hover:scale-100 transition-transform duration-300">
                        <svg className="w-6 h-6 text-[#196D0D] ml-1" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M8 5v14l11-7z"/>
                        </svg>
                      </div>
                    </div>

                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"></div>

                    {/* Iframe for Hovered Video */}
                    <iframe 
                      className="absolute top-0 left-0 w-full h-full opacity-0 transition-opacity duration-300 group-hover:opacity-100" 
                      src={`https://www.youtube.com/embed/${video.embedId}?autoplay=1&mute=1`} 
                      frameBorder="0" 
                      allow="autoplay; encrypted-media" 
                      allowFullScreen
                    />
                  </div>

                  {/* Content */}
                  <div className="p-4 sm:p-6">
                    <h3 className="text-base sm:text-lg font-semibold text-[#196D0D] leading-tight group-hover:text-emerald-600 transition-colors duration-300 line-clamp-2">
                      {video.title}
                    </h3>
                    
                    {/* Video duration badge */}
                    <div className="mt-3 flex items-center justify-between">
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-[#196D0D]">
                        <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z"/>
                        </svg>
                        Video
                      </span>
                      
                      <div className="flex items-center text-gray-500 text-xs">
                        <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                        Watch
                      </div>
                    </div>
                  </div>
                </a>
              </div>
            ))}
          </div>        
        </div>
      </section>
    </div>
  );
};

export default Education;