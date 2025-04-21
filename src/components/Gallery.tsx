
import React, { useState, useEffect } from "react";
import ImageCard from "./ImageCard";
import ImageViewerDialog from "./ImageViewerDialog";

// Sample gallery data
const galleryItems = [
  { 
    id: 1, 
    src: 'https://i.ibb.co/wrFXvhhZ/gallery8.jpg', 
    alt: 'gallery-1', 
    title: 'Team', 
    category: '1' 
  },
  { 
    id: 2, 
    src: 'https://i.ibb.co/1GccVLKN/gallery9.jpg', 
    alt: 'gallery-2', 
    title: 'Team', 
    category: '2' 
  },
  { 
    id: 3, 
    src: 'https://i.ibb.co/XfmCsyL0/gallery7.jpg', 
    alt: 'gallery-3', 
    title: 'Prizes', 
    category: '3' 
  },
  { 
    id: 4, 
    src: 'https://i.ibb.co/DPP7r9S7/gallery6.jpg', 
    alt: 'gallery-4', 
    title: 'Chief Guest', 
    category: '4' 
  },
  { 
    id: 5, 
    src: 'https://i.ibb.co/SDjkCgvb/gallery1.jpg', 
    alt: 'gallery-5', 
    title: 'Lamp Lighting', 
    category: '5' 
  },
  { 
    id: 6, 
    src: 'https://i.ibb.co/rK25qxnT/gallery2.jpg', 
    alt: 'gallery-6', 
    title: 'President\' Address', 
    category: '6' 
  },
  { 
    id: 7, 
    src: 'https://i.ibb.co/yGSwmsb/gallery5.jpg', 
    alt: 'gallery-7', 
    title: 'Music', 
    category: '7' 
  },
  { 
    id: 8, 
    src: 'https://i.ibb.co/TBgT1TSV/gallery4.jpg', 
    alt: 'gallery-8', 
    title: 'Decoration', 
    category: '8' 
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
