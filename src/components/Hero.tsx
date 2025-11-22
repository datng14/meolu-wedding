'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { useInView } from 'react-intersection-observer';

export default function Hero() {
  const t = useTranslations('hero');
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.4,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: [0.6, -0.05, 0.01, 0.99] as const,
      },
    },
  };

  return (
    <section ref={ref} className='relative w-full overflow-hidden'>
      {/* Hero Image - Mobile First */}
      <div className='relative w-full h-screen overflow-hidden'>
        <motion.div
          className='absolute inset-0'
          initial={{ scale: 1.2, opacity: 0, rotate: -2 }}
          animate={
            inView
              ? { scale: 1, opacity: 1, rotate: 0 }
              : { scale: 1.2, opacity: 0, rotate: -2 }
          }
          transition={{ duration: 1.5, ease: 'easeOut' }}
        >
          <Image
            src='/images/hero-bg.jpg'
            alt='Couple'
            fill
            className='object-cover object-left md:object-center'
            priority
            quality={90}
          />
        </motion.div>

        <motion.div
          className='absolute bottom-0 left-0 right-0 text-white py-12 px-4 md:py-20 md:px-8'
          style={{
            background:
              'linear-gradient(rgba(253, 251, 251, 0), rgba(0, 0, 0, 0.71))',
          }}
          variants={containerVariants}
          initial='hidden'
          animate={inView ? 'visible' : 'hidden'}
        >
          <div className='max-w-4xl mx-auto text-center'>
            <motion.div
              className='text-4xl md:text-5xl lg:text-6xl font-dancing-script mb-4'
              style={{ textShadow: '2px 2px 8px rgba(0,0,0,0.5)' }}
              variants={itemVariants}
            >
              {t('saveOurDate')}
            </motion.div>
            <motion.h1
              className='text-3xl md:text-5xl lg:text-6xl font-light tracking-wide mb-4 md:mb-4'
              style={{ textShadow: '2px 2px 8px rgba(0,0,0,0.5)' }}
              variants={itemVariants}
            >
              {t('coupleNames')}
            </motion.h1>
            <motion.p
              className='text-xl md:text-2xl lg:text-3xl font-ergisa'
              style={{ textShadow: '2px 2px 8px rgba(0,0,0,0.5)' }}
              variants={itemVariants}
            >
              {t('date')}
            </motion.p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
