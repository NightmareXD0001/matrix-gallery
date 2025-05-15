
import React, { useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { X, ZoomIn, ZoomOut, RotateCw, Download, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

type ImageProps = {
  id: number;
  src: string;
  alt: string;
  title: string;
  category?: string;
} | null;

interface ImageViewerDialogProps {
  image: ImageProps;
  open: boolean;
  onClose: () => void;
  allImages: ImageProps[];
}

const ImageViewerDialog: React.FC<ImageViewerDialogProps> = ({
  image,
  open,
  onClose,
  allImages,
}) => {
  const [scale, setScale] = useState(1);
  const [rotation, setRotation] = useState(0);

  if (!image) return null;

  // Find current image index
  const currentIndex = allImages.findIndex(img => img?.id === image.id);
  
  const handleZoomIn = () => {
    setScale(prev => Math.min(prev + 0.25, 3));
  };
  
  const handleZoomOut = () => {
    setScale(prev => Math.max(prev - 0.25, 0.5));
  };
  
  const handleRotate = () => {
    setRotation(prev => (prev + 90) % 360);
  };
  
  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = image.src;
    link.download = `${image.title || 'image'}.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  
  const handlePrevImage = () => {
    if (currentIndex > 0) {
      const newIndex = currentIndex - 1;
      const prevImage = allImages[newIndex];
      if (prevImage) {
        // Reset zoom and rotation when changing images
        setScale(1);
        setRotation(0);
      }
    }
  };
  
  const handleNextImage = () => {
    if (currentIndex < allImages.length - 1) {
      const newIndex = currentIndex + 1;
      const nextImage = allImages[newIndex];
      if (nextImage) {
        // Reset zoom and rotation when changing images
        setScale(1);
        setRotation(0);
      }
    }
  };

  return (
    <Dialog open={open} onOpenChange={(val) => !val && onClose()}>
      <DialogContent
        className="bg-matrix-black border-matrix-green/40 max-w-4xl"
        style={{ padding: 0 }}
      >
        <div className="relative flex flex-col">
          {/* Image viewer header */}
          <div className="flex justify-between items-center p-3 border-b border-matrix-green/30">
            <div className="flex items-center gap-2">
              <span className="font-matrix text-lg text-matrix-green">{image.title}</span>
              {image.category && (
                <span className="text-xs px-2 py-1 bg-matrix-green/10 text-matrix-green rounded">
                  {image.category}
                </span>
              )}
            </div>
            <button
              className="p-1.5 rounded-full bg-matrix-black/70 text-matrix-green border border-matrix-green/40 hover:bg-matrix-green hover:text-matrix-black transition-colors"
              onClick={onClose}
              aria-label="Close"
              type="button"
            >
              <X size={18} />
            </button>
          </div>
          
          {/* Image container */}
          <div className="relative overflow-hidden bg-black/90 flex justify-center items-center" style={{ height: "calc(80vh - 110px)" }}>
            {/* Navigation arrows */}
            {currentIndex > 0 && (
              <button 
                className="absolute left-2 z-10 p-1.5 rounded-full bg-matrix-black/50 border border-matrix-green/30 text-matrix-green hover:bg-matrix-green hover:text-matrix-black transition-colors"
                onClick={handlePrevImage}
                aria-label="Previous image"
              >
                <ChevronLeft size={24} />
              </button>
            )}
            
            <img
              src={image.src}
              alt={image.alt}
              className="max-h-full max-w-full object-contain transition-all duration-300"
              style={{
                transform: `scale(${scale}) rotate(${rotation}deg)`,
                transition: "transform 0.3s ease"
              }}
              draggable={false}
            />
            
            {currentIndex < allImages.length - 1 && (
              <button 
                className="absolute right-2 z-10 p-1.5 rounded-full bg-matrix-black/50 border border-matrix-green/30 text-matrix-green hover:bg-matrix-green hover:text-matrix-black transition-colors"
                onClick={handleNextImage}
                aria-label="Next image"
              >
                <ChevronRight size={24} />
              </button>
            )}
          </div>
          
          {/* Control toolbar */}
          <div className="flex justify-center items-center gap-2 p-3 border-t border-matrix-green/30">
            <Button 
              variant="outline" 
              size="sm"
              className="bg-matrix-black/70 border-matrix-green/40 text-matrix-green hover:bg-matrix-green hover:text-matrix-black"
              onClick={handleZoomIn}
            >
              <ZoomIn size={16} /> Zoom In
            </Button>
            <Button 
              variant="outline" 
              size="sm"
              className="bg-matrix-black/70 border-matrix-green/40 text-matrix-green hover:bg-matrix-green hover:text-matrix-black"
              onClick={handleZoomOut}
            >
              <ZoomOut size={16} /> Zoom Out
            </Button>
            <Button 
              variant="outline" 
              size="sm"
              className="bg-matrix-black/70 border-matrix-green/40 text-matrix-green hover:bg-matrix-green hover:text-matrix-black"
              onClick={handleRotate}
            >
              <RotateCw size={16} /> Rotate
            </Button>
            <Button 
              variant="outline" 
              size="sm"
              className="bg-matrix-black/70 border-matrix-green/40 text-matrix-green hover:bg-matrix-green hover:text-matrix-black"
              onClick={handleDownload}
            >
              <Download size={16} /> Download
            </Button>
          </div>
          
          {/* Image counter */}
          <div className="absolute bottom-16 right-3 px-2 py-1 bg-matrix-black/80 border border-matrix-green/30 rounded text-xs text-matrix-green">
            {currentIndex + 1} / {allImages.length}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ImageViewerDialog;
