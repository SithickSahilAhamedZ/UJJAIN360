
import React, { useState } from 'react';
import { Image as ImageIcon, X } from 'lucide-react';
import Card from '../components/Card';
import { useI18n } from '../i18n';

const galleryImages = [
  "/images/lordshiv1.jpg",
  "/images/ujjainhack2[1].jpg",
  "/images/U1.jpg",
  "/images/uh3.jpg",
  "/images/U3.jpg",
  "/images/uh2.jpg",
  "/images/U5.jpg",
  "/images/U6.jpg",
];

interface GalleryModalProps {
  src: string;
  onClose: () => void;
}

const GalleryModal = ({ src, onClose }: GalleryModalProps) => {
  const { t } = useI18n();
  return (
    <div 
      className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="gallery-modal-title"
    >
      <div className="relative max-w-4xl max-h-full w-full" onClick={e => e.stopPropagation()}>
        <img src={src} alt={t('galleryModalTitle')} className="w-full h-auto max-h-[90vh] object-contain rounded-lg shadow-2xl" />
        <button
          onClick={onClose}
          className="absolute -top-4 -right-4 bg-white text-gray-800 rounded-full p-2 shadow-lg hover:bg-gray-200 transition-colors"
          aria-label={t('closeNotification')}
        >
          <X size={24} />
        </button>
      </div>
      <h2 id="gallery-modal-title" className="sr-only">{t('galleryModalTitle')}</h2>
    </div>
  );
};


const GalleryPage = () => {
  const { t } = useI18n();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  return (
    <div>
      <div className="flex items-center space-x-3 mb-6">
        <ImageIcon size={32} className="text-orange-500" />
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white">{t('galleryTitle')}</h1>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {galleryImages.map((src, index) => (
          <Card 
            key={index} 
            className="!p-0 overflow-hidden aspect-square group"
            onClick={() => setSelectedImage(src)}
          >
            <img 
              src={src} 
              alt={`${t('galleryTitle')} image ${index + 1}`}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
              loading="lazy"
            />
          </Card>
        ))}
      </div>
      {selectedImage && <GalleryModal src={selectedImage} onClose={() => setSelectedImage(null)} />}
    </div>
  );
};
export default GalleryPage;
