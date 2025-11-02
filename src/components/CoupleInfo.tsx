'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { useInView } from 'react-intersection-observer';

export default function CoupleInfo() {
  const t = useTranslations('couple');
  const tQuote = useTranslations('quote');
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: 'easeOut' as const,
      },
    },
  };

  const overlayTextVariants = {
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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
    },
  };
  return (
    <section
      ref={ref}
      className='p-12 md:py-20 relative overflow-hidden'
      style={{ backgroundColor: 'var(--theme-primary)' }}
    >
      {/* <Quote /> */}
      <motion.div
        className='relative z-10 max-w-3xl mx-auto text-center text-white px-6 mb-10'
        variants={containerVariants}
        initial='hidden'
        animate={inView ? 'visible' : 'hidden'}
      >
        <motion.h2
          className='text-2xl md:text-3xl lg:text-4xl font-serif uppercase tracking-wide mb-6 md:mb-8 leading-snug font-bold'
          variants={itemVariants}
          transition={{ duration: 0.8, ease: [0.6, -0.05, 0.01, 0.99] }}
        >
          {tQuote('title')}
        </motion.h2>
        <motion.div
          className='flex items-center justify-center mb-6 md:mb-8'
          variants={itemVariants}
          transition={{
            duration: 0.8,
            ease: [0.6, -0.05, 0.01, 0.99],
            delay: 0.2,
          }}
        >
          <div className='w-px h-4 md:h-16 bg-white opacity-50'></div>
        </motion.div>
        <motion.p
          className='text-md md:text-lg lg:text-xl font-serif leading-relaxed'
          variants={itemVariants}
          transition={{
            duration: 0.8,
            ease: [0.6, -0.05, 0.01, 0.99],
            delay: 0.4,
          }}
        >
          {tQuote('subtitle')}
        </motion.p>
      </motion.div>
      {/* <Quote /> */}

      {/* Decorative Flowers */}
      {/* Flower 1 - Top right on mobile behind bride, left side on desktop */}
      <div className='absolute top-[-5%] right-0 w-[60%] h-1/2 md:left-0 md:top-1/2 md:-translate-y-1/2 md:w-1/3 md:h-auto z-0 pointer-events-none'>
        <Image
          src='/images/decor-flower1.png'
          alt=''
          width={500}
          height={500}
          className='absolute top-0 right-0 w-full h-auto md:w-full'
          quality={100}
        />
      </div>

      {/* Flower 2 - Bottom left on mobile behind groom, right side on desktop */}
      <div className='absolute bottom-[-10%] left-0 w-[50%] h-1/2 md:right-0 md:bottom-1/2 md:translate-y-1/2 md:left-auto md:w-1/3 md:h-auto z-0 pointer-events-none'>
        <Image
          src='/images/decor-flower2.png'
          alt=''
          width={500}
          height={500}
          className='absolute bottom-0 left-0 w-full h-auto md:w-full'
          quality={100}
        />
      </div>

      <div className='relative z-10 max-w-6xl mx-auto md:flex md:items-center md:justify-center md:gap-8 lg:gap-12'>
        {/* Bride Section - Mobile First */}
        <motion.div
          className='text-center mb-12 md:mb-0'
          variants={cardVariants}
          initial='hidden'
          animate={inView ? 'visible' : 'hidden'}
        >
          <motion.div
            className='relative w-full max-w-sm mx-auto h-[400px] md:w-96 md:h-[500px] overflow-hidden rounded-2xl aspect-317/400'
            initial={{ opacity: 0, x: 20 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
            transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
          >
            <Image
              src='/images/bride.jpg'
              alt='Bride'
              fill
              className='object-cover object-center'
              quality={90}
              sizes='(max-width: 768px) 384px, 384px'
            />
            {/* Text Overlay */}
            <motion.div
              className='absolute bottom-0 left-0 right-0 p-6 md:p-8'
              style={{
                background:
                  'linear-gradient(rgba(253, 251, 251, 0), rgba(0, 0, 0, 0.71))',
              }}
              variants={overlayTextVariants}
              initial='hidden'
              animate={inView ? 'visible' : 'hidden'}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              <h3
                className='text-5xl md:text-6xl lg:text-6xl font-script text-white mb-2'
                style={{ textShadow: '2px 2px 8px rgba(0,0,0,0.3)' }}
              >
                {t('bride')}
              </h3>
              <p
                className='text-lg md:text-3xl lg:text-3xl font-serif text-white uppercase tracking-widest font-bold'
                style={{ textShadow: '1px 1px 4px rgba(0,0,0,0.3)' }}
              >
                {t('brideName')}
              </p>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Groom Section - Mobile First */}
        <motion.div
          className='text-center'
          variants={cardVariants}
          initial='hidden'
          animate={inView ? 'visible' : 'hidden'}
        >
          <motion.div
            className='relative w-full max-w-sm mx-auto h-[500px] md:w-96 md:h-[600px] overflow-hidden rounded-2xl'
            initial={{ opacity: 0, x: -20 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
            transition={{ duration: 0.8, delay: 0.4, ease: 'easeOut' }}
          >
            <Image
              src='/images/groom.jpg'
              alt='Groom'
              fill
              className='object-cover object-center'
              quality={90}
              sizes='(max-width: 768px) 384px, 384px'
            />
            {/* Text Overlay */}
            <motion.div
              className='absolute bottom-0 left-0 right-0 p-6 md:p-8'
              style={{
                background:
                  'linear-gradient(rgba(253, 251, 251, 0), rgba(0, 0, 0, 0.71))',
              }}
              variants={overlayTextVariants}
              initial='hidden'
              animate={inView ? 'visible' : 'hidden'}
              transition={{ duration: 0.8, delay: 0.9 }}
            >
              <h3
                className='text-5xl md:text-6xl lg:text-6xl font-script text-white mb-2'
                style={{ textShadow: '2px 2px 8px rgba(0,0,0,0.3)' }}
              >
                {t('groom')}
              </h3>
              <p
                className='text-lg md:text-3xl lg:text-3xl font-serif text-white uppercase tracking-widest font-bold'
                style={{ textShadow: '1px 1px 4px rgba(0,0,0,0.3)' }}
              >
                {t('groomName')}
              </p>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
