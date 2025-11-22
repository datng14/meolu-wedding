'use client';

import Countdown from '@/components/Countdown';
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
      className='px-4 md:pt-15 relative overflow-hidden bg-paper'
    >
      <div className='max-w-xl mx-auto text-center relative z-10'>
        <motion.div
          initial={{ opacity: 0, rotateX: 90 }}
          animate={
            inView ? { opacity: 1, rotateX: 0 } : { opacity: 0, rotateX: 90 }
          }
          transition={{ duration: 0.8, ease: 'easeOut' }}
          style={{ transformStyle: 'preserve-3d' }}
        >
          {/* Year and Month */}
          <div className='mb-8 md:mb-12 relative'>
            <h2 className='text-8xl md:text-8xl mb-4 font-ergisa'>2026</h2>
            <p className='text-6xl md:text-7xl absolute top-15 left-1/2 -translate-x-1/2 font-high-spirited'>
              January
            </p>
          </div>

          {/* Days of Week */}
          <div className='grid grid-cols-7 mb-4 mt-30 text-theme-primary-lighter'>
            {daysOfWeek.map((day) => (
              <div
                key={day}
                className='text-xs md:text-sm font-semibold uppercase'
              >
                {day}
              </div>
            ))}
          </div>

          {/* Calendar Grid */}
          <motion.div
            className='grid grid-cols-7 mb-8'
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.03,
                },
              },
            }}
            initial='hidden'
            animate={inView ? 'visible' : 'hidden'}
          >
            {calendarDays.map((day, index) => (
              <motion.div
                key={index}
                className='aspect-square flex items-center justify-center text-base md:text-lg relative'
                variants={{
                  hidden: { opacity: 0, rotateY: -90 },
                  visible: {
                    opacity: 1,
                    rotateY: 0,
                    transition: {
                      duration: 0.4,
                      ease: 'easeOut',
                    },
                  },
                }}
              >
                {day && (
                  <>
                    {day === weddingDay ? (
                      <motion.div
                        className='absolute inset-0 flex items-center justify-center font-bold'
                        initial={{ scale: 0, rotate: -180 }}
                        animate={
                          inView
                            ? { scale: 1, rotate: 0 }
                            : { scale: 0, rotate: -180 }
                        }
                        transition={{
                          delay: 0.5 + index * 0.03,
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
                              fill: 'transparent',
                              stroke: 'var(--theme-primary)',
                              strokeWidth: '5',
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
                          <span className='absolute inset-0 flex items-center justify-center text-theme-primary font-bold text-sm md:text-base'>
                            {day}
                          </span>
                        </div>
                      </motion.div>
                    ) : (
                      <span>{day}</span>
                    )}
                  </>
                )}
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
      <Countdown />
    </section>
  );
}
