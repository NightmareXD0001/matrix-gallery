
import React from 'react';
import ParticleBackground from '@/components/ParticleBackground';
import Header from '@/components/Header';
import SearchFilter from '@/components/SearchFilter';
import Gallery from '@/components/Gallery';

const Index: React.FC = () => {
  return (
    <div className="min-h-screen relative bg-matrix-black text-white">
      {/* Neural network particle animation background */}
      <ParticleBackground />
      
      {/* Main content */}
      <div className="container mx-auto px-4 py-8">
        {/* Header with logo */}
        <Header />
        
        <main>
          {/* Search and filter controls */}
          <SearchFilter />
          
          {/* Gallery grid */}
          <Gallery />
          
          {/* Status indicator - like a system uptime or connection status */}
          <div className="mt-8 flex justify-end">
            <div className="glass-panel px-4 py-2 inline-flex items-center text-sm">
              <div className="w-2 h-2 rounded-full bg-matrix-green animate-pulse mr-2"></div>
              <span className="text-matrix-green/80">System connection active</span>
              <span className="mx-2 text-matrix-green/50">|</span>
              <span className="font-mono text-matrix-green/70">8 files found</span>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Index;
