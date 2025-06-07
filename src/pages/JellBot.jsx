import React, { useState, useEffect, useRef } from 'react';
import { FiMessageSquare, FiX, FiSend, FiBell, FiBellOff } from 'react-icons/fi';

const JellBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { id: 1, sender: 'bot', text: 'Halo! Saya JellBot, asisten nutrisi Anda. Ada yang bisa saya bantu?' }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [showNotification, setShowNotification] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const messagesEndRef = useRef(null);
  const notificationTimer = useRef(null);

  // Daftar pertanyaan yang sering diajukan
  const faqs = [
    'Seberapa penting peran kalori dalam diet menurut Anda?',
    'Seberapa besar peran air putih dalam diet Anda?',
    'Apakah Anda pernah mengalami efek samping dari diet tertentu?',
    'Apa itu gizi seimbang?',
    'Mengapa tubuh membutuhkan serat?',
    'Apa perbedaan antara vitamin dan mineral?'
  ];

  // Jawaban untuk pertanyaan yang sering diajukan
  const botResponses = {
    'seberapa penting peran kalori dalam diet menurut anda?': 'Kalori sangat penting dalam diet karena menentukan energi yang kita dapatkan dari makanan. Keseimbangan antara asupan dan pengeluaran kalori mempengaruhi berat badan. Namun, kualitas kalori juga penting - 100 kalori dari sayuran lebih bernutrisi daripada 100 kalori dari gula.',
    'seberapa besar peran air putih dalam diet anda?': 'Air putih sangat penting dalam diet karena membantu pencernaan, penyerapan nutrisi, dan pembuangan racun. Minum cukup air juga bisa membantu mengendalikan nafsu makan dan mencegah makan berlebihan.',
    'apakah anda pernah mengalami efek samping dari diet tertentu?': 'Sebagai AI, saya tidak memiliki pengalaman pribadi. Namun, diet yang terlalu ketat atau tidak seimbang seringkali menimbulkan efek samping seperti lemas, pusing, atau masalah pencernaan. Selalu konsultasikan dengan ahli gizi sebelum memulai diet tertentu.',
    'apa itu gizi seimbang?': 'Gizi seimbang adalah susunan makanan sehari-hari yang mengandung zat gizi dalam jenis dan jumlah yang sesuai dengan kebutuhan tubuh. Ini termasuk karbohidrat, protein, lemak, vitamin, mineral, dan air dalam porsi yang tepat.',
    'mengapa tubuh membutuhkan serat?': 'Tubuh membutuhkan serat untuk melancarkan pencernaan, mencegah sembelit, menurunkan kolesterol, mengontrol gula darah, dan membantu menjaga berat badan ideal. Serat juga memberikan rasa kenyang lebih lama.',
    'apa perbedaan antara vitamin dan mineral': 'Vitamin adalah senyawa organik yang bisa dipecah oleh panas, udara, atau asam, sementara mineral adalah senyawa anorganik yang mempertahankan struktur kimianya. Tubuh membutuhkan vitamin dan mineral dalam jumlah yang berbeda-beda untuk berfungsi dengan baik.'
  };

  // Notifikasi acak
  const notifications = [
    'Ingin tahu cara memulai diet sehat? Tanyakan pada JellBot!',
    'Jangan lupa minum air putih yang cukup hari ini! 💧',
    'Sudah makan buah dan sayur hari ini?',
    'Ingin tahu lebih banyak tentang gizi seimbang?',
    'JellBot siap membantu pertanyaan nutrisi Anda!',
    'Jangan lupa untuk berolahraga secara teratur!'
  ];

  // Tampilkan notifikasi acak setiap 10 detik
  useEffect(() => {
    if (!isMuted) {
      notificationTimer.current = setInterval(() => {
        if (!isOpen) {
          setShowNotification(true);
          setTimeout(() => setShowNotification(false), 5000);
        }
      }, 10000);
    }

    return () => {
      if (notificationTimer.current) {
        clearInterval(notificationTimer.current);
      }
    };
  }, [isOpen, isMuted]);

  // Auto-scroll ke pesan terbaru
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    // Tambahkan pesan pengguna
    const userMessage = {
      id: messages.length + 1,
      sender: 'user',
      text: inputMessage
    };

    setMessages([...messages, userMessage]);
    setInputMessage('');

    // Respon otomatis
    setTimeout(() => {
      const lowerInput = inputMessage.toLowerCase();
      let responseText = 'Maaf, saya tidak mengerti pertanyaan Anda. Bisakah Anda menjelaskan lebih lanjut?';
      
      // Cocokkan pertanyaan dengan respons yang ada
      for (const [question, answer] of Object.entries(botResponses)) {
        if (lowerInput.includes(question.split(' ')[0])) { // Cek kata kunci pertama
          responseText = answer;
          break;
        }
      }

      const botMessage = {
        id: messages.length + 2,
        sender: 'bot',
        text: responseText
      };

      setMessages(prev => [...prev, botMessage]);
    }, 1000);
  };

  const handleQuickQuestion = (question) => {
    setInputMessage(question);
    // Fokus ke input setelah state diupdate
    setTimeout(() => {
      document.getElementById('message-input')?.focus();
    }, 0);
  };

  const toggleMute = (e) => {
    e.stopPropagation();
    setIsMuted(!isMuted);
    if (!isMuted && notificationTimer.current) {
      clearInterval(notificationTimer.current);
    }
  };

  // Dapatkan notifikasi acak
  const randomNotification = notifications[Math.floor(Math.random() * notifications.length)];

  return (
    <>
      {/* Notifikasi */}
      {showNotification && !isOpen && (
        <div 
          className="fixed bottom-24 right-6 bg-white p-4 rounded-lg shadow-xl max-w-xs z-50 animate-bounce cursor-pointer"
          onClick={() => {
            setShowNotification(false);
            setIsOpen(true);
          }}
        >
          <div className="flex items-start">
            <div className="flex-shrink-0">
              <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                <img 
                  src="/assets/image/logo.png" 
                  alt="JellBot" 
                  className="w-8 h-8 rounded-full"
                />
              </div>
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-900">JellBot</p>
              <p className="text-sm text-gray-500">{randomNotification}</p>
            </div>
            <button 
              onClick={(e) => {
                e.stopPropagation();
                setShowNotification(false);
              }} 
              className="ml-auto text-gray-400 hover:text-gray-500"
            >
              <FiX size={18} />
            </button>
          </div>
        </div>
      )}

      {/* Tombol JellBot */}
      <div className="fixed bottom-6 right-6 z-50">
        <div className="relative">
          {!isOpen ? (
            <button
              onClick={() => {
                setIsOpen(true);
                setShowNotification(false);
              }}
              className="w-16 h-16 rounded-full bg-green-500 text-white flex items-center justify-center shadow-lg hover:bg-green-600 transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
            >
              <img 
                src="/assets/image/logo.png" 
                alt="JellBot" 
                className="w-8 h-8 object-contain"
              />
            </button>
          ) : (
            <div className="w-80 h-[500px] bg-white rounded-t-xl shadow-xl flex flex-col overflow-hidden">
              {/* Header */}
              <div className="bg-green-500 text-white p-4 flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center mr-2 overflow-hidden">
                    <img 
                      src="/assets/image/logo.png" 
                      alt="JellBot" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="font-semibold">JellBot Asisten Nutrisi</h3>
                </div>
                <div className="flex items-center space-x-2">
                  <button 
                    onClick={toggleMute}
                    className="p-1 rounded-full hover:bg-green-600"
                    title={isMuted ? 'Nyalakan notifikasi' : 'Matikan notifikasi'}
                  >
                    {isMuted ? <FiBellOff size={18} /> : <FiBell size={18} />}
                  </button>
                  <button 
                    onClick={() => setIsOpen(false)}
                    className="p-1 rounded-full hover:bg-green-600"
                  >
                    <FiX size={20} />
                  </button>
                </div>
              </div>

              {/* Pesan */}
              <div className="flex-1 p-4 overflow-y-auto bg-gray-50">
                {messages.map((message) => (
                  <div 
                    key={message.id} 
                    className={`mb-4 flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div 
                      className={`max-w-[80%] rounded-lg p-3 ${message.sender === 'user' 
                        ? 'bg-green-500 text-white rounded-br-none' 
                        : 'bg-white text-gray-800 border border-gray-200 rounded-bl-none'}`}
                    >
                      <p className="text-sm">{message.text}</p>
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>

              {/* Quick Questions */}
              <div className="p-2 bg-gray-100 border-t border-gray-200">
                <div className="flex overflow-x-auto space-x-2 pb-2">
                  {faqs.slice(0, 3).map((faq, index) => (
                    <button
                      key={index}
                      onClick={() => handleQuickQuestion(faq)}
                      className="flex-shrink-0 bg-white text-xs text-gray-700 px-3 py-1.5 rounded-full border border-gray-300 hover:bg-gray-50"
                    >
                      {faq.length > 30 ? `${faq.substring(0, 30)}...` : faq}
                    </button>
                  ))}
                </div>
              </div>

              {/* Input Pesan */}
              <div className="p-3 border-t border-gray-200 bg-white">
                <form onSubmit={handleSendMessage} className="flex space-x-2">
                  <input
                    id="message-input"
                    type="text"
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    placeholder="Ketik pesan..."
                    className="flex-1 border border-gray-300 rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                  <button
                    type="submit"
                    className="w-10 h-10 rounded-full bg-green-500 text-white flex items-center justify-center hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                  >
                    <FiSend size={18} />
                  </button>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default JellBot;
