
import React from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { X } from "lucide-react";

type ImageProps = {
  src: string;
  alt: string;
  title: string;
  category?: string;
} | null;

interface ImageViewerDialogProps {
  image: ImageProps;
  open: boolean;
  onClose: () => void;
}

const ImageViewerDialog: React.FC<ImageViewerDialogProps> = ({
  image,
  open,
  onClose,
}) => {
  if (!image) return null;

  return (
    <Dialog open={open} onOpenChange={(val) => !val && onClose()}>
      <DialogContent
        className="bg-matrix-black border-matrix-green/40"
        style={{ maxWidth: 560, padding: 0 }}
      >
        <div className="relative">
          <button
            className="absolute top-4 right-4 z-10 p-2 bg-matrix-black/70 text-matrix-green border border-matrix-green/40 rounded-full hover:bg-matrix-green hover:text-matrix-black transition-colors"
            onClick={onClose}
            aria-label="Close"
            type="button"
          >
            <X size={20} />
          </button>
          <img
            src={image.src}
            alt={image.alt}
            className="w-full max-h-[80vh] object-contain rounded-t-lg bg-black"
            draggable={false}
          />
          <div className="p-4 border-t border-matrix-green/30 bg-black/70 rounded-b-lg">
            <div className="flex justify-between items-center">
              <span className="font-matrix text-lg text-matrix-green">{image.title}</span>
              {image.category && (
                <span className="text-xs px-2 py-1 bg-matrix-green/10 text-matrix-green rounded">
                  {image.category}
                </span>
              )}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ImageViewerDialog;
