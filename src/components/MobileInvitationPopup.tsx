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
        delay: 0.3 + custom * 0.2,
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
            className='fixed inset-0 bg-black bg-opacity-50 z-100 md:hidden'
            variants={overlayVariants}
            initial='hidden'
            animate='visible'
            exit='exit'
            onClick={handleClose}
          />

          {/* Popup */}
          <motion.div
            className='fixed bottom-0 left-0 right-0 bg-white rounded-t-3xl z-101 max-h-[90vh] overflow-y-auto md:hidden'
            variants={popupVariants}
            initial='hidden'
            animate='visible'
            exit='exit'
          >
            <div className='p-8 pb-12'>
              {/* Double Happiness Symbol */}
              <motion.div
                className='flex justify-center mb-6'
                custom={0}
                variants={contentVariants}
                initial='hidden'
                animate='visible'
              >
                <div
                  className='text-6xl'
                  style={{ color: 'var(--theme-primary)' }}
                >
                  囍
                </div>
              </motion.div>

              {/* Couple Illustration */}
              <motion.div
                className='flex justify-center mb-6'
                custom={1}
                variants={contentVariants}
                initial='hidden'
                animate='visible'
              >
                <div className='relative w-70 h-70'>
                  <Image
                    src='/images/invitation-bg.png'
                    alt='Couple'
                    fill
                    className='object-contain'
                    quality={90}
                  />
                </div>
              </motion.div>

              {/* Title */}
              <motion.h2
                className='text-center text-sm uppercase tracking-wider mb-2'
                style={{ color: 'var(--wedding-text-light)' }}
                custom={2}
                variants={contentVariants}
                initial='hidden'
                animate='visible'
              >
                {t('theWeddingOf')}
              </motion.h2>

              {/* Couple Names */}
              <motion.h1
                className='text-center text-2xl font-serif font-bold mb-3'
                style={{ color: 'var(--theme-primary)' }}
                custom={3}
                variants={contentVariants}
                initial='hidden'
                animate='visible'
              >
                {t('coupleNames')}
              </motion.h1>

              {/* Date */}
              <motion.div
                className='text-center mb-6'
                custom={4}
                variants={contentVariants}
                initial='hidden'
                animate='visible'
              >
                <div
                  className='text-xl font-serif font-semibold'
                  style={{ color: 'var(--theme-primary)' }}
                >
                  {t('date')}
                </div>
              </motion.div>

              {/* Divider */}
              <motion.div
                className='flex items-center justify-center mb-6'
                custom={5}
                variants={contentVariants}
                initial='hidden'
                animate='visible'
              >
                <div className='flex-1 h-px bg-gray-300 max-w-[100px]'></div>
                <div
                  className='mx-4 text-xs uppercase tracking-widest'
                  style={{ color: 'var(--wedding-text-light)' }}
                >
                  {t('inviteTo')}
                </div>
                <div className='flex-1 h-px bg-gray-300 max-w-[100px]'></div>
              </motion.div>

              {/* Guest Name */}
              <motion.div
                className='text-center mb-8'
                custom={6}
                variants={contentVariants}
                initial='hidden'
                animate='visible'
              >
                <h3
                  className='text-2xl font-serif font-bold'
                  style={{ color: 'var(--theme-primary)' }}
                >
                  {t('guestName')}
                </h3>
              </motion.div>

              {/* Button */}
              <motion.button
                onClick={handleClose}
                className='w-full py-4 rounded-full text-white font-semibold text-base uppercase tracking-wider transition-transform active:scale-95'
                style={{ backgroundColor: 'var(--theme-primary)' }}
                custom={7}
                variants={contentVariants}
                initial='hidden'
                animate='visible'
                whileTap={{ scale: 0.95 }}
              >
                {t('viewInvitation')}
              </motion.button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
