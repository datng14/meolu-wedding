'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { useInView } from 'react-intersection-observer';

export default function Gallery() {
  const t = useTranslations('gallery');
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

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
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: 'easeOut' as const,
      },
    },
  };

  return (
    <section
      ref={ref}
      className='py-12 px-4 md:py-20'
      style={{
        background: `linear-gradient(to bottom, white, var(--theme-primary-ultra-light))`,
      }}
    >
      <div className='max-w-6xl mx-auto'>
        <motion.h2
          className='text-3xl md:text-4xl lg:text-5xl font-serif text-center mb-8 md:mb-16'
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
        >
          {t('title')}
        </motion.h2>

        <motion.div
          className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 md:gap-4 lg:gap-6'
          variants={containerVariants}
          initial='hidden'
          animate={inView ? 'visible' : 'hidden'}
        >
          {images.map((image) => (
            <motion.div
              key={image.id}
              className='relative aspect-square overflow-hidden rounded-lg shadow-md'
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
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
    </section>
  );
}
