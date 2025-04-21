
import React, { useState, useEffect } from 'react';
import { Search, Gallery } from 'lucide-react';

const Header: React.FC = () => {
  const [glitchActive, setGlitchActive] = useState(false);
  
  // Periodically activate the glitch effect
  useEffect(() => {
    const glitchInterval = setInterval(() => {
      setGlitchActive(true);
      setTimeout(() => setGlitchActive(false), 200);
    }, 5000);
    
    return () => clearInterval(glitchInterval);
  }, []);

  return (
    <header className="relative z-10 glass-panel py-4 px-6 mb-8">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        <div className="flex items-center mb-4 md:mb-0">
          {/* Logo with glitch effect */}
          <div className="relative">
            <h1 
              className={`font-matrix text-3xl md:text-4xl font-bold text-white 
                         ${glitchActive ? 'animate-glitch' : ''}
                         flex items-center`}
            >
              <span className="mr-2 block transform -rotate-45">
                <Gallery size={32} className="text-matrix-green" />
              </span>
              <span className="relative">
                <span className="text-matrix-green">THE</span> MATRIX <span className="text-matrix-green">CLAN</span>
              </span>
            </h1>
            
            {/* Glitch overlay layers */}
            {glitchActive && (
              <>
                <h1 
                  className="font-matrix text-3xl md:text-4xl font-bold text-red-500/30
                            absolute top-0 left-0 transform translate-x-[2px] translate-y-[-2px]"
                >
                  <span className="mr-2 block transform -rotate-45">
                    <Gallery size={32} />
                  </span>
                  <span>THE MATRIX CLAN</span>
                </h1>
                <h1 
                  className="font-matrix text-3xl md:text-4xl font-bold text-blue-500/30
                            absolute top-0 left-0 transform translate-x-[-2px] translate-y-[2px]"
                >
                  <span className="mr-2 block transform -rotate-45">
                    <Gallery size={32} />
                  </span>
                  <span>THE MATRIX CLAN</span>
                </h1>
              </>
            )}
          </div>

          {/* Green horizontal bar under logo */}
          <div className="hidden md:block h-8 w-[1px] bg-matrix-green mx-4 animate-pulse"></div>
          
          {/* Tagline */}
          <p className="hidden md:block text-sm text-matrix-green/80 font-light tracking-wider">
            ACCESS LEVEL: SENTINEL
          </p>
        </div>
        
        {/* Navigation */}
        <nav>
          <div className="flex space-x-2">
            <button className="matrix-button">
              <Search size={16} />
              <span>Search Archives</span>
            </button>
            <button className="matrix-button">
              <span>Neural Interface</span>
            </button>
          </div>
        </nav>
      </div>
      
      {/* Digital bar with data stream effect */}
      <div className="absolute bottom-0 left-0 right-0 h-[2px] data-stream-bg"></div>
    </header>
  );
};

export default Header;
