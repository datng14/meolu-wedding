'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const numberVariants = {
  hidden: { opacity: 0, scale: 0.5 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      type: 'spring' as const,
      stiffness: 200,
      damping: 15,
    },
  },
};

const TimeUnit = ({ value, label }: { value: number; label: string }) => (
  <motion.div className='flex flex-col items-center' variants={numberVariants}>
    <motion.div
      key={value}
      className='text-3xl md:text-4xl lg:text-6xl font-serif font-semibold mb-1'
      style={{ color: 'var(--theme-primary)' }}
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      {String(value).padStart(2, '0')}
    </motion.div>
  </motion.div>
);

export default function Countdown() {
  const t = useTranslations('countdown');
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  // Set target date - adjust this to your wedding date (July 5, 2025)
  const targetDate = new Date('2026-01-24T18:00:00').getTime();

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate - now;

      if (distance > 0) {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor(
            (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
          ),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000),
        });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  return (
    <section ref={ref} className='py-12 px-4 md:py-20 bg-white'>
      <motion.div
        className='max-w-6xl mx-auto text-center'
        initial='hidden'
        animate={inView ? 'visible' : 'hidden'}
      >
        <motion.h2
          className='text-lg md:text-xl lg:text-2xl font-serif mb-8 md:mb-12 leading-relaxed'
          style={{ color: 'var(--wedding-text-dark)' }}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
        >
          {t('title')}
        </motion.h2>
        <div className='flex justify-center gap-2 md:gap-3 lg:gap-4 flex-wrap'>
          <TimeUnit value={timeLeft.days} label={t('days')} />
          <span
            className='text-3xl md:text-4xl lg:text-5xl font-serif flex items-center'
            style={{ color: 'var(--theme-primary)' }}
          >
            :
          </span>
          <TimeUnit value={timeLeft.hours} label={t('hours')} />
          <span
            className='text-3xl md:text-4xl lg:text-5xl font-serif flex items-center'
            style={{ color: 'var(--theme-primary)' }}
          >
            :
          </span>
          <TimeUnit value={timeLeft.minutes} label={t('minutes')} />
          <span
            className='text-3xl md:text-4xl lg:text-5xl font-serif flex items-center'
            style={{ color: 'var(--theme-primary)' }}
          >
            :
          </span>
          <TimeUnit value={timeLeft.seconds} label={t('seconds')} />
        </div>
      </motion.div>
    </section>
  );
}
