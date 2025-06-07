import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiTrash2 } from 'react-icons/fi';

const ReadHistory = ({ onArticleClick }) => {
  const [readArticles, setReadArticles] = useState([]);
  const navigate = useNavigate();

  const handleDelete = (articleId, e) => {
    e.stopPropagation(); // Prevent triggering the article click
    
    const confirmDelete = window.confirm('Are you sure you want to remove this article from your reading history?');
    if (!confirmDelete) return;
    
    const updatedHistory = readArticles.filter(article => article.id !== articleId);
    localStorage.setItem('readArticles', JSON.stringify(updatedHistory));
    setReadArticles(updatedHistory);
  };

  useEffect(() => {
    const loadReadArticles = () => {
      const history = JSON.parse(localStorage.getItem('readArticles') || '[]');
      setReadArticles(history);
    };

    loadReadArticles();
    
    // Listen for storage events to update when articles are read in other tabs
    const handleStorageChange = (e) => {
      if (e.key === 'readArticles') {
        loadReadArticles();
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const formatDate = (dateString) => {
    const options = { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    };
    return new Date(dateString).toLocaleDateString('id-ID', options);
  };

  if (readArticles.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">Belum ada riwayat baca</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Read Articles</h3>
      <div className="space-y-3">
        {readArticles.map((article) => (
          <div 
            key={`${article.id}-${article.readAt}`}
            className="group relative p-4 pr-12 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow cursor-pointer border border-gray-100"
            onClick={() => onArticleClick(article)}
          >
            <button 
              onClick={(e) => handleDelete(article.id, e)}
              className="absolute right-3 top-3 p-1.5 text-gray-400 hover:text-red-500 rounded-full hover:bg-red-50 transition-colors opacity-0 group-hover:opacity-100"
              title="Remove from history"
            >
              <FiTrash2 size={16} />
            </button>
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0 w-16 h-16 overflow-hidden rounded-md">
                <img 
                  src={article.image} 
                  alt={article.title}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = '/assets/image/placeholder-article.jpg';
                  }}
                />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="text-sm font-medium text-gray-900 truncate">{article.title}</h4>
                <p className="text-xs text-gray-500 mt-1">{article.category}</p>
                <p className="text-xs text-gray-400 mt-1">
                  Dibaca pada {formatDate(article.readAt)}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReadHistory;
