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
    <section
      ref={ref}
      className='py-12 px-4 md:py-20 relative overflow-hidden'
      style={{
        background: `linear-gradient(to top, var(--theme-primary-ultra-light) 0%, rgba(255, 255, 255, 0) 100%)`,
      }}
    >
      <div className='max-w-6xl mx-auto'>
        <motion.div
          variants={containerVariants}
          initial='hidden'
          animate={inView ? 'visible' : 'hidden'}
        >
          {/* Title */}
          <motion.h2
            className='text-5xl md:text-6xl lg:text-7xl text-center mb-4 md:mb-6 font-dancing-script'
            variants={itemVariants}
            style={{
              color: 'var(--theme-primary-darker)',
              textShadow: '2px 2px 4px rgba(0, 0, 0, 0.1)',
            }}
          >
            {t('title')}
          </motion.h2>

          {/* Description */}
          <motion.p
            className='text-center text-base md:text-lg lg:text-xl mb-8 md:mb-12 max-w-3xl mx-auto font-medium'
            variants={itemVariants}
            style={{
              color: 'var(--theme-primary-darker)',
              textShadow: '1px 1px 2px rgba(0, 0, 0, 0.05)',
            }}
          >
            {t('description')}
          </motion.p>

          {/* Video Container - Fixed width for mobile portrait videos */}
          <motion.div
            className='relative w-full flex justify-center mx-auto rounded-lg overflow-hidden'
            variants={videoVariants}
          >
            <div className='relative bg-gray-900 lg:w-[360px] md:w-[300px] sm:w-full max-w-full'>
              <video
                className='w-full h-auto object-contain block'
                controls
                playsInline
                preload='metadata'
              >
                <source src='/videos/our-story.mp4' type='video/mp4' />
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
