import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaShareAlt, FaFacebook, FaTwitter, FaLink } from 'react-icons/fa';

const ArticleDetail = ({ article, onClose }) => {
  const navigate = useNavigate();
  const contentRef = useRef(null);
  const [showShareOptions, setShowShareOptions] = React.useState(false);

  useEffect(() => {
    // Scroll to top when article changes
    if (contentRef.current) {
      contentRef.current.scrollTo(0, 0);
    }
    
    // Add class to body to prevent scrolling
    document.body.style.overflow = 'hidden';
    
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [article?.id]);

  const shareArticle = (platform) => {
    const url = window.location.href;
    const title = article.title;
    const text = article.excerpt;
    
    switch(platform) {
      case 'facebook':
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank');
        break;
      case 'twitter':
        window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`, '_blank');
        break;
      case 'copy':
        navigator.clipboard.writeText(url);
        alert('Link copied to clipboard!');
        break;
      default:
        break;
    }
    
    setShowShareOptions(false);
  };

  if (!article) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 z-50 overflow-y-auto">
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto" ref={contentRef}>
          {/* Header */}
          <div className="sticky top-0 bg-white p-4 border-b flex justify-between items-center z-10">
            <div className="flex items-center space-x-4">
              <button 
                onClick={onClose}
                className="text-gray-500 hover:text-gray-700 p-1 rounded-full hover:bg-gray-100"
                aria-label="Close"
              >
                <FaArrowLeft className="w-5 h-5" />
              </button>
              <span className="text-sm font-medium text-gray-500">{article.readTime}</span>
            </div>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <button 
                  onClick={() => setShowShareOptions(!showShareOptions)}
                  className="p-2 rounded-full hover:bg-gray-100 text-gray-500 hover:text-gray-700"
                  aria-label="Share options"
                >
                  <FaShareAlt className="w-5 h-5" />
                </button>
                {showShareOptions && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-20">
                    <button 
                      onClick={() => shareArticle('facebook')}
                      className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      <FaFacebook className="w-4 h-4 mr-2 text-blue-600" />
                      Share on Facebook
                    </button>
                    <button 
                      onClick={() => shareArticle('twitter')}
                      className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      <FaTwitter className="w-4 h-4 mr-2 text-blue-400" />
                      Share on Twitter
                    </button>
                    <button 
                      onClick={() => shareArticle('copy')}
                      className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      <FaLink className="w-4 h-4 mr-2 text-gray-500" />
                      Copy link
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Article Content */}
          <div className="p-6">
            <div className="mb-8">
              <span className="inline-block px-3 py-1 text-xs font-semibold text-white bg-[#196D0D] rounded-full mb-4">
                {article.category}
              </span>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 leading-tight">
                {article.title}
              </h1>
              <div className="flex flex-wrap items-center text-sm text-gray-500 mb-6">
                <span className="flex items-center">
                  <span className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 font-medium mr-2">
                    NC
                  </span>
                  <span>NutriCheck Team</span>
                </span>
                <span className="mx-2 hidden sm:inline">•</span>
                <span className="block sm:inline mt-2 sm:mt-0">
                  {new Date().toLocaleDateString('en-US', { 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </span>
              </div>
            </div>

            <div className="relative h-64 md:h-96 mb-10 rounded-xl overflow-hidden shadow-lg">
              <img 
                src={article.image} 
                alt={article.title}
                className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = '/assets/image/edu-thumbnail-1.png';
                }}
              />
            </div>

            <div className="prose max-w-3xl mx-auto text-gray-700">
              <p className="text-lg md:text-xl leading-relaxed text-gray-700 mb-8 font-medium">
                {article.excerpt}
              </p>
              
              <div className="space-y-6 text-gray-700 leading-relaxed">
                {article.content?.map((paragraph, index) => (
                  <p key={index} className="text-base md:text-lg">
                    {paragraph}
                  </p>
                ))}
              </div>

              {article.keyPoints && article.keyPoints.length > 0 && (
                <div className="mt-12 pt-8 border-t border-gray-200">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">
                    Key Takeaways
                  </h3>
                  <ul className="space-y-3">
                    {article.keyPoints.map((point, index) => (
                      <li key={index} className="flex items-start">
                        <span className="flex-shrink-0 w-1.5 h-1.5 mt-2.5 mr-2 bg-[#196D0D] rounded-full"></span>
                        <span className="text-gray-700">{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="mt-12 pt-8 border-t border-gray-200">
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div className="flex items-center space-x-2">
                    <span className="text-sm font-medium text-gray-500">Share:</span>
                    <button 
                      onClick={() => shareArticle('facebook')}
                      className="text-gray-500 hover:text-blue-600 transition-colors"
                      aria-label="Share on Facebook"
                    >
                      <FaFacebook className="w-5 h-5" />
                    </button>
                    <button 
                      onClick={() => shareArticle('twitter')}
                      className="text-gray-500 hover:text-blue-400 transition-colors"
                      aria-label="Share on Twitter"
                    >
                      <FaTwitter className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArticleDetail;
