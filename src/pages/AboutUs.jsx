  import React, { useRef, useCallback, forwardRef } from 'react';
  import HTMLFlipBook from 'react-pageflip';

  // Page component with forwardRef
  const Page = forwardRef(({ children, pageNumber, className = "" }, ref) => {
    return (
      <div className={`w-full h-full bg-white shadow-sm relative overflow-hidden ${className}`} ref={ref}>
        <div className="w-full h-full p-6 flex flex-col justify-center">
          {children}
        </div>
        {pageNumber && (
          <div className="absolute bottom-6 right-6 text-sm text-gray-400 font-medium bg-white/80 px-3 py-1 rounded-full">
            {pageNumber}
          </div>
        )}
      </div>
    );
  });

  const AboutUs = () => {
    const book = useRef();
    const onFlip = useCallback((e) => console.log('Current page: ' + e.data), []);

    return (
      <div className="min-h-screen bg-gradient-to-br from-green-100 via-yellow-50 to-orange-50 py-4 px-2 relative overflow-hidden flex items-center justify-center pt-35">
        {/* Custom CSS untuk mengatur bayangan flipbook */}
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
          
          /* Mengurangi bayangan saat flip */
          .flipbook-container .stf__parent .stf__block .stf__item.--left {
            box-shadow: 2px 0 8px rgba(0, 0, 0, 0.08) !important;
          }
          
          .flipbook-container .stf__parent .stf__block .stf__item.--right {
            box-shadow: -2px 0 8px rgba(0, 0, 0, 0.08) !important;
          }
          
          /* Bayangan halus untuk transisi flip */
          .flipbook-container .stf__parent .stf__block .stf__item.--active {
            box-shadow: 0 6px 20px rgba(0, 0, 0, 0.12) !important;
          }
        `}</style>

        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-orange-300/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-green-300/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 w-60 h-60 bg-yellow-300/5 rounded-full blur-3xl animate-pulse delay-500"></div>
        </div>

        <div className="max-w-6xl mx-auto text-center relative z-10">
          <h1 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-500 via-yellow-500 to-orange-500 mb-6">
            About NutriCheck
          </h1>
          <p className="text-lg text-gray-600 mb-8 leading-relaxed">
            Find answers to common questions about NutriCheck and how it can help you on your nutrition journey.
          </p>

          <div className="flex justify-center gap-4 mb-12">
            <button 
              onClick={() => book.current?.pageFlip().flipPrev()} 
              className="px-4 py-2 bg-gradient-to-r from-green-500 to-yellow-500 text-white rounded-2xl font-semibold transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105"
            >
              Previous
            </button>
            <button 
              onClick={() => book.current?.pageFlip().flipNext()} 
              className="px-4 py-2 bg-gradient-to-r from-yellow-500 to-orange-500 text-white rounded-2xl font-semibold transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105"
            >
              Next
            </button>
          </div>

          <div className="flex justify-center flipbook-container">
            <HTMLFlipBook
              width={400} 
              height={600} 
              size="fixed" 
              flippingTime={800}
              onFlip={onFlip} 
              ref={book}
              className="shadow-none"
              style={{
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)'
              }}
              usePortrait={false}
              startPage={0}
              drawShadow={true}
              maxShadowOpacity={0.3}
              shadowOpacity={0.2}
              showCover={false}
              mobileScrollSupport={true}
            >
              {/* Page 1 */}
              <Page>
                <div className="bg-gradient-to-br from-green-50 to-yellow-50 h-full flex flex-col justify-center rounded-lg overflow-hidden">
                  <div className="w-full h-60 bg-gradient-to-br from-green-200 to-yellow-200 flex items-center justify-center mb-4">
                    <span className="text-6xl">🚀</span>
                  </div>
                  <div className="p-4">
                    <h2 className="text-2xl font-bold text-green-700 mb-4">Getting Started</h2>
                    <p className="text-lg text-gray-700 leading-relaxed">Learn how to create your account and start tracking your nutrition effortlessly!</p>
                  </div>
                </div>
              </Page>

              {/* Page 2 */}
              <Page>
                <div className="bg-gradient-to-br from-yellow-50 to-orange-50 h-full flex flex-col justify-center rounded-lg overflow-hidden">
                  <div className="w-full h-60 bg-gradient-to-br from-yellow-200 to-orange-200 flex items-center justify-center mb-4">
                    <span className="text-6xl">📱</span>
                  </div>
                  <div className="p-4">
                    <h2 className="text-2xl font-bold text-orange-700 mb-4">Food Tracking</h2>
                    <p className="text-lg text-gray-700 leading-relaxed">Discover how to add your favorite foods and track your nutritional intake.</p>
                  </div>
                </div>
              </Page>

              {/* Page 3 */}
              <Page>
                <div className="bg-gradient-to-br from-orange-50 to-green-50 h-full flex flex-col justify-center rounded-lg overflow-hidden">
                  <div className="w-full h-60 bg-gradient-to-br from-orange-200 to-green-200 flex items-center justify-center mb-4">
                    <span className="text-6xl">🎯</span>
                  </div>
                  <div className="p-4">
                    <h2 className="text-2xl font-bold text-green-700 mb-4">Goals & Plans</h2>
                    <p className="text-lg text-gray-700 leading-relaxed">Set your nutrition goals and explore our meal recommendations tailored for you.</p>
                  </div>
                </div>
              </Page>

              {/* Page 4 */}
              <Page>
                <div className="bg-gradient-to-br from-green-50 to-yellow-50 h-full flex flex-col justify-center rounded-lg overflow-hidden">
                  <div className="w-full h-60 bg-gradient-to-br from-green-200 to-yellow-200 flex items-center justify-center mb-4">
                    <span className="text-6xl">⭐</span>
                  </div>
                  <div className="p-4">
                    <h2 className="text-2xl font-bold text-yellow-700 mb-4">Premium Features</h2>
                    <p className="text-lg text-gray-700 leading-relaxed">Unlock advanced features for a complete nutrition analysis and personalized advice.</p>
                  </div>
                </div>
              </Page>

              {/* Page 5 */}
              <Page>
                <div className="bg-gradient-to-br from-yellow-50 to-orange-50 h-full flex flex-col justify-center rounded-lg overflow-hidden">
                  <div className="w-full h-60 bg-gradient-to-br from-yellow-200 to-orange-200 flex items-center justify-center mb-4">
                    <span className="text-6xl">💬</span>
                  </div>
                  <div className="p-4">
                    <h2 className="text-2xl font-bold text-orange-700 mb-4">Technical Support</h2>
                    <p className="text-lg text-gray-700 leading-relaxed">Need help? Get in touch with our support team for any inquiries or issues.</p>
                  </div>
                </div>
              </Page>

              {/* Page 6 */}
              <Page>
                <div className="bg-gradient-to-br from-green-600 via-yellow-600 to-orange-600 text-white h-full flex flex-col justify-center items-center relative overflow-hidden rounded-lg">
                  <div className="absolute inset-0 bg-black/10"></div>
                  <div className="relative z-10 text-center">
                    <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center mb-6 mx-auto backdrop-blur-sm">
                      <span className="text-3xl">❓</span>
                    </div>
                    <h2 className="text-4xl font-bold mb-6 drop-shadow-lg">Still Have Questions?</h2>
                    <p className="text-lg font-light opacity-90 mb-8 max-w-xs mx-auto leading-relaxed">
                      We're here to help! Contact our support team for personalized assistance.
                    </p>
                  </div>
                </div>
              </Page>
            </HTMLFlipBook>
          </div>
        </div>
      </div>
    );
  };

  export default AboutUs;