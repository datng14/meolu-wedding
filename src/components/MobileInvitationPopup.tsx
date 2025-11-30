'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { useEffect, useState } from 'react';

export default function MobileInvitationPopup() {
  const t = useTranslations('popup');
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Scroll to top on initial load
    window.scrollTo(0, 0);

    // Check if mobile and show popup
    const checkMobileAndShow = () => {
      const isMobile = window.innerWidth < 768;
      if (isMobile) {
        setIsOpen(true);
      }
    };

    // Run after component mounts
    checkMobileAndShow();
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
    visible: { opacity: 1 },
    exit: { opacity: 0 },
  };

  const popupVariants = {
    hidden: { y: '100%' },
    visible: {
      y: 0,
      transition: {
        type: 'spring' as const,
        damping: 25,
        stiffness: 200,
      },
    },
    exit: {
      y: '100%',
      transition: {
        duration: 0.3,
      },
    },
  };

  const contentVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (custom: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: custom * 0.2,
        duration: 0.5,
      },
    }),
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            className='fixed inset-0 bg-transparent z-100 md:hidden backdrop-blur-md'
            style={{ backgroundColor: 'rgba(0, 0, 0, 0.8)' }}
            variants={overlayVariants}
            initial='hidden'
            animate='visible'
            exit='exit'
            onClick={handleClose}
          />

          {/* Popup */}
          <motion.div
            className='fixed bottom-0 left-0 right-0 bg-white rounded-t-3xl z-101 max-h-[85vh] md:hidden border-t-4'
            style={{ borderTopColor: '#B03060' }}
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
              >
                <div className='absolute top-[-90px] left-1/2 transform -translate-x-[calc(50%-4px)] w-24 h-24 z-100'>
                  <Image
                    src='/images/happy.svg'
                    alt='Double Happiness'
                    fill
                    className='object-contain'
                    quality={90}
                  />
                </div>
              </motion.div>
              {/* Couple Illustration */}

              {/* Background Image - Behind all content */}
              <motion.div
                className='absolute top-[-190px] left-1/2 transform -translate-x-1/2 w-120 h-120 z-0 pointer-events-none'
                custom={1}
                variants={contentVariants}
                initial='hidden'
                animate='visible'
              >
                <Image
                  src='/images/invitation-bg.png'
                  alt='Couple'
                  fill
                  className='object-contain'
                  quality={90}
                />
              </motion.div>

              {/* Text Content with Backdrop Blur */}
              <div className='relative z-10 pt-[240px]'>
                <div
                  className='px-4 mx-2'
                  style={{
                    backgroundColor: 'rgba(255, 255, 255, 0.55)',
                  }}
                >
                  {/* Title */}
                  <motion.h2
                    className='text-center text-xs uppercase tracking-wider mb-1'
                    custom={2}
                    variants={contentVariants}
                    initial='hidden'
                    animate='visible'
                  >
                    {t('theWeddingOf')}
                  </motion.h2>

                  {/* Couple Names */}
                  <motion.h1
                    className='text-center text-xl mb-1'
                    custom={2}
                    variants={contentVariants}
                    initial='hidden'
                    animate='visible'
                    style={{ color: '#B03060' }}
                  >
                    <span className='pb-1'>{t('coupleNames')}</span>
                  </motion.h1>

                  {/* Date */}
                  <motion.div
                    className='text-center mb-3'
                    custom={3}
                    variants={contentVariants}
                    initial='hidden'
                    animate='visible'
                  >
                    <div className='text-base border-b border-t border-theme-primary pb-1 inline-block font-semibold'>
                      {t('date')}
                    </div>
                  </motion.div>

                  <div className='flex justify-center'>
                    <motion.button
                      onClick={handleClose}
                      className='border-2 px-6 py-1.5 rounded-full font-semibold text-xs uppercase tracking-wider border-theme-primary text-theme-primary'
                      custom={4}
                      variants={contentVariants}
                      initial='hidden'
                      animate='visible'
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
