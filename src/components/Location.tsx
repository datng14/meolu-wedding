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
    <section
      ref={ref}
      className='pt-10 pb-20 md:pb-20 px-4 md:pt-10 bg-white bg-paper'
    >
      <div className='max-w-6xl mx-auto'>
        <motion.h2
          className='text-xl md:text-1xl lg:text-2xl text-center mb-4 md:mb-4'
          initial={{ opacity: 0, y: 100, scale: 0.8 }}
          animate={
            inView
              ? { opacity: 1, y: 0, scale: 1 }
              : { opacity: 0, y: 100, scale: 0.8 }
          }
          transition={{
            duration: 0.8,
            type: 'spring',
            stiffness: 100,
            damping: 10,
          }}
        >
          {t('title')}
        </motion.h2>

        {/* Venue */}
        <div className='space-y-2 text-center text-base md:text-base lg:text-lg'>
          <p className='font-bold'>{tInvitation('venue')}</p>
          <p>{tInvitation('lobby')}</p>
          <p>
            {t('address')}: {tInvitation('address')}
          </p>
          <div className='text-center mt-6'>
            <motion.button
              onClick={handleAddToCalendar}
              className='px-8 py-3 text-xs md:text-xs lg:text-sm text-white rounded-full uppercase tracking-wider transition-colors border-2 cursor-pointer'
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
          initial={{ opacity: 0, y: 50, scale: 0.95 }}
          animate={
            inView
              ? { opacity: 1, y: 0, scale: 1 }
              : { opacity: 0, y: 50, scale: 0.95 }
          }
          transition={{
            delay: 0.4,
            duration: 0.8,
            type: 'spring',
            stiffness: 80,
            damping: 12,
          }}
        >
          <iframe
            src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15676.52002126144!2d106.66060347641935!3d10.80135360716894!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752928af1513fb%3A0xd2651b40d27136ec!2sPavillon%20Restaurant!5e0!3m2!1sen!2s!4v1763791138834!5m2!1sen!2s'
            width='100%'
            height='100%'
            loading='lazy'
          ></iframe>
        </motion.div>
      </div>
    </section>
  );
}
