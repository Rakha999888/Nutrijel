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
  
  // Fungsi untuk mengecek apakah pertanyaan valid
  const isValidQuestion = (question) => {
    const lowerQuestion = question.toLowerCase().trim();
    return Object.keys(botResponses).some(key => key.toLowerCase() === lowerQuestion);
  };

  // Jawaban untuk pertanyaan yang sering diajukan
  const botResponses = {
    'seberapa penting peran kalori dalam diet menurut anda?': 'Hai! 😊 Kalori itu seperti bahan bakar untuk tubuh kita. Setiap aktivitas yang kita lakukan membutuhkan kalori, mulai dari bernapas hingga berolahraga. Tapi ingat, kualitas kalori juga penting lho! Misalnya, 100 kalori dari alpukat lebih bergizi dibanding 100 kalori dari permen. Jadi, pilihlah sumber kalori yang kaya nutrisi ya! 🥑🍎',
    'seberapa besar peran air putih dalam diet anda?': 'Halo! 💧 Air putih itu seperti superhero untuk tubuh kita! Dia membantu mencerna makanan, menyerap nutrisi, dan membuang racun. Tahukah kamu? Kadang kita salah mengira haus dengan lapar, lho! Jadi, minum air yang cukup bisa bantu ngontrol nafsu makan juga. Yuk, jangan lupa minum 8 gelas sehari! 🚰✨',
    'apakah anda pernah mengalami efek samping dari diet tertentu?': 'Hai! Sebagai asisten digital, saya tidak punya pengalaman pribadi. Tapi saya tahu diet yang terlalu ketat bisa bikin lemas, pusing, atau gangguan pencernaan. Itu sebabnya penting banget konsultasi ke ahli gizi sebelum mulai diet tertentu. Ingat, diet yang sehat adalah yang berkelanjutan dan sesuai kebutuhan tubuhmu! 💪😊',
    'apa itu gizi seimbang?': 'Halo teman sehat! 🌟 Gizi seimbang itu seperti tim yang kompak di piring makan kita. Ada karbohidrat (nasi/roti), protein (ikan/ayam/tempe), lemak sehat (alpukat/kacang), vitamin, dan mineral (sayur & buah), serta jangan lupa minum air putih! Porsinya disesuaikan dengan usia, jenis kelamin, dan aktivitas kita. Simple kan? 🍚🍗🥦',
    'mengapa tubuh membutuhkan serat?': 'Hai! Serat itu kayak sapu alami untuk usus kita lho! 🧹✨ Dia bantu:\n• Melancarkan BAB\n• Bikin kenyang lebih lama\n• Jaga kadar gula darah\n• Turunkan kolesterol\n• Jaga berat badan ideal\n\nDapatkan serat dari buah, sayur, dan biji-bijian ya! 🍎🥦🌾',
    'apa perbedaan antara vitamin dan mineral': 'Hai! Yuk kenalan dengan vitamin dan mineral! 😊\n\nVitamin:\n• Senyawa organik\n• Bisa rusak oleh panas/cahaya\n• Contoh: Vitamin C (jeruk), Vitamin D (sinar matahari)\n\nMineral:\n• Senyawa anorganik\n• Tetap stabil\n• Contoh: Kalsium (susu), Zat besi (daging merah)\n\nKeduanya penting untuk tubuh kita, tapi dibutuhkan dalam jumlah yang berbeda. Yuk, penuhi keduanya! 💊🍊🥛'
  };

  // Notifikasi acak dengan pertanyaan yang bisa dijawab
  const notifications = [
    'Tanyakan: Seberapa penting peran kalori dalam diet?',
    'Tanyakan: Mengapa tubuh membutuhkan serat?',
    'Tanyakan: Apa itu gizi seimbang?',
    'Tanyakan: Apa perbedaan vitamin dan mineral?',
    'Tanyakan: Seberapa besar peran air putih dalam diet?',
    'Tanyakan: Efek samping dari diet tertentu?'
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
      const lowerInput = inputMessage.toLowerCase().trim();
      let responseText = 'Maaf, saya hanya bisa menjawab pertanyaan yang sudah ditentukan. Berikut beberapa pertanyaan yang bisa saya jawab:';
      
      // Cek apakah pertanyaan sesuai dengan yang sudah ditentukan
      let questionFound = false;
      for (const [question, answer] of Object.entries(botResponses)) {
        if (lowerInput === question.toLowerCase()) {
          responseText = answer;
          questionFound = true;
          break;
        }
      }
      
      // Jika pertanyaan tidak ditemukan, tampilkan daftar pertanyaan yang bisa dijawab
      if (!questionFound) {
        responseText = 'Halo! Saya JellBot 🤖, asisten nutrisi Anda. \n\nSaat ini saya bisa membantu menjawab pertanyaan-pertanyaan berikut ini nih:\n\n' + 
                      faqs.map((faq, index) => `${index + 1}. ${faq}`).join('\n') + 
                      '\n\nCoba tanyakan salah satu pertanyaan di atas ya! 😊';
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
