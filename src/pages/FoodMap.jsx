import React, { useState, useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { PlusCircle, X, Upload, MapPin, Info, Search, ArrowLeft } from 'lucide-react'; 
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

// Fungsi untuk mendapatkan emoji berdasarkan nama makanan
const getFoodEmoji = (foodName) => {
  const lowerName = foodName.toLowerCase();
  
  if (lowerName.includes('rendang')) return '🍖';
  if (lowerName.includes('sate')) return '🍢';
  if (lowerName.includes('gado')) return '🥗';
  if (lowerName.includes('soto')) return '🍜';
  if (lowerName.includes('nasi goreng')) return '🍛';
  if (lowerName.includes('bakso')) return '🍡';
  if (lowerName.includes('sop')) return '🥣';
  if (lowerName.includes('ayam')) return '🍗';
  if (lowerName.includes('ikan')) return '🐟';
  if (lowerName.includes('sambal')) return '🌶️';
  if (lowerName.includes('tempe') || lowerName.includes('tahu')) return '🧈';
  if (lowerName.includes('nasi')) return '🍚';
  if (lowerName.includes('mie')) return '🍜';
  if (lowerName.includes('bakwan')) return '🥟';
  if (lowerName.includes('pempek')) return '🐟';
  
  if (foodName.includes('gudeg')) return '🍛';
  if (foodName.includes('papeda') || foodName.includes('kuah')) return '🥣';
  if (foodName.includes('sate')) return '🍢';
  if (foodName.includes('soto')) return '🍜';
  if (foodName.includes('nasi')) return '🍚';
  if (foodName.includes('ayam')) return '🍗';
  if (foodName.includes('ikan')) return '🐟';
  if (foodName.includes('sambal')) return '🌶️';
  return '🍽️'; // Default food emoji
};
import '../styles/index.css';

// Custom CSS for the map container
const mapContainerStyle = {
  height: '60vh',
  width: '100%',
  borderRadius: '16px',
  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
};

// Fix for default marker icons
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

// Fungsi untuk membuat ikon kustom dengan emoji makanan
const createCustomIcon = (foodName) => {
  const emoji = getFoodEmoji(foodName);
  
  // Warna latar belakang berdasarkan jenis makanan
  let bgColor = '#4CAF50'; // Default hijau
  
  if (foodName.toLowerCase().includes('ayam') || foodName.toLowerCase().includes('daging')) {
    bgColor = '#E57373'; // Merah muda untuk daging
  } else if (foodName.toLowerCase().includes('ikan') || foodName.toLowerCase().includes('seafood')) {
    bgColor = '#64B5F6'; // Biru muda untuk seafood
  } else if (foodName.toLowerCase().includes('sayur') || foodName.toLowerCase().includes('buah')) {
    bgColor = '#81C784'; // Hijau muda untuk sayur/buah
  }
  
  return L.divIcon({
    className: 'custom-marker',
    html: `
      <div class="marker-container" style="
        background: ${bgColor};
        width: 40px;
        height: 40px;
        border-radius: 50% 50% 50% 0;
        transform: rotate(-45deg);
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: 0 2px 5px rgba(0,0,0,0.3);
        border: 2px solid white;
      ">
        <div style="
          transform: rotate(45deg);
          font-size: 20px;
          color: white;
          text-shadow: 1px 1px 2px rgba(0,0,0,0.5);
        ">
          ${emoji}
        </div>
        <div class="pulse" style="
          position: absolute;
          width: 100%;
          height: 100%;
          background: ${bgColor};
          border-radius: 50%;
          opacity: 0.5;
          animation: pulse 2s infinite;
          z-index: -1;
        "></div>
      </div>
    `,
    iconSize: [40, 40],
    iconAnchor: [20, 50],
    popupAnchor: [0, -40]
  });
};

// Style untuk marker kustom
const customMarkerStyle = `
  @keyframes pulse {
    0% {
      transform: scale(1);
      opacity: 0.5;
    }
    70% {
      transform: scale(1.5);
      opacity: 0;
    }
    100% {
      transform: scale(1);
      opacity: 0;
    }
  }
  
  .custom-marker {
    background: none !important;
    border: none !important;
  }
  
  .marker-container {
    transition: all 0.3s ease;
    cursor: pointer;
  }
  
  .marker-container:hover {
    transform: rotate(-45deg) scale(1.2);
    filter: brightness(1.1);
  }
  
  .leaflet-popup-content-wrapper {
    border-radius: 12px !important;
    padding: 0 !important;
    overflow: hidden;
    box-shadow: 0 4px 12px rgba(0,0,0,0.15) !important;
  }
  
  .leaflet-popup-content {
    margin: 0 !important;
  }
  
  .leaflet-popup-tip {
    display: none;
  }
  
  .custom-popup .leaflet-popup-content-wrapper {
    border-left: 4px solid #4CAF50;
  }
`;

// Tambahkan style ke head
document.head.insertAdjacentHTML('beforeend', `<style>${customMarkerStyle}</style>`);

// Komponen untuk menangani klik peta
function LocationMarker({ onLocationSelect }) {
  useMapEvents({
    click(e) {
      onLocationSelect(e.latlng);
    },
  });
  return null;
}

// Data dummy untuk makanan tradisional
const initialFoodData = [
  {
    id: 1,
    name: 'Rendang',
    region: 'Sumatera Barat',
    description: 'Daging sapi dimasak dengan bumbu rempah khas Minang',
    position: [-0.95, 100.35],
    benefits: 'Tinggi protein, Kaya rempah-rempah, Sumber energi',
    image: 'https://img.freepik.com/free-photo/rendang-beef-rendang-traditional-beef-stew-with-coconut-and-spice-from-padang-city-west-sumatra-indonesia_141793-3468.jpg?w=800&t=st=1700000000~exp=1700003600~hmac=1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef'
  },
  {
    id: 2,
    name: 'Gudeg',
    region: 'Yogyakarta',
    description: 'Olahan nangka muda dengan kuah santan dan gula jawa',
    position: [-7.80, 110.36],
    benefits: 'Sumber karbohidrat, Mengandung protein nabati, Kaya serat',
    image: 'https://img.freepik.com/free-photo/gudeg-jogja-traditional-javanese-dish-jackfruit-stew_141793-3482.jpg?w=800&t=st=1700000000~exp=1700003600~hmac=1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef'
  },
  {
    id: 3,
    name: 'Papeda',
    region: 'Papua',
    description: 'Bubur sagu khas Papua yang disajikan dengan ikan kuah kuning',
    position: [-4.27, 138.08],
    benefits: 'Rendah lemak, Sumber karbohidrat kompleks, Mudah dicerna',
    image: 'https://img.freepik.com/free-photo/papeda-papuan-sago-porridge-with-yellow-soup_141793-3501.jpg?w=800&t=st=1700000000~exp=1700003600~hmac=1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef'
  },
  {
    id: 4,
    name: 'Pempek',
    region: 'Sumatera Selatan',
    description: 'Olahan ikan dan sagu dengan kuah cuko yang khas',
    position: [-2.99, 104.75],
    benefits: 'Kaya protein ikan, Sumber karbohidrat, Mengandung omega-3',
    image: 'https://img.freepik.com/free-photo/pempek-palembang-indonesian-fish-cake-served-with-sweet-sour-sauce_141793-3495.jpg?w=800&t=st=1700000000~exp=1700003600~hmac=1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef'
  }
];

// Fungsi untuk mendapatkan ikon kustom berdasarkan nama makanan
const getCustomIcon = (foodName) => {
  return createCustomIcon(foodName);
};

const FoodMap = () => {
  const navigate = useNavigate();
  const [regionFoods, setRegionFoods] = useState(initialFoodData);
  const [showAddForm, setShowAddForm] = useState(false);
  const [selectedPosition, setSelectedPosition] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('semua');
  const [filteredFoods, setFilteredFoods] = useState(initialFoodData);
  
  // Extract unique regions for category filter
  const categories = ['semua', ...new Set(initialFoodData.map(food => food.region))];
  const fileInputRef = useRef(null);
  const mapRef = useRef(null);

  // Filter foods based on search query and category
  useEffect(() => {
    let filtered = [...regionFoods];
    
    // Apply category filter
    if (selectedCategory !== 'semua') {
      filtered = filtered.filter(food => food.region === selectedCategory);
    }
    
    // Apply search query filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(food => {
        const searchFields = [
          food.name,
          food.region,
          food.description,
          food.benefits || ''
        ];
        
        return searchFields.some(field => 
          field.toLowerCase().includes(query)
        );
      });
    }
    
    setFilteredFoods(filtered);
    
    // Fly to the first result if there are any matches
    if (filtered.length > 0 && mapRef.current) {
      mapRef.current.flyTo(filtered[0].position, 10, {
        duration: 1
      });
    }
  }, [searchQuery, selectedCategory, regionFoods]);

  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // Handle search form submission
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    // The fly-to is now handled in the useEffect above
  };

  // Form state
  const [formData, setFormData] = useState({
    name: '',
    region: 'Sumatera Barat',
    description: '',
    benefits: '',
    position: [0, 0],
    image: null
  });

  // Fix for default marker icons
  useEffect(() => {
    delete L.Icon.Default.prototype._getIconUrl;
    L.Icon.Default.mergeOptions({
      iconRetinaUrl: markerIcon2x,
      iconUrl: markerIcon,
      shadowUrl: markerShadow,
    });
  }, []);

  // Handle map click
  const handleMapClick = (latlng) => {
    if (showAddForm) {
      setSelectedPosition([latlng.lat, latlng.lng]);
      setFormData(prev => ({
        ...prev,
        position: [latlng.lat, latlng.lng]
      }));
    }
  };

  // Handle form input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle image upload
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
        setFormData(prev => ({
          ...prev,
          image: reader.result
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name) return;
    
    // Set default position to Indonesia center if none selected
    const position = selectedPosition || [-2.5, 118.0];
    
    const newFood = {
      id: Date.now(),
      name: formData.name,
      region: formData.region,
      description: formData.description,
      benefits: formData.benefits,
      image: formData.image,
      position: position
    };
    
    setRegionFoods(prev => [...prev, newFood]);
    setShowAddForm(false);
    resetForm();
  };

  // Reset form
  const resetForm = () => {
    setFormData({
      name: '',
      region: 'Sumatera Barat',
      description: '',
      benefits: '',
      position: [0, 0],
      image: null
    });
    setPreviewImage(null);
    setSelectedPosition(null);
  };

  // Toggle add form
  // Reset search when opening add form
  const toggleAddForm = () => {
    setSearchQuery('');
    setShowAddForm(!showAddForm);
    if (!showAddForm) {
      resetForm();
    }
  };

  // Map center and zoom
  const mapCenter = [-2.5, 118.0];
  const zoom = 5;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-green-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Back Button */}
        <button 
          onClick={() => navigate('/food')}
          className="group flex items-center text-[#196D0D] hover:text-green-800 mb-8 transition-colors duration-200"
        >
          <div className="flex items-center justify-center w-10 h-10 rounded-full bg-green-50 group-hover:bg-green-100 mr-3 transition-colors duration-200">
            <ArrowLeft className="h-5 w-5" />
          </div>
          <span className="font-medium text-base">Back to Food List</span>
        </button>
        
        {/* Header */}
        <motion.div 
          className="mb-10 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 2 }}
        >
          <div className="space-y-3">
            <motion.h1 
              className="text-3xl sm:text-4xl md:text-5xl font-semibold text-gray-800 tracking-tight"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 2, delay: 0.2 }}
            >
              Traditional Food <span className="text-[#196D0D]">Map</span>
            </motion.h1>
            <motion.p 
              className="text-gray-700 text-lg sm:text-xl max-w-3xl mx-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 2, delay: 0.4 }}
            >
              Discover and share culinary delights from across Indonesia's diverse regions
            </motion.p>
          </div>
        </motion.div>
        
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          {/* Search and Add Button */}
          <div className="p-6 border-b border-green-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
              <div className="relative flex-1">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-green-600" />
                </div>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={handleSearchChange}
                  className="block w-full pl-10 pr-3 py-3 border border-green-200 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="Search food..."
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery('')}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    aria-label="Hapus pencarian"
                  >
                    <X className="h-4 w-4 text-gray-400 hover:text-gray-600" />
                  </button>
                )}
              </div>
              
              <div className="relative">
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="block w-full pl-3 pr-10 py-3 border border-green-200 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent appearance-none"
                >
                  {categories.map(category => (
                    <option key={category} value={category}>
                      {category === 'semua' ? 'Semua Daerah' : category}
                    </option>
                  ))}
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 011.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
            </div>
            <button
              onClick={toggleAddForm}
              className="w-full sm:w-auto flex items-center justify-center gap-3 bg-[#196D0D] hover:bg-green-700 text-white px-6 py-3 rounded-xl transition-all duration-300 transform hover:scale-105"
            >
              <PlusCircle size={20} />
              <span className="font-medium">Add Food</span>
            </button>
          </div>
          
          {/* Map Container */}
          <div className="relative">
            <MapContainer 
              ref={mapRef}
              center={mapCenter} 
              zoom={zoom} 
              style={{
                ...mapContainerStyle,
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)'
              }}
              scrollWheelZoom={true}
              className="z-0 rounded-xl"
            >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        
        <LocationMarker onLocationSelect={handleMapClick} />
        
        {filteredFoods.map((food) => {
          const customIcon = getCustomIcon(food.name);
          return (
            <Marker 
              key={food.id} 
              position={food.position}
              icon={customIcon}
            >
              <Popup className="custom-popup">
                <div className="p-3 max-w-xs">
                  <div className="flex items-center mb-2">
                    <span className="text-2xl mr-2">{getFoodEmoji(food.name)}</span>
                    <h3 className="font-bold text-lg text-gray-800">{food.name}</h3>
                  </div>
                  <div className="bg-blue-50 p-2 rounded-lg mb-2">
                    <p className="text-sm text-gray-600">📍 {food.region}</p>
                    <p className="mt-1 text-gray-700">{food.description}</p>
                  </div>
                  {food.benefits && (
                    <div className="bg-green-50 p-2 rounded-lg">
                      <p className="font-semibold text-green-700 flex items-center">
                        <Info size={16} className="mr-1" /> Manfaat:
                      </p>
                      <ul className="list-disc list-inside text-sm text-gray-700 mt-1">
                        {food.benefits.split(', ').map((benefit, idx) => (
                          <li key={idx} className="ml-4">{benefit}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {food.image && (
                    <img 
                      src={food.image} 
                      alt={food.name} 
                      className="mt-3 w-full h-32 object-cover rounded-lg shadow-sm"
                    />
                  )}
                </div>
              </Popup>
            </Marker>
          );
        })}
            </MapContainer>
            
            {/* Map Controls */}
            <div className="absolute top-4 right-4 z-[1000] flex flex-col gap-2">
              <button 
                onClick={() => mapRef.current?.flyTo(mapCenter, zoom)}
                className="bg-white p-2.5 rounded-full shadow-md hover:bg-gray-50 transition-colors"
                aria-label="Reset view"
              >
                <MapPin className="h-6 w-6 text-green-600" />
              </button>
            </div>
          </div>
          
          {/* Food List Section */}
          <div className="p-8">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-3xl font-bold text-gray-800">Daftar Makanan</h2>
              <div className="text-gray-600 flex items-center">
                {selectedCategory !== 'semua' && (
                  <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full mr-2">
                    {selectedCategory}
                  </span>
                )}
                <span>
                  {filteredFoods.length} {filteredFoods.length === 1 ? 'hasil' : 'hasil'}
                </span>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredFoods.map((food) => (
                <div key={food.id} className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                  <div className="h-32 bg-gradient-to-r from-green-50 to-green-100 flex items-center justify-center">
                    <div className="bg-white p-4 rounded-full shadow-md transform hover:scale-110 transition-transform duration-300">
                      <span className="text-4xl" role="img" aria-label={food.name}>
                        {getFoodEmoji(food.name.toLowerCase())}
                      </span>
                    </div>
                  </div>
                  <div className="p-4">
                    <div className="flex justify-between items-start">
                      <h3 className="text-lg font-bold text-gray-800">{food.name}</h3>
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-50 text-green-700 border border-green-100">
                        {food.region}
                      </span>
                    </div>
                    <p className="mt-2 text-sm text-gray-600 line-clamp-2">{food.description}</p>
                    
                    {food.benefits && (
                      <div className="mt-3 bg-green-50 p-3 rounded-lg">
                        <h4 className="text-xs font-semibold text-green-700 flex items-center mb-1">
                          <Info className="h-3 w-3 mr-1" /> Manfaat
                        </h4>
                        <p className="text-sm text-gray-700 line-clamp-2">{food.benefits}</p>
                      </div>
                    )}
                    
                    <div className="mt-4 flex justify-between items-center">
                      <div className="flex items-center text-sm text-gray-500">
                        <MapPin className="h-4 w-4 mr-1 text-green-600" />
                        <span>
                          {food.position[0].toFixed(4)}, {food.position[1].toFixed(4)}
                        </span>
                      </div>
                      <button 
                        onClick={() => {
                          if (mapRef.current) {
                            mapRef.current.flyTo(food.position, 10, {
                              duration: 1
                            });
                          }
                        }}
                        className="text-sm bg-green-600 hover:bg-green-700 text-white px-3 py-1.5 rounded-lg font-medium flex items-center transition-colors duration-200"
                      >
                        <MapPin className="h-3.5 w-3.5 mr-1" /> Lihat di Peta
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      {/* Add Food Form Modal */}
      {showAddForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[1000] p-4">
          <div className="bg-white rounded-xl p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-gray-800">Add New Food</h2>
              <button 
                onClick={toggleAddForm}
                className="text-gray-500 hover:text-gray-700"
              >
                <X size={20} />
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Image Upload */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Gambar Makanan
                </label>
                <div 
                  onClick={() => fileInputRef.current.click()} 
                  className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md cursor-pointer hover:border-[#196D0D] transition-colors"
                >
                  <div className="space-y-1 text-center">
                    {previewImage ? (
                      <img 
                        src={previewImage} 
                        alt="Preview" 
                        className="mx-auto h-32 w-32 object-cover rounded-md"
                      />
                    ) : (
                      <>
                        <div className="flex justify-center">
                          <Upload className="mx-auto h-12 w-12 text-gray-400" />
                        </div>
                        <div className="flex text-sm text-gray-600">
                          <span className="relative cursor-pointer bg-white rounded-md font-medium text-[#196D0D] hover:text-green-500">
                            Unggah gambar
                          </span>
                          <p className="pl-1">atau drag and drop</p>
                        </div>
                        <p className="text-xs text-gray-500">PNG, JPG, GIF hingga 10MB</p>
                      </>
                    )}
                    <input
                      ref={fileInputRef}
                      id="file-upload"
                      name="file-upload"
                      type="file"
                      className="sr-only"
                      onChange={handleImageUpload}
                      accept="image/*"
                    />
                  </div>
                </div>
              </div>
              
              {/* Food Name */}
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  Nama Makanan
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#196D0D] focus:border-[#196D0D]"
                  placeholder="Contoh: Rendang"
                  required
                />
              </div>
              
              {/* Region */}
              <div>
                <label htmlFor="region" className="block text-sm font-medium text-gray-700">
                  Daerah Asal
                </label>
                <select
                  id="region"
                  name="region"
                  value={formData.region}
                  onChange={handleInputChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#196D0D] focus:border-[#196D0D]"
                  required
                >
                  <option value="Sumatera Barat">Sumatera Barat</option>
                  <option value="Jawa Barat">Jawa Barat</option>
                  <option value="Jawa Tengah">Jawa Tengah</option>
                  <option value="Jawa Timur">Jawa Timur</option>
                  <option value="Bali">Bali</option>
                  <option value="Papua">Papua</option>
                  <option value="Kalimantan">Kalimantan</option>
                  <option value="Sulawesi">Sulawesi</option>
                </select>
              </div>
              
              {/* Description */}
              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                  Deskripsi
                </label>
                <textarea
                  id="description"
                  name="description"
                  rows={3}
                  value={formData.description}
                  onChange={handleInputChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#196D0D] focus:border-[#196D0D]"
                  placeholder="Deskripsi singkat tentang makanan ini"
                />
              </div>
              
              {/* Benefits */}
              <div>
                <label htmlFor="benefits" className="block text-sm font-medium text-gray-700">
                  Manfaat Kesehatan (pisahkan dengan koma)
                </label>
                <input
                  type="text"
                  name="benefits"
                  id="benefits"
                  value={formData.benefits}
                  onChange={handleInputChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#196D0D] focus:border-[#196D0D]"
                  placeholder="Contoh: Kaya protein, Sumber energi, Rendah lemak"
                />
              </div>
              
              {/* Location Info */}
              <div className="p-3 bg-gray-50 rounded-md border border-gray-200">
                <div className="flex items-center text-sm text-gray-600 mb-2">
                  <MapPin className="w-4 h-4 mr-1 text-[#196D0D]" />
                  <span>Lokasi: </span>
                  {selectedPosition ? (
                    <span className="ml-1 font-medium">
                      {selectedPosition[0].toFixed(4)}, {selectedPosition[1].toFixed(4)}
                    </span>
                  ) : (
                    <span className="ml-1 text-amber-600">Klik pada peta untuk memilih lokasi</span>
                  )}
                </div>
                <p className="text-xs text-gray-500">
                  Klik pada peta untuk menandai lokasi makanan ini
                </p>
              </div>
              
              {/* Action Buttons */}
              <div className="flex justify-end space-x-3 pt-2">
                <button
                  type="button"
                  onClick={toggleAddForm}
                  className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#196D0D] hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                >
                  Simpan Makanan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
    
  );
};

export default FoodMap;
