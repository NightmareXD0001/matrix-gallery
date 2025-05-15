
import React from 'react';
import { Maximize } from 'lucide-react';

interface ImageCardProps {
  src: string;
  alt: string;
  title: string;
  category?: string;
  onEnlarge?: () => void;
}

const ImageCard: React.FC<ImageCardProps> = ({ src, alt, title, category, onEnlarge }) => {
  const [isHovering, setIsHovering] = React.useState(false);

  return (
    <div 
      className="glass-panel image-frame overflow-hidden transition-all duration-500 
                transform hover:scale-[1.02] group"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {/* Image */}
      <div className="relative overflow-hidden h-40 sm:h-48 md:h-56 lg:h-64">
        <img 
          src={src} 
          alt={alt} 
          className="w-full h-full object-cover transition-transform duration-700
                   group-hover:scale-110"
        />
        
        {/* Overlay that appears on hover */}
        <div 
          className={`absolute inset-0 bg-gradient-to-t from-matrix-black via-transparent to-transparent 
                    flex flex-col justify-end p-3 transition-opacity duration-300
                    ${isHovering ? 'opacity-100' : 'opacity-0'}`}
        >
          {/* Only enlarge button kept */}
          <div className="flex justify-end space-x-2 mb-2">
            <button
              className="p-2 rounded-full bg-matrix-black/80 border border-matrix-green/50 text-matrix-green
                         hover:bg-matrix-green hover:text-matrix-black transition-colors duration-300"
              onClick={onEnlarge}
              aria-label="Enlarge image"
              type="button"
            >
              <Maximize size={16} />
            </button>
          </div>
        </div>

        {/* Technical frame overlay - always visible */}
        <div className="absolute inset-0 pointer-events-none">
          {/* Corner brackets */}
          <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-matrix-green/70"></div>
          <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-matrix-green/70"></div>
          <div className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-matrix-green/70"></div>
          <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-matrix-green/70"></div>
        </div>
      </div>
      
      {/* Card footer with info */}
      <div className="p-3 border-t border-matrix-green/30 bg-black/50">
        <div className="flex justify-between items-center">
          <h3 className="font-matrix text-sm text-white truncate">{title}</h3>
          {category && (
            <span className="text-xs px-2 py-1 bg-matrix-green/10 text-matrix-green rounded">
              {category}
            </span>
          )}
        </div>
      </div>

      {/* Animated glow effect on hover */}
      <div className={`absolute inset-0 pointer-events-none transition-opacity duration-500
                     ${isHovering ? 'opacity-100' : 'opacity-0'}`}>
        <div className="absolute inset-0 animate-pulse-glow rounded-lg"></div>
      </div>
    </div>
  );
};

export default ImageCard;
