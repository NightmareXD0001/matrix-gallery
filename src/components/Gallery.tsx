
import React, { useState, useEffect } from "react";
import ImageCard from "./ImageCard";
import ImageViewerDialog from "./ImageViewerDialog";

// Sample gallery data
const galleryItems = [
  { 
    id: 1, 
    src: 'https://images.unsplash.com/photo-1518770660439-4636190af475', 
    alt: 'Circuit board closeup', 
    title: 'Neural Interface v3.2', 
    category: 'Technology' 
  },
  { 
    id: 2, 
    src: 'https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7', 
    alt: 'Code on screen', 
    title: 'Source Code: Matrix', 
    category: 'Code' 
  },
  { 
    id: 3, 
    src: 'https://images.unsplash.com/photo-1605810230434-7631ac76ec81', 
    alt: 'Display screens', 
    title: 'Sentinel Monitoring', 
    category: 'Security' 
  },
  { 
    id: 4, 
    src: 'https://images.unsplash.com/photo-1439337153520-7082a56a81f4', 
    alt: 'Glass roof architecture', 
    title: 'Construct Framework', 
    category: 'Architecture' 
  },
  { 
    id: 5, 
    src: 'https://images.unsplash.com/photo-1494891848038-7bd202a2afeb', 
    alt: 'Black and red building', 
    title: 'Training Facility', 
    category: 'Locations' 
  },
  { 
    id: 6, 
    src: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31', 
    alt: 'Futuristic circuit', 
    title: 'Mainframe Access', 
    category: 'Technology' 
  },
  { 
    id: 7, 
    src: 'https://images.unsplash.com/photo-1639322537228-f710d846310a', 
    alt: 'Digital art', 
    title: 'Simulation Data', 
    category: 'Virtual' 
  },
  { 
    id: 8, 
    src: 'https://images.unsplash.com/photo-1629757509637-7c99379d5d47', 
    alt: 'Abstract lights', 
    title: 'Data Streams', 
    category: 'Abstract' 
  }
];

const Gallery: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState<typeof galleryItems>([]);
  const [viewerOpen, setViewerOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<typeof galleryItems[0] | null>(null);

  // Simulate loading data
  useEffect(() => {
    const timer = setTimeout(() => {
      setItems(galleryItems);
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const handleEnlarge = (img: typeof galleryItems[0]) => {
    setSelectedImage(img);
    setViewerOpen(true);
  };

  const handleClose = () => {
    setViewerOpen(false);
    setSelectedImage(null);
  };

  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="glass-panel h-64 animate-pulse bg-matrix-black/50"></div>
        ))}
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {items.map((item) => (
          <ImageCard
            key={item.id}
            src={item.src}
            alt={item.alt}
            title={item.title}
            category={item.category}
            onEnlarge={() => handleEnlarge(item)}
          />
        ))}
      </div>
      <ImageViewerDialog image={selectedImage} open={viewerOpen} onClose={handleClose} />
    </>
  );
};

export default Gallery;
