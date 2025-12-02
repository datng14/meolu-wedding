'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { useEffect, useState } from 'react';

export default function InvitationPopup() {
  const t = useTranslations('popup');
  const [isOpen, setIsOpen] = useState(true);

  useEffect(() => {
    // Scroll to top on initial load
    window.scrollTo(0, 0);
  }, []);

  // Disable/enable scroll based on popup state
  useEffect(() => {
    if (isOpen) {
      // Disable scroll when popup is open
      document.body.style.overflow = 'hidden';
      document.body.style.position = 'fixed';
      document.body.style.width = '100%';
    } else {
      // Re-enable scroll when popup closes
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
      // Scroll to top when popup closes
      window.scrollTo(0, 0);
    }

    // Cleanup function
    return () => {
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
    };
  }, [isOpen]);

  const handleClose = () => {
    setIsOpen(false);
  };

  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.4,
        ease: [0.4, 0, 0.2, 1] as const, // Custom easing for smooth fade
      },
    },
    exit: {
      opacity: 0,
      transition: {
        duration: 0.3,
        ease: [0.4, 0, 1, 1] as const,
      },
    },
  };

  const popupVariants = {
    hidden: {
      y: '100%',
      opacity: 0,
    },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring' as const,
        damping: 30,
        stiffness: 300,
        mass: 0.8,
        opacity: {
          duration: 0.1,
          ease: 'easeOut',
        },
      },
    },
    exit: {
      y: '100%',
      opacity: 0,
      transition: {
        duration: 0.35,
        ease: [0.4, 0, 1, 1] as const,
      },
    },
  };

  const contentVariants = {
    hidden: {
      opacity: 0,
      y: 20,
      scale: 0.95,
    },
    visible: (custom: number) => ({
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        delay: 0.5 + custom * 0.1, // Shorter stagger delay
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94] as const, // Smooth easeOutCubic
      },
    }),
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            className='fixed inset-0 bg-transparent z-100 backdrop-blur-md'
            style={{
              backgroundColor: 'rgba(0, 0, 0, 0.8)',
              willChange: 'opacity',
            }}
            variants={overlayVariants}
            initial='hidden'
            animate='visible'
            exit='exit'
            onClick={handleClose}
          />

          {/* Popup */}
          <motion.div
            className='fixed bottom-0 left-0 right-0 md:top-1/2 md:left-1/2 md:transform md:-translate-x-1/2 md:-translate-y-1/2 bg-white rounded-t-3xl z-101 max-h-[85vh] border-t-4 md:border-b-4 md:rounded-b-3xl md:w-[600px] md:max-w-[90%] md:h-[500px] md:max-h-[90%]'
            style={{
              borderTopColor: '#B03060',
              willChange: 'transform, opacity',
            }}
            variants={popupVariants}
            initial='hidden'
            animate='visible'
            exit='exit'
          >
            <div className='p-4 pb-6'>
              {/* Double Happiness Symbol - At top center of popup */}
              <motion.div
                className='relative flex justify-center'
                custom={0}
                variants={contentVariants}
                initial='hidden'
                animate='visible'
                style={{ willChange: 'transform, opacity' }}
              >
                <div className='absolute top-[-90px] left-1/2 transform -translate-x-[calc(50%-4px)] w-24 h-24 z-100 md:w-34 md:h-34 md:top-[-100px]'>
                  <Image
                    src='/images/happy.svg'
                    alt='Double Happiness'
                    fill
                    className='object-contain'
                    quality={90}
                    priority
                  />
                </div>
              </motion.div>
              {/* Couple Illustration */}

              {/* Background Image - Behind all content */}
              <motion.div
                className='absolute top-[-190px] left-1/2 transform -translate-x-1/2 w-120 h-120 md:w-145 md:h-145 md:top-[-200px] z-0 pointer-events-none'
                custom={1}
                variants={contentVariants}
                initial='hidden'
                animate='visible'
                style={{ willChange: 'transform, opacity' }}
              >
                <Image
                  src='/images/invitation-bg.png'
                  alt='Couple'
                  fill
                  className='object-contain'
                  quality={90}
                  priority
                />
              </motion.div>

              {/* Text Content with Backdrop Blur */}
              <div className='md:absolute md:bottom-4 md:left-0 md:right-0 z-10 relative pt-[240px]'>
                <div
                  className='px-4 mx-2'
                  style={{
                    backgroundColor: 'rgba(255, 255, 255, 0.55)',
                  }}
                >
                  {/* Title */}
                  <motion.h2
                    className='text-center text-xs uppercase tracking-wider mb-1 md:text-base'
                    custom={2}
                    variants={contentVariants}
                    initial='hidden'
                    animate='visible'
                    style={{ willChange: 'transform, opacity' }}
                  >
                    {t('theWeddingOf')}
                  </motion.h2>

                  {/* Couple Names */}
                  <motion.h1
                    className='text-center text-xl mb-1 md:text-2xl'
                    custom={3}
                    variants={contentVariants}
                    initial='hidden'
                    animate='visible'
                    style={{
                      color: '#B03060',
                      willChange: 'transform, opacity',
                    }}
                  >
                    <span className='pb-1'>{t('coupleNames')}</span>
                  </motion.h1>

                  {/* Date */}
                  <motion.div
                    className='text-center mb-3'
                    custom={4}
                    variants={contentVariants}
                    initial='hidden'
                    animate='visible'
                    style={{ willChange: 'transform, opacity' }}
                  >
                    <div className='text-base border-b border-t border-theme-primary pb-1 inline-block font-semibold'>
                      {t('date')}
                    </div>
                  </motion.div>

                  <div className='flex justify-center'>
                    <motion.button
                      onClick={handleClose}
                      className='border-2 px-6 py-1.5 rounded-full font-semibold text-xs uppercase tracking-wider border-theme-primary text-theme-primary transition-all duration-200 hover:bg-theme-primary hover:text-white active:scale-95 md:text-base md:px-8 md:py-2.5'
                      custom={5}
                      variants={contentVariants}
                      initial='hidden'
                      animate='visible'
                      style={{ willChange: 'transform, opacity' }}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {t('viewInvitation')}
                    </motion.button>
                  </div>
                </div>
              </div>
              {/* Button */}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
