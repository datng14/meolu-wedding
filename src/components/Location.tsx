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
    const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
      tInvitation('addToCalendarTitle')
    )}&dates=${tInvitation('addToCalendarStartDate')}/${tInvitation(
      'addToCalendarEndDate'
    )}&details=${encodeURIComponent(
      tInvitation('addToCalendarDescription')
    )}&location=${encodeURIComponent(
      tInvitation('mapAddress')
    )}&sf=true&output=xml`;

    window.open(googleCalendarUrl, '_blank');
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
  return (
    <section
      ref={ref}
      className='p-12 md:p-20 bg-white section-transition-gradient'
    >
      <div className='max-w-6xl mx-auto'>
        <motion.h2
          className='text-xl md:text-1xl lg:text-2xl text-center mb-4 md:mb-4 font-heading text-theme-primary'
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

        {/* Floral Divider */}
        <motion.div
          className='floral-divider mb-6 md:mb-8 text-theme-primary'
          variants={itemVariants}
        >
          <svg width='24' height='24' viewBox='0 0 24 24' fill='none'>
            <path
              d='M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z'
              fill='currentColor'
              opacity='0.6'
            />
          </svg>
        </motion.div>
        {/* Venue */}
        <div className='space-y-2 text-center text-xl md:text-2xl lg:text-3xl font-body-serif text-dark'>
          <p className='font-bold whitespace-pre-line'>
            {tInvitation('venue')}
          </p>
          <p className='font-bold'>{tInvitation('lobby')}</p>
          <p>
            {t('address')}: {tInvitation('address')}
          </p>
          <div className='text-center mt-6'>
            <motion.button
              onClick={handleAddToCalendar}
              className='px-8 py-3 text-xs md:text-xs lg:text-sm text-white uppercase tracking-wider transition-colors border-2 cursor-pointer font-body'
              style={{
                backgroundColor: 'var(--theme-primary)',
                borderColor: 'var(--theme-primary)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'var(--neutral-white)';
                e.currentTarget.style.color = 'var(--theme-primary)';
                e.currentTarget.style.borderColor = 'var(--theme-primary)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'var(--theme-primary)';
                e.currentTarget.style.color = 'white';
                e.currentTarget.style.borderColor = 'var(--theme-primary)';
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
          className='mt-8 md:mt-12 h-64 md:h-96 lg:h-[600px] overflow-hidden shadow-premium-lg'
          style={{
            border: '1px solid var(--neutral-mid)',
          }}
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
            src='https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d3919.1295329980894!2d106.6698503!3d10.8013898!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752928b68fbc3f%3A0xc58bea5686708420!2zVHJ1bmcgVMOibSBI4buZaSBOZ2jhu4sgJiBUaeG7h2MgQ8aw4bubaSBQYXZpbGxvbiBUw6JuIFPGoW4gTmjhuqV0!5e0!3m2!1sen!2s!4v1763866738443!5m2!1sen!2s'
            width='100%'
            height='100%'
            loading='lazy'
          ></iframe>
        </motion.div>
      </div>
    </section>
  );
}
