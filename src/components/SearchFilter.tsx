
import React, { useState } from 'react';
import { Search, Plus, Minus } from 'lucide-react';

const SearchFilter: React.FC = () => {
  const [expanded, setExpanded] = useState(false);
  
  const categories = [
    'All Files', 'Training Sims', 'System Data', 'Sentinel Archives', 'Personal Files'
  ];

  return (
    <div className="glass-panel mb-8">
      <div className="flex items-center p-4">
        <div 
          className="flex items-center flex-grow bg-black/50 border border-matrix-green/30 
                   rounded px-3 py-2 text-white focus-within:border-matrix-green"
        >
          <Search size={18} className="text-matrix-green mr-2" />
          <input 
            type="text" 
            placeholder="Search Matrix Archives..."
            className="bg-transparent border-none outline-none w-full 
                     placeholder:text-gray-500 text-sm"
          />
        </div>
        
        <button 
          className="ml-4 p-2 rounded bg-matrix-black border border-matrix-green/50 
                   text-matrix-green hover:bg-matrix-green hover:text-matrix-black"
          onClick={() => setExpanded(!expanded)}
        >
          {expanded ? <Minus size={18} /> : <Plus size={18} />}
        </button>
      </div>
      
      {expanded && (
        <div className="px-4 pb-4 pt-0">
          <div className="h-[1px] bg-matrix-green/30 mb-4"></div>
          
          <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
            {categories.map((category, index) => (
              <button 
                key={index}
                className="text-sm px-3 py-2 rounded border border-matrix-green/30
                         hover:bg-matrix-green/20 transition-colors duration-200
                         text-matrix-green"
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchFilter;
