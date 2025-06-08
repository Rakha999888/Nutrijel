import React, { useState } from "react";
import { Link } from 'react-router-dom';
import '../styles/index.css';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { ArrowLeft } from 'lucide-react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

const Food = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [goal, setGoal] = useState('diet'); // 'diet' or 'bulk'
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

  const recipes = {
    Fiber: {
      diet: [
        {
          id: 1,
          name: "Gado-Gado Protein Plus",
          description: "High-protein version of Indonesian salad with tempeh and boiled eggs",
          calories: 350,
          ingredients: ["Mixed greens", "Tempeh", "Boiled eggs", "Tofu", "Peanut sauce", "Bean sprouts"],
          benefits: "Rich in plant-based protein, fiber, and healthy fats. Supports muscle recovery and gut health."
        },
        {
          id: 2,
          name: "Pecel Sayur with Grilled Fish",
          description: "Steamed vegetables with peanut sauce and grilled mackerel",
          calories: 380,
          ingredients: ["Steamed vegetables", "Grilled mackerel", "Peanut sauce", "Tempeh chips"],
          benefits: "High in omega-3, fiber, and complete protein. Supports heart and brain health."
        },
        {
          id: 3,
          name: "Urap Sayuran with Tofu",
          description: "Steamed mixed vegetables with spiced coconut and tofu",
          calories: 290,
          ingredients: ["Mixed vegetables", "Grated coconut", "Tofu", "Lime leaves", "Chili"],
          benefits: "High in fiber, plant compounds, and medium-chain triglycerides for sustained energy."
        }
      ],
      bulk: [
        {
          id: 4,
          name: "Sayur Lodeh with Chicken",
          description: "Vegetable stew in coconut milk with chicken and tempeh",
          calories: 520,
          ingredients: ["Chicken thigh", "Coconut milk", "Mixed vegetables", "Tempeh", "Rice"],
          benefits: "High in healthy fats, protein, and fiber. Supports muscle growth and recovery."
        },
        {
          id: 5,
          name: "Gudeg Komplit",
          description: "Jackfruit stew with chicken, eggs, and tempeh",
          calories: 580,
          ingredients: ["Young jackfruit", "Chicken", "Eggs", "Tempeh", "Coconut milk", "Rice"],
          benefits: "Rich in protein, complex carbs, and essential minerals for muscle building."
        }
      ]
    },
    Protein: {
      diet: [
        {
          id: 6,
          name: "Ikan Bakar with Lalapan",
          description: "Grilled fish with fresh vegetables and sambal",
          calories: 320,
          ingredients: ["Grilled snapper", "Fresh vegetables", "Sambal", "Lime"],
          benefits: "High in lean protein, omega-3, and antioxidants. Supports muscle maintenance and fat loss."
        },
        {
          id: 7,
          name: "Tahu Telur with Quinoa",
          description: "Tofu and egg omelet with quinoa and vegetables",
          calories: 380,
          ingredients: ["Tofu", "Eggs", "Quinoa", "Carrots", "Green beans"],
          benefits: "Complete protein source with all essential amino acids and complex carbs."
        }
      ],
      bulk: [
        {
          id: 8,
          name: "Rendang Daging with Sweet Potato",
          description: "Spicy beef stew with sweet potato mash",
          calories: 650,
          ingredients: ["Beef shank", "Coconut milk", "Spices", "Sweet potato"],
          benefits: "High in protein, healthy fats, and complex carbs for muscle growth."
        },
        {
          id: 9,
          name: "Ayam Betutu with Brown Rice",
          description: "Spiced Balinese chicken with brown rice",
          calories: 580,
          ingredients: ["Chicken thigh", "Banana leaves", "Spices", "Brown rice"],
          benefits: "Rich in protein, B-vitamins, and fiber for sustained energy."
        }
      ]
    },
    Carbs: {
      diet: [
        {
          id: 10,
          name: "Nasi Merah with Grilled Chicken",
          description: "Red rice with grilled chicken and steamed vegetables",
          calories: 420,
          ingredients: ["Red rice", "Chicken breast", "Steamed vegetables", "Sambal"],
          benefits: "High in fiber, lean protein, and complex carbs for sustained energy."
        },
        {
          id: 11,
          name: "Oatmeal with Banana and Peanut Butter",
          description: "High-fiber oatmeal with banana and natural peanut butter",
          calories: 350,
          ingredients: ["Oats", "Banana", "Peanut butter", "Chia seeds", "Cinnamon"],
          benefits: "Rich in complex carbs, healthy fats, and fiber for sustained energy."
        }
      ],
      bulk: [
        {
          id: 12,
          name: "Nasi Padang Special",
          description: "Steamed rice with rendang, fried chicken, and vegetables",
          calories: 920,
          ingredients: ["Rice", "Rendang", "Fried chicken", "Vegetables", "Eggs", "Sambal"],
          benefits: "High-calorie meal with balanced macros for muscle gain."
        },
        {
          id: 13,
          name: "Nasi Goreng Special",
          description: "Fried rice with chicken, prawns, and vegetables",
          calories: 780,
          ingredients: ["Rice", "Chicken", "Prawns", "Eggs", "Vegetables", "Sambal"],
          benefits: "High in protein, carbs, and healthy fats for muscle recovery."
        }
      ]
    },
    Fats: {
      diet: [
        {
          id: 14,
          name: "Sop Buntut with Brown Rice",
          description: "Oxtail soup with vegetables and brown rice",
          calories: 480,
          ingredients: ["Oxtail", "Vegetables", "Garlic", "Brown rice"],
          benefits: "Rich in collagen, healthy fats, and minerals for joint health."
        },
        {
          id: 15,
          name: "Gurame Bakar with Woku",
          description: "Grilled gurame fish with spicy woku sauce",
          calories: 420,
          ingredients: ["Gurame fish", "Lemongrass", "Turmeric", "Chili", "Lime leaves"],
          benefits: "High in omega-3 and anti-inflammatory compounds."
        }
      ],
      bulk: [
        {
          id: 16,
          name: "Gulai Kambing with White Rice",
          description: "Spicy goat curry with rice",
          calories: 720,
          ingredients: ["Goat meat", "Coconut milk", "Spices", "Potatoes", "Rice"],
          benefits: "High in protein, healthy fats, and calories for muscle growth."
        },
        {
          id: 17,
          name: "Ayam Rica-Rica with Coconut Rice",
          description: "Spicy chicken with coconut rice",
          calories: 680,
          ingredients: ["Chicken thigh", "Chili", "Lime leaves", "Coconut rice"],
          benefits: "Rich in healthy fats, protein, and metabolism-boosting spices."
        }
      ]
    }
  };

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
  };

  const handleBackToCategories = () => {
    setSelectedCategory(null);
  };

  const [selectedColor, setSelectedColor] = useState(null);

  const colorCategories = [
    {
      id: 1,
      color: "Yellow",
      image: "/assets/image/fiber-yellow.png",
      benefits: "Sistem imun, Jantung sehat, Mencegah maag, Kesehatan usus",
      foods: ["Pisang", "Nanas", "Paprika kuning", "Jagung", "Lemon"],
      description: "Buah dan sayuran berwarna kuning kaya akan beta-karoten, vitamin C, dan bioflavonoid. Mendukung fungsi kekebalan tubuh, meningkatkan kesehatan jantung, dan mengandung enzim yang membantu pencernaan. Warna cerahnya berasal dari antioksidan yang melindungi sel dari kerusakan.",
      nutrients: ["Vitamin C", "Beta-karoten", "Kalium", "Bromelain (dalam nanas)", "Lutein"]
    },
    {
      id: 2,
      color: "White",
      image: "/assets/image/fiber-white.png",
      benefits: "Kesehatan tulang, Perlindungan jantung, Mengontrol kolesterol",
      foods: ["Bawang putih", "Bawang bombay", "Kembang kol", "Jamur", "Kacang putih"],
      description: "Makanan berwarna putih mengandung allicin, quercetin, dan fitonutrien kuat lainnya. Mendukung kesehatan kardiovaskular, membantu menjaga kadar kolesterol sehat, dan mengandung senyawa yang dapat melawan infeksi dan mengurangi peradangan.",
      nutrients: ["Allicin", "Selenium", "Quercetin", "Kalium", "Vitamin C"]
    },
    {
      id: 3,
      color: "Green",
      image: "/assets/image/fiber-green.png",
      benefits: "Kesehatan mata, Detoksifikasi hati, Kekuatan tulang, Pencegahan kanker",
      foods: ["Bayam", "Brokoli", "Alpukat", "Apel hijau", "Kale"],
      description: "Sayuran hijau kaya akan klorofil, serat, dan nutrisi penting. Mendukung detoksifikasi, meningkatkan penglihatan yang sehat, dan kaya akan folat yang penting untuk pertumbuhan sel. Antioksidan dalam sayuran hijau membantu melindungi dari berbagai jenis kanker.",
      nutrients: ["Klorofil", "Lutein", "Zeaxanthin", "Folat", "Vitamin K"]
    },
    {
      id: 4,
      color: "Red",
      image: "/assets/image/fiber-red.png",
      benefits: "Kesehatan jantung, Meningkatkan memori, Saluran kemih, Perlindungan kanker",
      foods: ["Tomat", "Stroberi", "Paprika merah", "Semangka", "Apel merah"],
      description: "Buah dan sayuran merah mendapatkan warnanya dari likopen dan antosianin. Antioksidan kuat ini mendukung kesehatan jantung, dapat mengurangi risiko kanker tertentu, dan membantu mempertahankan fungsi memori. Juga sangat baik untuk kesehatan kulit dan dapat melindungi dari kerusakan sinar matahari.",
      nutrients: ["Lycopene", "Antosianin", "Vitamin C", "Asam ellagic", "Quercetin"]
    },
    {
      id: 5,
      color: "Purple/Blue",
      image: "/assets/image/fiber-purple.png",
      benefits: "Kesehatan otak, Anti-penuaan, Perlindungan jantung, Meningkatkan memori",
      foods: ["Bluberi", "Terong", "Kubis ungu", "Blackberry", "Plum"],
      description: "Makanan berwarna ungu dan biru mengandung antioksidan kuat bernama antosianin yang dapat menunda penuaan sel dan membantu daya ingat. Mendukung fungsi kognitif, mengurangi peradangan, dan meningkatkan kesehatan jantung. Makanan ini juga dikenal dengan sifat anti-kankernya.",
      nutrients: ["Antosianin", "Resveratrol", "Vitamin C", "Serat", "Asam ellagic"]
    },
    {
      id: 6,
      color: "Orange",
      image: "/assets/image/fiber-orange.png",
      benefits: "Kesehatan mata, Meningkatkan imunitas, Kesehatan kulit, Kesehatan reproduksi",
      foods: ["Wortel", "Jeruk", "Ubi jalar", "Mangga", "Labu kuning"],
      description: "Makanan berwarna oranye kaya akan beta-karoten yang diubah tubuh menjadi vitamin A. Mendukung penglihatan yang sehat, meningkatkan fungsi kekebalan tubuh, dan menyehatkan kulit. Antioksidan dalam makanan oranye juga membantu melindungi dari penyakit jantung dan dapat mengurangi risiko kanker tertentu.",
      nutrients: ["Beta-karoten", "Vitamin C", "Kalium", "Flavonoid", "Serat"]
    }
  ];

  const handleColorSelect = (color) => {
    setSelectedColor(color === selectedColor ? null : color);
  };
  
  const handleBackToColors = () => {
    setSelectedColor(null);
  }; 

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

          {!selectedCategory ? (
            <>
              <div className="flex justify-center mb-8">
                <div className="inline-flex rounded-md shadow-sm" role="group">
                  <button
                    type="button"
                    onClick={() => setGoal('diet')}
                    className={`px-6 py-3 text-sm font-medium rounded-l-lg ${
                      goal === 'diet'
                        ? 'bg-[#196D0D] text-white'
                        : 'bg-white text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    For Diet
                  </button>
                  <button
                    type="button"
                    onClick={() => setGoal('bulk')}
                    className={`px-6 py-3 text-sm font-medium rounded-r-lg ${
                      goal === 'bulk'
                        ? 'bg-[#196D0D] text-white'
                        : 'bg-white text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    For Bulking
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => handleCategorySelect(category.name)}
                    className="group text-center focus:outline-none"
                  >
                    <div className="relative bg-white rounded-3xl p-6 lg:p-8 border-2 border-[#196D0D] shadow-lg hover:shadow-2xl transform transition-all duration-300 hover:scale-105 hover:-translate-y-2 rainbow-card">
                      <div className="rainbow-image-container">
                        <div className="rainbow-image-wrapper">
                          <img 
                            src={category.image} 
                            alt={category.name}
                            className="rainbow-image"
                          />
                        </div>
                      </div>
                      <h3 className="text-lg sm:text-xl font-bold text-[#196D0D] mb-2">
                        {category.name}
                      </h3>
                      <p className="text-sm text-gray-600 leading-relaxed">
                        {category.description}
                      </p>
                    </div>
                  </button>
                ))}
              </div>
            </>
          ) : (
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <button
                onClick={handleBackToCategories}
                className="flex items-center text-[#196D0D] hover:text-green-800 mb-6 transition-colors"
              >
                <ArrowLeft className="h-5 w-5 mr-2" />
                <span className="font-medium">Back to Categories</span>
              </button>
              
              <h3 className="text-2xl font-bold text-[#196D0D] mb-6">
                {selectedCategory} Recipes for {goal === 'diet' ? 'Diet' : 'Bulking'}
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {recipes[selectedCategory]?.[goal]?.map((recipe) => (
                  <div key={recipe.id} className="border border-gray-200 rounded-xl p-5 hover:shadow-md transition-shadow">
                    <h4 className="text-xl font-semibold text-gray-800 mb-2">{recipe.name}</h4>
                    <p className="text-gray-600 mb-3">{recipe.description}</p>
                    <div className="mb-3">
                      <span className="text-sm font-medium text-gray-500">Calories: </span>
                      <span className="text-[#196D0D] font-medium">{recipe.calories} kcal</span>
                    </div>
                    <div className="mb-3">
                      <h5 className="text-sm font-medium text-gray-500 mb-1">Key Ingredients:</h5>
                      <div className="flex flex-wrap gap-2">
                        {recipe.ingredients.map((ingredient, idx) => (
                          <span key={idx} className="bg-green-50 text-green-700 text-xs px-2 py-1 rounded">
                            {ingredient}
                          </span>
                        ))}
                      </div>
                    </div>
                    <p className="text-sm text-gray-700">
                      <span className="font-medium">Benefits: </span>
                      {recipe.benefits}
                    </p>
                  </div>
                )) || (
                  <div className="text-center py-8 col-span-full">
                    <p className="text-gray-500">No {selectedCategory.toLowerCase()} recipes found for {goal}.</p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </section>



      {/* Color Categories Slider Section - Only show when no category is selected */}
      {!selectedCategory && (
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
          <style jsx global>{`
    .swiper-button-next,
    .swiper-button-prev {
      color: #196D0D !important;
    }
    .swiper-pagination-bullet-active {
      background: #196D0D !important;
    }
    @media (max-width: 768px) {
      .swiper-button-next,
      .swiper-button-prev {
        display: none !important;
      }
    }
    
    /* Animasi untuk semua gambar */
    .rainbow-image {
      width: 100%;
      height: 100%;
      object-fit: contain;
      transition: all 0.5s ease;
      animation: float 4s ease-in-out infinite;
      transform-style: preserve-3d;
    }
    
    /* Animasi hover untuk semua gambar */
    .rainbow-image-container {
      position: relative;
      width: 160px;
      height: 160px;
      margin: 0 auto;
      perspective: 1000px;
    }
    
    .rainbow-image-wrapper {
      width: 100%;
      height: 100%;
      transition: transform 0.5s ease;
    }
    
    .rainbow-image-hover {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      object-fit: contain;
      opacity: 0;
      transform: rotateY(180deg);
      transition: all 0.5s ease;
    }
    
    .rainbow-card:hover .rainbow-image-wrapper {
      transform: rotateY(180deg);
    }
    
    .rainbow-card:hover .rainbow-image {
      filter: brightness(0.9);
    }
    
    .rainbow-card:hover .rainbow-image-hover {
      opacity: 1;
      transform: rotateY(0deg);
    }
    
    /* Animasi mengambang */
    @keyframes float {
      0% { transform: translateY(0) rotate(0deg); }
      25% { transform: translateY(-10px) rotate(2deg); }
      50% { transform: translateY(-5px) rotate(-2deg); }
      75% { transform: translateY(-10px) rotate(2deg); }
      100% { transform: translateY(0) rotate(0deg); }
    }
    
    /* Animasi untuk detail view */
    .rainbow-detail-image {
      animation: float 4s ease-in-out infinite, pulse 2s ease-in-out infinite;
      transform-style: preserve-3d;
    }
    
    @keyframes pulse {
      0% { transform: scale(1); }
      50% { transform: scale(1.05); }
      100% { transform: scale(1); }
    }
    
    /* Animasi hover pada card */
    .rainbow-card {
      transition: all 0.3s ease;
      transform: translateY(0);
      position: relative;
      overflow: hidden;
    }
    
    .rainbow-card::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: linear-gradient(45deg, rgba(25, 109, 13, 0.1), transparent);
      opacity: 0;
      transition: opacity 0.3s ease;
    }
    
    .rainbow-card:hover {
      transform: translateY(-5px);
      box-shadow: 0 10px 25px -5px rgba(25, 109, 13, 0.2);
    }
    
    .rainbow-card:hover::before {
      opacity: 1;
    }
  `}</style>

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

          {!selectedColor ? (
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
                  <button 
                    onClick={() => handleColorSelect(item.color)}
                    className="w-full text-left focus:outline-none group"
                  >
                    <div className="food-card bg-white rounded-3xl m-3 p-6 lg:p-8 shadow-lg border border-gray-100 rainbow-card">
                      <div className="text-center">
                        <div className="rainbow-image-container">
                          <div className="rainbow-image-wrapper">
                            <img 
                              src={item.image} 
                              alt={item.color}
                              className="rainbow-image"
                            />
                            <img 
                              src={item.image.replace('.png', '') + '-hover.png'} 
                              alt={item.color}
                              className="rainbow-image-hover"
                              onError={(e) => {
                                // Fallback ke gambar asli jika hover image tidak ada
                                e.target.style.display = 'none';
                                e.target.previousSibling.style.display = 'block';
                              }}
                            />
                          </div>
                        </div>
                        
                        <h3 className="text-xl sm:text-2xl font-bold text-[#196D0D] mb-4">
                          {item.color}
                        </h3>
                        
                        <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                          {item.benefits}
                        </p>
                        
                        <div className="mt-4 text-sm text-[#196D0D] font-medium">
                          Klik untuk info lebih lanjut →
                        </div>
                      </div>
                    </div>
                  </button>
                </SwiperSlide>
              ))}
            </Swiper>
          ) : (
            <div className="bg-white rounded-2xl p-6 lg:p-8 shadow-lg max-w-4xl mx-auto">
              <button
                onClick={handleBackToColors}
                className="flex items-center text-[#196D0D] hover:text-green-800 mb-6 transition-colors"
              >
                <ArrowLeft className="h-5 w-5 mr-2" />
                <span className="font-medium">Kembali ke Warna</span>
              </button>
              
              {colorCategories.filter(item => item.color === selectedColor).map(color => (
                <div key={color.id} className="space-y-6">
                  <div className="flex flex-col md:flex-row items-center gap-6">
                    <div className="flex-shrink-0">
                      <div className="rainbow-detail-image">
                        <img 
                          src={color.image} 
                          alt={color.color}
                          className="w-40 h-40 object-contain mx-auto rounded-2xl shadow-lg"
                        />
                      </div>
                    </div>
                    <div>
                      <h3 className="text-2xl md:text-3xl font-bold text-[#196D0D] mb-3">
                        {color.color} Foods
                      </h3>
                      <p className="text-gray-700 mb-4">
                        {color.description}
                      </p>
                      
                      <div className="mb-4">
                        <h4 className="font-semibold text-gray-800 mb-2">Key Benefits:</h4>
                        <p className="text-gray-600">{color.benefits}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-green-50 p-4 rounded-lg">
                      <h4 className="font-semibold text-gray-800 mb-2">Sumber Makanan:</h4>
                      <ul className="list-disc list-inside space-y-1 text-gray-700">
                        {color.foods.map((food, index) => (
                          <li key={index} className="flex items-center">
                            <span className="w-1.5 h-1.5 bg-[#196D0D] rounded-full mr-2"></span>
                            {food}
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div className="bg-amber-50 p-4 rounded-lg">
                      <h4 className="font-semibold text-gray-800 mb-2">Nutrisi Utama:</h4>
                      <div className="flex flex-wrap gap-2">
                        {color.nutrients.map((nutrient, index) => (
                          <span key={index} className="bg-white px-3 py-1 rounded-full text-sm text-[#196D0D] border border-[#196D0D] border-opacity-30">
                            {nutrient}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-gray-800 mb-2">Tips Kesehatan:</h4>
                    <ul className="space-y-2 text-gray-700">
                      <li className="flex items-start">
                        <span className="text-[#196D0D] mr-2">✓</span>
                        Sertakan setidaknya satu porsi dalam menu harian Anda
                      </li>
                      <li className="flex items-start">
                        <span className="text-[#196D0D] mr-2">✓</span>
                        Kombinasikan dengan makanan berwarna lain untuk manfaat maksimal
                      </li>
                      <li className="flex items-start">
                        <span className="text-[#196D0D] mr-2">✓</span>
                        Pilih bahan segar dan sesuai musim jika memungkinkan
                      </li>
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          )}
          
          {/* Food Map Navigation Button */}
          <div className="text-center mt-12">
            <Link 
              to="/food-map" 
              className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-[#196D0D] hover:bg-green-700 transition-colors duration-200"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
              </svg>
              Jelajahi Peta Makanan Tradisional
            </Link>
            <p className="mt-2 text-sm text-gray-500">
              Temukan makanan tradisional dari seluruh Indonesia
            </p>
          </div>
        </div>
      </section>
      )}
    </div>
  );
};
{}
export default Food;