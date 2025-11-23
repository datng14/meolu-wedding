'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';

export default function Gallery() {
  const t = useTranslations('gallery');
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  // Gallery images from public/images folder
  const images = [
    { id: 1, src: '/images/album-1.jpg', alt: 'Photo 1' },
    { id: 2, src: '/images/album-2.jpg', alt: 'Photo 2' },
    { id: 3, src: '/images/album-3.jpg', alt: 'Photo 3' },
    { id: 4, src: '/images/album-4.jpg', alt: 'Photo 4' },
    { id: 5, src: '/images/album-5.jpg', alt: 'Photo 5' },
    { id: 6, src: '/images/album-6.jpg', alt: 'Photo 6' },
    { id: 7, src: '/images/album-7.jpg', alt: 'Photo 7' },
    { id: 8, src: '/images/album-8.jpg', alt: 'Photo 8' },
  ];

  // Handle body overflow when lightbox is open
  useEffect(() => {
    if (selectedImage !== null) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [selectedImage]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedImage === null) return;

      if (e.key === 'Escape') {
        setSelectedImage(null);
      } else if (e.key === 'ArrowLeft') {
        const prevIndex =
          selectedImage > 0 ? selectedImage - 1 : images.length - 1;
        setSelectedImage(prevIndex);
      } else if (e.key === 'ArrowRight') {
        const nextIndex =
          selectedImage < images.length - 1 ? selectedImage + 1 : 0;
        setSelectedImage(nextIndex);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedImage, images.length]);

  const openLightbox = (index: number) => {
    setSelectedImage(index);
  };

  const closeLightbox = () => {
    setSelectedImage(null);
  };

  const goToPrevious = () => {
    if (selectedImage === null) return;
    const prevIndex = selectedImage > 0 ? selectedImage - 1 : images.length - 1;
    setSelectedImage(prevIndex);
  };

  const goToNext = () => {
    if (selectedImage === null) return;
    const nextIndex = selectedImage < images.length - 1 ? selectedImage + 1 : 0;
    setSelectedImage(nextIndex);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.5, rotate: -15 },
    visible: {
      opacity: 1,
      scale: 1,
      rotate: 0,
      transition: {
        duration: 0.6,
        ease: 'easeOut' as const,
      },
    },
  };

  return (
    <section
      ref={ref}
      className='py-12 px-4 md:py-20 relative overflow-hidden bg-paper'
    >
      <div className='max-w-6xl mx-auto'>
        <motion.h2
          className='text-6xl md:text-7xl lg:text-8xl text-center mb-8 md:mb-16 font-dancing-script'
          initial={{ opacity: 0, y: 30, rotateZ: -5 }}
          animate={
            inView
              ? { opacity: 1, y: 0, rotateZ: 0 }
              : { opacity: 0, y: 30, rotateZ: -5 }
          }
          transition={{
            duration: 0.8,
            type: 'spring',
            stiffness: 80,
            damping: 10,
          }}
        >
          {t('title')}
        </motion.h2>

        <motion.div
          className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 md:gap-4 lg:gap-6'
          variants={containerVariants}
          initial='hidden'
          animate={inView ? 'visible' : 'hidden'}
        >
          {images.map((image, index) => (
            <motion.div
              key={image.id}
              className='relative aspect-square overflow-hidden rounded-lg shadow-md cursor-pointer'
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
              onClick={() => openLightbox(index)}
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                className='object-cover object-center'
                quality={85}
                sizes='(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw'
              />
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedImage !== null && (
          <>
            {/* Backdrop */}
            <motion.div
              className='fixed inset-0 bg-black/90 z-50'
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeLightbox}
            />

            {/* Lightbox Content */}
            <motion.div
              className='fixed inset-0 z-50 flex items-center justify-center p-4'
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeLightbox}
            >
              <motion.div
                className='relative max-w-7xl w-full h-full flex items-center justify-center'
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                onClick={(e) => e.stopPropagation()}
              >
                {/* Close Button */}
                <button
                  onClick={closeLightbox}
                  className='absolute top-4 right-4 z-10 w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm flex items-center justify-center transition-colors'
                  aria-label='Close'
                >
                  <svg
                    className='w-6 h-6 md:w-7 md:h-7 text-white'
                    fill='none'
                    stroke='currentColor'
                    viewBox='0 0 24 24'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M6 18L18 6M6 6l12 12'
                    />
                  </svg>
                </button>

                {/* Previous Button */}
                {images.length > 1 && (
                  <button
                    onClick={goToPrevious}
                    className='absolute left-4 z-10 w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm flex items-center justify-center transition-colors'
                    aria-label='Previous'
                  >
                    <svg
                      className='w-6 h-6 md:w-7 md:h-7 text-white'
                      fill='none'
                      stroke='currentColor'
                      viewBox='0 0 24 24'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth={2}
                        d='M15 19l-7-7 7-7'
                      />
                    </svg>
                  </button>
                )}

                {/* Next Button */}
                {images.length > 1 && (
                  <button
                    onClick={goToNext}
                    className='absolute right-4 z-10 w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm flex items-center justify-center transition-colors'
                    aria-label='Next'
                  >
                    <svg
                      className='w-6 h-6 md:w-7 md:h-7 text-white'
                      fill='none'
                      stroke='currentColor'
                      viewBox='0 0 24 24'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth={2}
                        d='M9 5l7 7-7 7'
                      />
                    </svg>
                  </button>
                )}

                {/* Image */}
                <div className='relative w-full h-full max-h-[90vh] flex items-center justify-center'>
                  <Image
                    src={images[selectedImage].src}
                    alt={images[selectedImage].alt}
                    width={1920}
                    height={1080}
                    className='object-contain max-w-full max-h-full'
                    quality={100}
                    priority
                  />
                </div>

                {/* Image Counter */}
                {images.length > 1 && (
                  <div className='absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/50 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm md:text-base'>
                    {selectedImage + 1} / {images.length}
                  </div>
                )}
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </section>
  );
}
