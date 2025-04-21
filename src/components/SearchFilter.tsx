
import React from 'react';
import { Search } from 'lucide-react';

const SearchFilter: React.FC = () => {
  // Categories & expand/collapse logic removed since those buttons were just for fun, not functional

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
      </div>
    </div>
  );
};

export default SearchFilter;

