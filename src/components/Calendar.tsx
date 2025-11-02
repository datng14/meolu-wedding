'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

export default function Calendar() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const daysOfWeek = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'];

  // January 2026 calendar data - starts on Thursday (January 1st)
  const calendarDays = [
    null, // Monday empty
    null, // Tuesday empty
    null, // Wednesday empty
    1,
    2,
    3,
    4, // Thu-Sun
    5,
    6,
    7,
    8,
    9,
    10,
    11,
    12,
    13,
    14,
    15,
    16,
    17,
    18,
    19,
    20,
    21,
    22,
    23,
    24,
    25,
    26,
    27,
    28,
    29,
    30,
    31,
  ];

  const weddingDay = 24;

  return (
    <section
      ref={ref}
      className='py-12 px-4 md:py-20 relative overflow-hidden'
      style={{ backgroundColor: '#F5F3EF' }}
    >
      <div className='max-w-2xl mx-auto text-center relative z-10'>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
        >
          {/* Year and Month */}
          <div className='mb-8 md:mb-12'>
            <h2
              className='text-6xl md:text-8xl font-serif font-bold mb-4'
              style={{ color: 'var(--theme-primary)' }}
            >
              2026
            </h2>
            <p
              className='text-4xl md:text-5xl font-script'
              style={{ color: 'var(--theme-primary)' }}
            >
              January
            </p>
          </div>

          {/* Days of Week */}
          <div className='grid grid-cols-7 gap-2 md:gap-4 mb-4'>
            {daysOfWeek.map((day) => (
              <div
                key={day}
                className='text-xs md:text-sm font-semibold uppercase'
                style={{ color: 'var(--theme-primary)' }}
              >
                {day}
              </div>
            ))}
          </div>

          {/* Calendar Grid */}
          <div className='grid grid-cols-7 gap-2 md:gap-4 mb-8'>
            {calendarDays.map((day, index) => (
              <div
                key={index}
                className='aspect-square flex items-center justify-center text-base md:text-lg font-serif relative'
              >
                {day && (
                  <>
                    {day === weddingDay ? (
                      <motion.div
                        className='absolute inset-0 flex items-center justify-center'
                        initial={{ scale: 0 }}
                        animate={inView ? { scale: 1 } : { scale: 0 }}
                        transition={{
                          delay: 0.5,
                          type: 'spring',
                          stiffness: 200,
                        }}
                      >
                        <div className='relative'>
                          {/* Heart background */}
                          <motion.svg
                            viewBox='0 0 100 100'
                            className='w-12 h-12 md:w-16 md:h-16'
                            style={{
                              fill: 'var(--theme-primary)',
                              stroke: 'var(--theme-primary)',
                            }}
                            animate={{ scale: [1, 1.1, 1] }}
                            transition={{
                              duration: 1,
                              repeat: Infinity,
                              repeatType: 'loop',
                            }}
                          >
                            <path d='M50,90 C50,90 10,60 10,35 C10,20 20,10 30,10 C40,10 45,20 50,25 C55,20 60,10 70,10 C80,10 90,20 90,35 C90,60 50,90 50,90 Z' />
                          </motion.svg>
                          <span className='absolute inset-0 flex items-center justify-center text-white font-bold text-sm md:text-base'>
                            {day}
                          </span>
                        </div>
                      </motion.div>
                    ) : (
                      <span style={{ color: 'var(--theme-primary)' }}>
                        {day}
                      </span>
                    )}
                  </>
                )}
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
