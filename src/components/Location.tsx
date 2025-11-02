'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { useInView } from 'react-intersection-observer';

export default function Location() {
  const t = useTranslations('location');
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const venueAddress =
    '202 Đ. Hoàng Văn Thụ, Phường 9, Phú Nhuận, TP. HCM, Việt Nam';
  const venueName = 'PAVILLON TÂN SƠN NHẤT';

  const handleGetDirections = () => {
    const googleMapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
      venueAddress
    )}`;
    window.open(googleMapsUrl, '_blank');
  };

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

  return (
    <section ref={ref} className='py-12 px-4 md:py-20 bg-white'>
      <div className='max-w-6xl mx-auto'>
        <motion.h2
          className='text-3xl md:text-4xl lg:text-5xl font-serif text-center mb-8 md:mb-16'
          style={{ color: 'var(--theme-primary)' }}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
        >
          {t('title')}
        </motion.h2>

        <motion.div
          className='rounded-lg p-8 md:p-12 shadow-lg text-center max-w-3xl mx-auto bg-white border-2'
          style={{ borderColor: 'var(--theme-primary-lighter)' }}
          variants={cardVariants}
          initial='hidden'
          animate={inView ? 'visible' : 'hidden'}
        >
          <h3
            className='text-2xl md:text-3xl font-serif mb-6 font-semibold'
            style={{ color: 'var(--theme-primary)' }}
          >
            {venueName}
          </h3>
          <div className='mb-6'>
            <p
              className='text-base md:text-lg font-semibold mb-2'
              style={{ color: 'var(--wedding-text-dark)' }}
            >
              {t('address')}
            </p>
            <p
              className='text-sm md:text-base font-medium'
              style={{ color: 'var(--wedding-text-dark)' }}
            >
              {venueAddress}
            </p>
          </div>
          <motion.button
            onClick={handleGetDirections}
            className='px-8 py-3 text-sm md:text-base text-white rounded-full transition-colors border-2 cursor-pointer'
            style={{ backgroundColor: 'var(--theme-primary)' }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'var(--theme-white)';
              e.currentTarget.style.color = 'var(--theme-primary)';
              e.currentTarget.style.borderColor = 'var(--theme-primary)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'var(--theme-primary)';
              e.currentTarget.style.color = 'white';
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {t('getDirections')}
          </motion.button>
        </motion.div>

        {/* Google Map */}
        <motion.div
          className='mt-8 md:mt-12 h-64 md:h-96 lg:h-[600px] rounded-lg overflow-hidden shadow-lg'
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          <iframe
            src={`https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.0636742370394!2d106.67797841533359!3d10.804226261685034!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x317529111aa89f9d%3A0x1c1c1c1c1c1c1c1c!2s${encodeURIComponent(
              venueAddress
            )}!5e0!3m2!1sen!2s!4v1234567890123!5m2!1sen!2s`}
            width='100%'
            height='100%'
            style={{ border: 0 }}
            allowFullScreen
            loading='lazy'
            referrerPolicy='no-referrer-when-downgrade'
            title={t('map')}
          />
        </motion.div>
      </div>
    </section>
  );
}
