'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { useInView } from 'react-intersection-observer';

export default function OurStory() {
  const t = useTranslations('ourStory');
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: 'easeOut' as const,
      },
    },
  };

  const videoVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: 'easeOut' as const,
      },
    },
  };

  return (
    <section ref={ref} className='py-12 px-4 md:py-20 relative overflow-hidden'>
      <div className='max-w-6xl mx-auto'>
        <motion.div
          variants={containerVariants}
          initial='hidden'
          animate={inView ? 'visible' : 'hidden'}
        >
          {/* Title */}
          <motion.h2
            className='text-6xl md:text-7xl lg:text-8xl text-center mb-8 md:mb-16 font-dancing-script text-theme-primary'
            variants={itemVariants}
          >
            {t('title')}
          </motion.h2>

          {/* Floral Divider */}
          <motion.div
            className='floral-divider mb-6 md:mb-8 text-theme-primary'
            variants={itemVariants}
          >
            <svg width='24' height='24' viewBox='0 0 24 24' fill='none'>
              <path
                d='M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z'
                fill='currentColor'
                opacity='0.6'
              />
            </svg>
          </motion.div>

          {/* Description */}
          <motion.p
            className='text-center text-base md:text-lg lg:text-xl mb-8 md:mb-12 max-w-3xl mx-auto font-body-serif'
            variants={itemVariants}
          >
            {t('description')}
          </motion.p>

          {/* Video Container - Fixed width for mobile portrait videos */}
          <motion.div
            className='relative w-full flex justify-center mx-auto overflow-hidden'
            variants={videoVariants}
          >
            <div className='relative w-[80%] h-[90%]  max-w-full overflow-hidden'>
              <video
                className='w-full h-auto object-contain block'
                controls
                playsInline
                preload='metadata'
                poster='/images/thumbnail.png'
              >
                <source
                  src='https://tulw364hxf77w61g.public.blob.vercel-storage.com/our-story.mp4'
                  type='video/mp4'
                />
                <p className='text-white p-4 text-center'>
                  {t('videoNotSupported')}
                </p>
              </video>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
