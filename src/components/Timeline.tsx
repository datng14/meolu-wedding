'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { useInView } from 'react-intersection-observer';

interface TimelineEvent {
  time: string;
  title: string;
  description: string;
  icon: string;
}

export default function Timeline() {
  const t = useTranslations('timeline');
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const events: TimelineEvent[] = [
    {
      time: t('event1Time'),
      title: t('event1Title'),
      description: '',
      icon: '/images/icon-tl1.png',
    },
    {
      time: t('event2Time'),
      title: t('event2Title'),
      description: '',
      icon: '/images/icon-tl3.png',
    },
    {
      time: t('event3Time'),
      title: t('event3Title'),
      description: '',
      icon: '/images/icon-tl4.png',
    },
  ];

  const itemVariants = {
    hidden: { opacity: 0, x: 100, scale: 0.7 },
    visible: {
      opacity: 1,
      x: 0,
      scale: 1,
      transition: {
        duration: 0.7,
        ease: 'easeOut' as const,
      },
    },
  };

  return (
    <section
      ref={ref}
      className='py-12 px-4 md:py-20 relative overflow-hidden bg-center bg-cover bg-no-repeat'
      style={{
        backgroundImage: 'url(/images/album-7.jpg)',
      }}
    >
      {/* Dark overlay for text readability */}
      <div className='absolute inset-0 bg-black opacity-50'></div>

      <div className='max-w-4xl mx-auto relative z-10 '>
        <motion.h2
          className='text-5xl md:text-6xl lg:text-7xl text-center mb-12 md:mb-20 text-white font-dancing-script'
          initial={{ opacity: 0, y: -50, rotateX: -90 }}
          animate={
            inView
              ? { opacity: 1, y: 0, rotateX: 0 }
              : { opacity: 0, y: -50, rotateX: -90 }
          }
          transition={{
            duration: 0.8,
            ease: 'easeOut',
          }}
          style={{ transformStyle: 'preserve-3d' }}
        >
          {t('title')}
        </motion.h2>

        <div className='relative'>
          {events.map((event, index) => (
            <motion.div
              key={index}
              className='relative mb-12 md:mb-16 lg:mb-20'
              variants={itemVariants}
              initial='hidden'
              animate={inView ? 'visible' : 'hidden'}
              transition={{ delay: index * 0.2 }}
            >
              <div className='flex items-center justify-center gap-3 md:gap-6'>
                {/* Timeline icon */}
                <div className='shrink-0'>
                  <div className='w-20 h-20 rounded-full shadow-xl flex items-center justify-center p-3'>
                    <Image
                      src={event.icon}
                      alt={event.title}
                      width={40}
                      height={40}
                      className='object-contain w-full h-full'
                      quality={100}
                      priority
                    />
                  </div>
                </div>

                {/* Horizontal line */}
                <div
                  className='w-8 md:w-24 h-0.5 shrink-0'
                  style={{ backgroundColor: 'rgba(255, 255, 255, 0.7)' }}
                />

                {/* Content */}
                <div className='text-white w-6/12'>
                  <div
                    className='text-2xl md:text-3xl lg:text-4xl mb-1'
                    style={{ textShadow: '1px 1px 4px rgba(0,0,0,0.5)' }}
                  >
                    {event.time}
                  </div>
                  <h3
                    className='text-base md:text-lg lg:text-xl font-normal'
                    style={{ textShadow: '1px 1px 4px rgba(0,0,0,0.5)' }}
                  >
                    {event.title}
                  </h3>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
