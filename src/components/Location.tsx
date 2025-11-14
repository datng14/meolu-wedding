'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { useInView } from 'react-intersection-observer';

export default function Location() {
  const tInvitation = useTranslations('invitation');
  const t = useTranslations('location');
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

  const handleAddToCalendar = () => {
    const startDate = `${tInvitation('date').replace(/-/g, '')}T${tInvitation(
      'time'
    ).replace(':', '')}00`;
    const endDate = `${tInvitation('date').replace(/-/g, '')}T${tInvitation(
      'time'
    ).replace(':', '')}00`;
    const details = `Join us for our wedding celebration at ${tInvitation(
      'venue'
    )}`;

    const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
      tInvitation('title')
    )}&dates=${startDate}/${endDate}&details=${encodeURIComponent(
      details
    )}&location=${encodeURIComponent(
      tInvitation('mapAddress')
    )}&sf=true&output=xml`;

    window.open(googleCalendarUrl, '_blank');
  };

  return (
    <section ref={ref} className='pb-12 px-4 md:pb-20 bg-white bg-paper'>
      <div className='max-w-6xl mx-auto'>
        <motion.h2
          className='text-xl md:text-2xl lg:text-3xl font-serif text-center mb-4 md:mb-8'
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
          variants={cardVariants}
        >
          {t('title')}
        </motion.h2>

        {/* Venue */}
        <div className='space-y-6 text-center'>
          <p className='text-xl md:text-2xl lg:text-3xl font-serif font-bold'>
            {tInvitation('venue')}
          </p>
          <p className='text-xl md:text-2xl font-serif'>
            {tInvitation('lobby')}
          </p>
          <p className='text-xl md:text-2xl font-serif'>
            {t('address')}: {tInvitation('address')}
          </p>
          <div className='flex flex-col sm:flex-row gap-4 justify-center mt-6'>
            <motion.button
              onClick={handleAddToCalendar}
              className='px-8 py-3 text-sm md:text-base text-white rounded-full uppercase tracking-wider transition-colors border-2 cursor-pointer'
              style={{
                backgroundColor: 'var(--theme-primary)',
              }}
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
              {tInvitation('addToCalendar')}
            </motion.button>
          </div>
        </div>
        {/* Google Map */}
        <motion.div
          className='mt-8 md:mt-12 h-64 md:h-96 lg:h-[600px] rounded-lg overflow-hidden shadow-lg'
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          <iframe
            src={`https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.0636742370394!2d106.67797841533359!3d10.804226261685034!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x317529111aa89f9d%3A0x1c1c1c1c1c1c1c1c!2s${encodeURIComponent(
              tInvitation('address')
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
