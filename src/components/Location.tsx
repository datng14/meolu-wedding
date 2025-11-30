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
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const venueItemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: 'easeOut' as const,
      },
    },
  };

  const mapVariants = {
    hidden: { opacity: 0, y: 60, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        delay: 1.2, // Appears after venue items
        duration: 1,
        ease: [0.6, -0.05, 0.01, 0.99] as const,
      },
    },
  };

  return (
    <section ref={ref} className='pb-20 md:pb-20'>
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

        {/* Venue */}
        <motion.div
          className='space-y-2 text-center text-xl md:text-2xl lg:text-3xl font-body-serif text-dark'
          variants={containerVariants}
          initial='hidden'
          animate={inView ? 'visible' : 'hidden'}
        >
          <motion.p
            className='font-bold whitespace-pre-line'
            variants={venueItemVariants}
          >
            {tInvitation('venue')}
          </motion.p>
          <motion.p className='font-bold' variants={venueItemVariants}>
            {tInvitation('lobby')}
          </motion.p>
          <motion.p className='px-10' variants={venueItemVariants}>
            {t('address')}: {tInvitation('address')}
          </motion.p>
          <motion.div className='text-center mt-6' variants={venueItemVariants}>
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
          </motion.div>
        </motion.div>
        {/* Google Map */}
        <motion.div
          className='mt-14 md:mt-20 h-64 md:h-96 lg:h-[600px] overflow-hidden shadow-premium-lg'
          style={{
            border: '1px solid var(--neutral-mid)',
          }}
          variants={mapVariants}
          initial='hidden'
          animate={inView ? 'visible' : 'hidden'}
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
