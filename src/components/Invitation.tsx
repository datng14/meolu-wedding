'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { useInView } from 'react-intersection-observer';

export default function Invitation() {
  const t = useTranslations('invitation');
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section
      ref={ref}
      className='pt-16 px-4 md:pt-20 bg-white relative overflow-hidden bg-paper'
    >
      <div className='max-w-4xl mx-auto relative z-10'>
        <motion.div
          className='text-center space-y-8 md:space-y-12'
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Logo/Monogram with signature background */}
          <motion.div
            className='flex justify-center my-8'
            initial={{ scale: 0 }}
            animate={inView ? { scale: 1 } : { scale: 0 }}
            transition={{ delay: 0.3, type: 'spring', stiffness: 200 }}
          >
            <div className='relative w-36 h-36 md:w-40 md:h-40'>
              <div
                className='absolute inset-0 opacity-20'
                style={{
                  backgroundImage: 'url(/images/signature-bg.png)',
                  backgroundSize: 'contain',
                  backgroundRepeat: 'no-repeat',
                  backgroundPosition: 'center',
                }}
              />
              <div className='absolute inset-0 flex items-center justify-center'>
                <div className='text-5xl md:text-5xl lg:text-6xl font-script relative h-20 w-20'>
                  <span className='animate-pulse absolute top-[5px] left-[10px]'>
                    D
                  </span>
                  <span className='animate-pulse absolute top-[40px] left-[15px]'>
                    T
                  </span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Invitation Text */}
          <div className='space-y-4'>
            <p className='text-base md:text-3lg sm:text-2xl font-serif'>
              {t('invitationText')}
            </p>
            <p className='text-base md:text-3lg sm:text-2xl font-serif'>
              {t('celebrationText')}
            </p>
          </div>

          {/* Couple Names with signature background */}
          <div className='space-y-6 my-12'>
            <h2 className='text-4xl md:text-6xl lg:text-6xl font-serif font-bold'>
              {t('groomName').split('&')[0].trim()}
            </h2>

            <p className='text-6xl md:text-6xl lg:text-6xl font-script'>and</p>

            <h2 className='text-4xl md:text-6xl lg:text-6xl font-serif font-bold'>
              {t('groomName').split('&')[1].trim()}
            </h2>
          </div>

          {/* Date and Time */}
          <div className='space-y-8 my-16'>
            <div className='flex justify-center items-center gap-4 md:gap-8 text-4xl md:text-6xl lg:text-6xl font-serif font-bold'>
              <div className='text-center'>
                <p>24</p>
              </div>
              <div className='text-center'>
                <p>/</p>
              </div>
              <div className='text-center'>
                <p>01</p>
              </div>
              <div className='text-center'>
                <p>/</p>
              </div>
              <div className='text-center'>
                <p>26</p>
              </div>
            </div>
            <div className='flex justify-center items-center gap-4'>
              <p className='text-2xl md:text-3xl font-serif font-semibold'>
                18:00
              </p>
              <span className='text-2xl md:text-3xl'>|</span>
              <p className='text-2xl md:text-3xl font-serif font-semibold uppercase'>
                {t('dayOfWeek')}
              </p>
            </div>
            <p className='text-base md:text-lg font-serif'>{t('lunarDate')}</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
