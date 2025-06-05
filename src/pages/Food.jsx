import React from "react";
import '../styles/index.css';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

const Food = () => {
  const categories = [
    {
      id: 1,
      name: "Fiber",
      image: "/assets/image/categories-fiber.png",
      description: "Essential for digestive health"
    },
    {
      id: 2,
      name: "Protein",
      image: "/assets/image/categories-protein.png",
      description: "Building blocks of life"
    },
    {
      id: 3,
      name: "Fats",
      image: "/assets/image/categories-fats.png",
      description: "Healthy energy source"
    },
    {
      id: 4,
      name: "Carbs",
      image: "/assets/image/categories-carbs.png",
      description: "Primary energy fuel"
    }
  ];

  const colorCategories = [
    {
      id: 1,
      color: "Yellow",
      image: "/assets/image/fiber-yellow.png",
      benefits: "Immune system, Healthy heart, Prevents ulcers, Healthy Colon"
    },
    {
      id: 2,
      color: "White",
      image: "/assets/image/fiber-white.png",
      benefits: "Bone health, Heart protection, Cholesterol control"
    },
    {
      id: 3,
      color: "Green",
      image: "/assets/image/fiber-green.png",
      benefits: "Eye health, Liver detox, Bone strength, and Cancer prevention"
    },
    {
      id: 4,
      color: "Red",
      image: "/assets/image/fiber-red.png",
      benefits: "Heart health, Memory boost, Urinary tract, and Cancer protection"
    },
    {
      id: 5,
      color: "Purple",
      image: "/assets/image/fiber-purple.png",
      benefits: "Brain health, Anti-aging, Heart protection, Memory enhancement"
    },
    {
      id: 6,
      color: "Orange",
      image: "/assets/image/fiber-orange.png",
      benefits: "Vision health, Immune boost, Skin health, and Reproductive health"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-100 via-yellow-50 to-orange-50">
      {/* Hero section */}
      <section className="pt-12 sm:pt-16 lg:pt-25">
        <div className="flex flex-col lg:flex-row items-center justify-between p-4 sm:p-6 lg:p-8 gap-6 lg:gap-0">
          <div className="bg-[#CFEBD1] justify-center m-2 sm:m-3 lg:m-5 border-t-4 border-r-4 border-b-4 border-l-4 border-[#196D0D] rounded-br-full rounded-tr-full p-6 sm:p-8 lg:p-10 w-full lg:w-1/2">
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold m-1 sm:m-2 tracking-tighter leading-normal">
              Let's <span className="text-[#196D0D]">Take Care</span><br />About Your Health
            </h1>
            <p className="text-gray-700 text-base sm:text-lg md:text-xl lg:text-2xl m-1 sm:m-2">
              Simplifies your journey to balanced nutrition with<br className="hidden sm:block" />
              instant food analysis, AI-powered insights. Track<br className="hidden sm:block" />
              your meals and discover smarter eating habits.<br className="hidden sm:block" />
              Start your health transformation today,<br className="hidden sm:block" />
              completely free!
            </p>
          </div>

          <div className="w-full sm:w-3/4 md:w-2/3 lg:w-[40%]">
            <img src="/assets/image/food-hero.png" alt="Gambar" className="w-full h-auto rounded-lg" />
          </div>
        </div>
        
        <hr className="w-4/5 sm:w-3/4 lg:w-[80%] mx-auto border-t-2" />

        <div className="text-center max-w-4xl mx-auto py-4 sm:py-6 lg:py-7 px-4 sm:px-6">
          <blockquote className="text-base sm:text-lg lg:text-xl xl:text-2xl text-gray-700 leading-relaxed italic font-medium">
            "The path to healthy eating is not about punishing yourself for what you eat, but about making mindful decisions that enhance your overall quality of life."
          </blockquote>
        </div>
      </section>

      {/* Food Categories Section */}
      <section className="py-16 bg-gradient-to-br from-[#CFEBD1] to-emerald-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-[#196D0D] mb-4">
              Essential Nutrients
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Discover the key nutrients your body needs for optimal health and wellness
            </p>
          </div>

          {/* Categories Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {categories.map((category) => (
              <div key={category.id} className="group text-center">
                <div className="relative bg-white rounded-3xl p-6 lg:p-8 border-2 border-[#196D0D] shadow-lg hover:shadow-2xl transform transition-all duration-300 hover:scale-105 hover:-translate-y-2">
                  <img 
                    src={category.image} 
                    alt={category.name}
                    className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 object-contain mx-auto mb-4 transition-transform duration-300 group-hover:scale-110" 
                  />
                  <h3 className="text-lg sm:text-xl font-bold text-[#196D0D] mb-2">
                    {category.name}
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {category.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Color Categories Slider Section */}
      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-[#196D0D] mb-4">
              Eat the Rainbow
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Different colored foods provide unique health benefits. Discover what each color offers for your wellness.
            </p>
          </div>

          {/* Custom Swiper Styles */}
          <style jsx>{`
            .swiper-button-next,
            .swiper-button-prev {
              color: #196D0D !important;
              background: white !important;
              border-radius: 50% !important;
              width: 44px !important;
              height: 44px !important;
              box-shadow: 0 4px 12px rgba(0,0,0,0.15) !important;
              transition: all 0.3s ease !important;
            }
            
            .swiper-button-next:hover,
            .swiper-button-prev:hover {
              background: #196D0D !important;
              color: white !important;
              transform: scale(1.1) !important;
            }
            
            .swiper-pagination-bullet {
              background: #196D0D !important;
              opacity: 0.3 !important;
              width: 12px !important;
              height: 12px !important;
              transition: all 0.3s ease !important;
            }
            
            .swiper-pagination-bullet-active {
              opacity: 1 !important;
              transform: scale(1.2) !important;
            }
            
            .swiper-button-next::after,
            .swiper-button-prev::after {
              font-size: 18px !important;
              font-weight: bold !important;
            }
          `}</style>

          <Swiper          
            modules={[Navigation, Pagination, Scrollbar, A11y]}
            spaceBetween={24}
            slidesPerView={1}
            navigation
            pagination={{ clickable: true }}
            breakpoints={{
              640: {
                slidesPerView: 2,
                spaceBetween: 20,
              },
              768: {
                slidesPerView: 2,
                spaceBetween: 24,
              },
              1024: {
                slidesPerView: 3,
                spaceBetween: 32,
              },
              1280: {
                slidesPerView: 4,
                spaceBetween: 32,
              },
            }}
            className="pb-12"
          >
            {colorCategories.map((item) => (
              <SwiperSlide key={item.id}>
                <div className="group">
                  <div className="bg-white rounded-3xl m-3 p-6 lg:p-8 shadow-lg hover:shadow-2xl transform transition-all duration-300 hover:scale-105 hover:-translate-y-2 border border-gray-100">
                    <div className="text-center">
                      <div className="relative mb-6">
                        <img 
                          src={item.image} 
                          alt={item.color}
                          className="w-32 h-32 sm:w-40 sm:h-40 lg:w-45 lg:h-45 object-contain mx-auto rounded-2xl transition-transform duration-300 group-hover:scale-110" 
                        />
                        
                      </div>
                      
                      <h3 className="text-xl sm:text-2xl font-bold text-[#196D0D] mb-4">
                        {item.color}
                      </h3>
                      
                      <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                        {item.benefits}
                      </p>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>
    </div>
  );
};

export default Food;