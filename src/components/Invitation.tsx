'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { useInView } from 'react-intersection-observer';

export default function Invitation() {
  const t = useTranslations('invitation');
  const tCouple = useTranslations('couple');
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section
      ref={ref}
      className='pt-10 px-4 md:pt-10 bg-white relative overflow-hidden bg-paper'
    >
      <div className='max-w-4xl mx-auto relative z-10'>
        <motion.div
          className='text-center space-y-8 md:space-y-12'
          initial={{ opacity: 0, rotateY: -90 }}
          animate={
            inView ? { opacity: 1, rotateY: 0 } : { opacity: 0, rotateY: -90 }
          }
          transition={{ duration: 1, ease: 'easeOut' }}
          style={{ transformStyle: 'preserve-3d' }}
        >
          {/* Logo/Monogram with signature background */}
          <motion.div
            className='flex justify-center my-8 font-dancing-script'
            initial={{ scale: 0, rotate: -180 }}
            animate={
              inView ? { scale: 1, rotate: 0 } : { scale: 0, rotate: -180 }
            }
            transition={{
              delay: 0.3,
              type: 'spring',
              stiffness: 150,
              damping: 12,
            }}
          >
            <div className='relative w-20 h-30 md:w-40 md:h-40'>
              <Image
                src='/images/signature-bg.png'
                alt='Signature Background'
                fill
                className='object-contain'
              />
              <div className='relative inset-0 flex items-center justify-center'>
                <div className='text-5xl md:text-6xl lg:text-7xl relative h-20 w-20'>
                  <span className='absolute top-[20px] left-[20px]'>D</span>
                  <span className='absolute top-[55px] left-[30px]'>T</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Invitation Text */}
          <div className='text-lg md:text-lg lg:text-xl'>
            <p>{t('title')}</p>
            <p>{t('subtitle')}</p>
          </div>

          <motion.div
            className='flex items-center justify-center mb-6 md:mb-8 '
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className='w-px h-10 bg-theme-primary opacity-50'></div>
          </motion.div>

          <div className='y-12'>
            <h2 className='text-2xl md:text-3xl lg:text-4xl text-theme-primary-dark uppercase'>
              {tCouple('groomName')}
            </h2>
            <p className='text-2xl md:text-3xl lg:text-4xl font-dancing-script'>
              &
            </p>
            <h2 className='text-2xl md:text-3xl lg:text-4xl text-theme-primary-dark uppercase'>
              {tCouple('brideName')}
            </h2>
          </div>

          {/* Date and Time */}
          <div className='flex justify-center items-center gap-4 text-lg md:text-lg lg:text-xl'>
            <div className='flex justify-center items-center gap-4'>
              <p className=''>18:00</p>
              <span>|</span>
            </div>
            <div className='flex-col text-4xl md:text-4xl lg:text-4xl'>
              <p>24</p>
              <p>01</p>
              <p>26</p>
            </div>
            <span>|</span>
            <p>{t('dayOfWeek')}</p>
          </div>
          <p className='text-base md:text-lg lg:text-xl'>{t('lunarDate')}</p>
        </motion.div>
      </div>
    </section>
  );
}
