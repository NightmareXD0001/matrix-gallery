
import React, { useState, useRef } from "react";
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
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);
  const imageRef = useRef<HTMLImageElement>(null);

  React.useEffect(() => {
    if (image && open) {
      // Find current image index when dialog opens or image changes
      const index = allImages.findIndex(img => img?.id === image.id);
      if (index !== -1) {
        setCurrentImageIndex(index);
      }
      
      // Reset transformations when changing images
      setScale(1);
      setRotation(0);
      setPosition({ x: 0, y: 0 });
    }
  }, [image, open, allImages]);

  if (!image) return null;
  
  const handleZoomIn = () => {
    setScale(prev => Math.min(prev + 0.25, 3));
  };
  
  const handleZoomOut = () => {
    setScale(prev => Math.max(prev - 0.25, 0.5));
  };
  
  const handleRotate = () => {
    setRotation(prev => (prev + 90) % 360);
  };
  
  const handlePrevImage = () => {
    if (currentImageIndex > 0) {
      const newIndex = currentImageIndex - 1;
      // Reset transformations
      setScale(1);
      setRotation(0);
      setPosition({ x: 0, y: 0 });
      setCurrentImageIndex(newIndex);
    }
  };
  
  const handleNextImage = () => {
    if (currentImageIndex < allImages.length - 1) {
      const newIndex = currentImageIndex + 1;
      // Reset transformations
      setScale(1);
      setRotation(0);
      setPosition({ x: 0, y: 0 });
      setCurrentImageIndex(newIndex);
    }
  };

  // Mouse event handlers for dragging
  const handleMouseDown = (e: React.MouseEvent) => {
    if (scale > 1) {  // Only enable dragging when zoomed in
      setIsDragging(true);
      setDragStart({ x: e.clientX - position.x, y: e.clientY - position.y });
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging && scale > 1) {
      setPosition({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Prevent context menu
  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    return false;
  };

  // Get the current displayed image
  const currentImage = allImages[currentImageIndex] || image;

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
              <span className="font-matrix text-lg text-matrix-green">{currentImage.title}</span>
              {currentImage.category && (
                <span className="text-xs px-2 py-1 bg-matrix-green/10 text-matrix-green rounded">
                  {currentImage.category}
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
          <div 
            className="relative overflow-hidden bg-black/90 flex justify-center items-center" 
            style={{ height: "calc(80vh - 110px)" }}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
          >
            {/* Navigation arrows */}
            {currentImageIndex > 0 && (
              <button 
                className="absolute left-2 z-10 p-1.5 rounded-full bg-matrix-black/50 border border-matrix-green/30 text-matrix-green hover:bg-matrix-green hover:text-matrix-black transition-colors"
                onClick={handlePrevImage}
                aria-label="Previous image"
              >
                <ChevronLeft size={24} />
              </button>
            )}
            
            <img
              ref={imageRef}
              src={currentImage.src}
              alt={currentImage.alt}
              className="max-h-full max-w-full object-contain transition-all duration-300"
              style={{
                transform: `translate(${position.x}px, ${position.y}px) scale(${scale}) rotate(${rotation}deg)`,
                transition: isDragging ? "none" : "transform 0.3s ease",
                cursor: scale > 1 ? (isDragging ? "grabbing" : "grab") : "default"
              }}
              draggable={false}
              onMouseDown={handleMouseDown}
              onContextMenu={handleContextMenu}
            />
            
            {currentImageIndex < allImages.length - 1 && (
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
          </div>
          
          {/* Image counter */}
          <div className="absolute bottom-16 right-3 px-2 py-1 bg-matrix-black/80 border border-matrix-green/30 rounded text-xs text-matrix-green">
            {currentImageIndex + 1} / {allImages.length}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ImageViewerDialog;
