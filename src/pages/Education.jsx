import React, { useState, useEffect } from "react";
import { Navigation, Pagination, Scrollbar, A11y, Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import ArticleDetail from '../components/ArticleDetail';
import { FiBookmark, FiBookOpen } from 'react-icons/fi';
import toast from 'react-hot-toast';
import '../styles/index.css';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import 'swiper/css/autoplay';

const Education = () => {
  const [selectedArticle, setSelectedArticle] = useState(null);
  const navigate = useNavigate();
  const { articleId } = useParams();
  const location = useLocation();

  // Handle article selection based on URL
  useEffect(() => {
    if (articleId) {
      const article = articles.find(a => a.id === parseInt(articleId));
      setSelectedArticle(article || null);
    } else {
      setSelectedArticle(null);
    }
  }, [articleId, location.pathname]);

    // Save read article to history
  const saveToReadHistory = (article, e) => {
    if (e) {
      e.stopPropagation();
    }
    
    if (!article) return;
    
    const history = JSON.parse(localStorage.getItem('readArticles') || '[]');
    const existingIndex = history.findIndex(item => item.id === article.id);
    const timestamp = new Date().toISOString();
    
    const articleData = {
      id: article.id,
      title: article.title,
      excerpt: article.excerpt,
      category: article.category || 'Article',
      readTime: article.readTime || '5 min read',
      image: article.image,
      readAt: timestamp
    };
    
    if (existingIndex >= 0) {
      // Update existing entry with new read time
      history[existingIndex] = articleData;
    } else {
      // Add new entry
      history.unshift(articleData);
      // Keep only the last 50 read articles
      if (history.length > 50) history.pop();
    }
    
    localStorage.setItem('readArticles', JSON.stringify(history));
    toast.success('Berhasil disimpan ke Reading History', {
      icon: '📚',
      style: {
        borderRadius: '10px',
        background: '#333',
        color: '#fff',
      },
    });
  };

  const handleArticleClick = (article, e) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    navigate(`/education/article/${article.id}`, { replace: true });
  };

  const handleCloseArticle = (e) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    navigate('/education', { replace: true });
  };
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

  // Dummy articles data with full content
  const articles = [
    {
      id: 1,
      title: "Healthy Diet for Beginners: Complete Guide",
      excerpt: "Discover how to start a healthy diet with practical, easy-to-follow steps for beginners.",
      category: "Healthy Diet",
      readTime: "5 min read",
      image: "/assets/image/edu-thumbnail-1.png",
      content: [
        "Starting a healthy diet doesn't have to be complicated. The key is understanding the basics of nutrition and how to apply them in daily life. A healthy diet isn't about extreme restrictions, but rather about giving your body the nutrients it needs to function optimally.",
        "First, focus on whole foods like vegetables, fruits, whole grains, lean proteins, and healthy fats. Try to consume a variety of foods to ensure you get all the nutrients your body needs.",
        "Second, pay attention to portion sizes. Use smaller plates, eat slowly, and stop eating when you're 80% full. This helps prevent overeating and aids digestion.",
        "Don't forget to stay hydrated by drinking enough water. Sometimes, thirst can be mistaken for hunger.",
        "Finally, don't try to change all your eating habits at once. Start with small changes, like adding one extra serving of vegetables each day or replacing unhealthy snacks with fresh fruits."
      ],
      keyPoints: [
        "Focus on whole, nutritious foods",
        "Pay attention to portion sizes",
        "Stay hydrated with enough water",
        "Make changes gradually"
      ]
    },
    {
      id: 2,
      title: "5 Superfoods to Boost Your Metabolism",
      excerpt: "Discover foods that can help increase your metabolism and burn fat more efficiently.",
      category: "Healthy Foods",
      readTime: "6 min read",
      image: "/assets/image/edu-thumbnail-2.png",
      content: [
        "A good metabolism is key to weight loss and maintaining a healthy body. Here are 5 superfoods that can help boost your metabolism:",
        "1. Chili Peppers - Contain capsaicin which can increase metabolism by up to 5% and help burn more fat.",
        "2. Green Tea - Rich in antioxidants and catechins that can boost fat burning by up to 17%.",
        "3. Coffee - Caffeine in coffee can boost metabolism by 3-11% and increase fat burning.",
        "4. Protein - High-protein foods like eggs, lean meats, and nuts require more energy to digest, thus increasing calorie burn.",
        "5. Water - Drinking enough water can boost metabolism by up to 30% for about an hour.",
        "In addition to consuming these foods, make sure to stay physically active and get enough sleep for optimal results."
      ],
      keyPoints: [
        "Chili peppers contain fat-burning capsaicin",
        "Green tea is rich in fat-burning antioxidants",
        "Caffeine in coffee boosts metabolism",
        "Protein requires more energy to digest",
        "Adequate hydration is important for optimal metabolism"
      ]
    },
    {
      id: 3,
      title: "Mediterranean Diet: The Secret to Longevity",
      excerpt: "Learn about the famous Mediterranean diet known for its outstanding health benefits.",
      category: "Popular Diets",
      readTime: "7 min read",
      image: "/assets/image/edu-thumbnail-3.png",
      content: [
        "The Mediterranean diet is inspired by the traditional eating patterns of countries around the Mediterranean Sea. This diet not only helps with weight loss but is also associated with reduced risk of heart disease, diabetes, and other chronic conditions.",
        "Main principles of the Mediterranean diet:",
        "1. Consume plenty of vegetables, fruits, nuts, and whole grains",
        "2. Use olive oil as the primary source of fat",
        "3. Eat fish and seafood at least twice a week",
        "4. Limit consumption of red and processed meats",
        "5. Enjoy dairy products like cheese and yogurt in moderation",
        "6. Use herbs and spices instead of salt for flavor",
        "7. Enjoy red wine in moderation (optional)",
        "This diet is more than just an eating pattern; it's a lifestyle that emphasizes physical activity, shared meals, and mindful eating."
      ],
      keyPoints: [
        "Rich in vegetables, fruits, and whole grains",
        "Olive oil as the primary fat source",
        "Abundant fish and seafood",
        "Limited red and processed meats",
        "Active lifestyle and shared meals"
      ]
    },
    {
      id: 4,
      title: "Diet Myths and Facts",
      excerpt: "Unveiling the truth behind commonly believed diet myths.",
      category: "Nutrition Facts",
      readTime: "6 min read",
      image: "/assets/image/edu-thumbnail-4.png",
      content: [
        "There are many myths about diet and nutrition circulating in society. Let's discuss some common myths and the actual facts:",
        "Myth 1: Carbs are bad for diet\nFact: Not all carbs are bad. Complex carbohydrates like brown rice, whole grains, and vegetables are important for energy and digestive health.",
        "Myth 2: Eating at night makes you fat\nFact: What matters is the total calories consumed throughout the day, not when you eat them. Eating at night won't cause weight gain as long as portions are controlled.",
        "Myth 3: 'Fat-free' products are always healthier\nFact: Many fat-free products are high in sugar or artificial sweeteners to enhance flavor. Always read nutrition labels carefully.",
        "Myth 4: Drinking lime water in the morning burns fat\nFact: There is no scientific evidence to support this claim. While limes contain vitamin C, no food or drink can burn fat on its own.",
        "Myth 5: Crash diets are the fastest way to lose weight\nFact: Crash diets are often unsustainable and can lead to yo-yo dieting. Gradual lifestyle changes are more effective in the long run."
      ],
      keyPoints: [
        "Not all carbohydrates are bad",
        "Meal timing doesn't determine weight gain",
        "Fat-free products aren't necessarily healthy",
        "No magic fat-burning foods exist",
        "Gradual changes are more effective than crash diets"
      ]
    },
    {
      id: 5,
      title: "7-Day Healthy Meal Plan",
      excerpt: "A sample healthy meal plan for a week that's nutritionally balanced and easy to make.",
      category: "Meal Plans",
      readTime: "5 min read",
      image: "/assets/image/edu-thumbnail-5.png",
      content: [
        "Here's a sample 7-day healthy meal plan you can try. This menu is designed to meet daily nutritional needs with balanced portions.",
        "Day 1:\n- Breakfast: Oatmeal with banana slices and almonds\n- Lunch: Brown rice with grilled fish, tempeh, and fresh vegetables\n- Dinner: Garden salad with grilled chicken breast and olive oil dressing\n- Snack: Low-fat yogurt with fresh berries",
        "Day 2:\n- Breakfast: Whole wheat toast with avocado and boiled eggs\n- Lunch: Brown rice with mixed vegetables and grilled fish\n- Dinner: Chicken soup with vegetables and corn\n- Snack: Almonds and an apple",
        "Day 3:\n- Breakfast: Spinach, banana, and almond milk smoothie\n- Lunch: Brown rice with tofu stir-fry and fish balls\n- Dinner: Grilled fish with mashed potatoes and steamed broccoli\n- Snack: Steamed edamame",
        "Days 4-7: Vary with combinations of healthy foods from the above menu or create your own using balanced nutrition principles.",
        "Additional tips:\n1. Drink at least 8 glasses of water daily\n2. Limit sugar and salt intake\n3. Vary protein sources between animal and plant-based\n4. Choose healthy cooking methods like steaming, boiling, or grilling\n5. Adjust portions according to your daily caloric needs"
      ],
      keyPoints: [
        "Combination of complex carbs, protein, and healthy fats",
        "Plenty of colorful vegetables",
        "Varied protein sources",
        "Healthy snacks between meals",
        "Adequate hydration throughout the day"
      ]
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
              Video
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Tonton video edukasi dari ahli gizi untuk mempelajari lebih lanjut tentang hidup sehat
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


      {/* Articles Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-amber-500 to-orange-500 rounded-full shadow-lg mb-6">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
              </svg>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#196D0D] mb-4">
              Articles
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Temukan artikel informatif tentang nutrisi, kesehatan, dan gaya hidup sehat
            </p>
          </div>

          {/* Articles Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {articles.map((article) => (
              <div 
                key={article.id} 
                className="group bg-white rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden border border-gray-100 cursor-pointer"
                onClick={(e) => handleArticleClick(article, e)}
              >
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={article.image} 
                    alt={article.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = '/assets/image/placeholder-article.jpg';
                    }}
                  />
                  <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/70 to-transparent">
                    <span className="inline-block px-3 py-1 text-xs font-semibold text-white bg-[#196D0D] rounded-full">
                      {article.category}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center text-sm text-gray-500 mb-3">
                    <span>{article.readTime}</span>
                    <span className="mx-2">•</span>
                    <span>Nutrition</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-[#196D0D] transition-colors">
                    {article.title}
                  </h3>
                  <p className="text-gray-600 mb-4 line-clamp-2">
                    {article.excerpt}
                  </p>
                  <div className="flex justify-between items-center">
                    <div className="text-[#196D0D] font-medium flex items-center group-hover:underline">
                      Read More
                      <svg className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                    <button 
                      onClick={(e) => saveToReadHistory(article, e)}
                      className="p-1.5 text-gray-400 hover:text-green-600 rounded-full hover:bg-green-50 transition-colors"
                      title="Save to Reading List"
                    >
                      <FiBookOpen size={18} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>


        </div>
      </section>

      {/* Article Detail Modal */}
      {selectedArticle && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <ArticleDetail 
            article={selectedArticle} 
            onClose={handleCloseArticle} 
          />
        </div>
      )}
    </div>
  );
};

export default Education;