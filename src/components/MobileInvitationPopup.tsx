'use client';

import { db } from '@/lib/firebase';
import { Guest } from '@/types';
import { doc, getDoc, Timestamp, updateDoc } from 'firebase/firestore';
import { AnimatePresence, motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function MobileInvitationPopup() {
  const t = useTranslations('popup');
  const searchParams = useSearchParams();
  const guestId = searchParams.get('guestId');
  const [isOpen, setIsOpen] = useState(false);
  const [guest, setGuest] = useState<Guest | null>(null);

  // Fetch guest data and handle status update
  useEffect(() => {
    const fetchGuest = async () => {
      if (!guestId) return;

      // Check if user has already accessed with this guestId
      const accessedGuestIds = JSON.parse(
        localStorage.getItem('accessedGuestIds') || '[]'
      ) as string[];

      // If already accessed, don't fetch or update (prevent incorrect display when link is shared)
      if (accessedGuestIds.includes(guestId)) {
        return;
      }

      try {
        const guestDoc = await getDoc(doc(db, 'guests', guestId));
        if (guestDoc.exists()) {
          const guestData = {
            id: guestDoc.id,
            ...guestDoc.data(),
            receivedAt: guestDoc.data().receivedAt?.toDate(),
            createdAt: guestDoc.data().createdAt?.toDate(),
          } as Guest;
          setGuest(guestData);

          // Update status to 1 (opened) if it's the first time
          if (guestData.status !== 1) {
            await updateDoc(doc(db, 'guests', guestId), {
              status: 1,
              receivedAt: Timestamp.now(),
            });
          }

          // Mark this guestId as accessed in localStorage
          accessedGuestIds.push(guestId);
          localStorage.setItem(
            'accessedGuestIds',
            JSON.stringify(accessedGuestIds)
          );
        }
      } catch (error) {
        console.error('Error fetching guest:', error);
      }
    };

    fetchGuest();
  }, [guestId]);

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
            className='fixed inset-0 bg-transparent z-100 md:hidden'
            style={{ backgroundColor: 'rgba(0, 0, 0, 0.3)' }}
            variants={overlayVariants}
            initial='hidden'
            animate='visible'
            exit='exit'
            onClick={handleClose}
          />

          {/* Popup */}
          <motion.div
            className='fixed bottom-0 left-0 right-0 bg-white rounded-t-3xl z-101 max-h-[90vh] md:hidden border-t-4'
            style={{ borderTopColor: '#cf4b2f' }}
            variants={popupVariants}
            initial='hidden'
            animate='visible'
            exit='exit'
          >
            <div className='p-8 pb-12'>
              {/* Double Happiness Symbol - At top center of popup */}
              <motion.div
                className='relative flex justify-center mb-4'
                custom={0}
                variants={contentVariants}
                initial='hidden'
                animate='visible'
              >
                <div className='absolute top-[-110] left-1/2 transform -translate-x-1/2 w-40 h-40 z-100'>
                  <Image
                    src='/images/happy.png'
                    alt='Double Happiness'
                    fill
                    className='object-contain'
                    quality={90}
                  />
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
                custom={2}
                variants={contentVariants}
                initial='hidden'
                animate='visible'
              >
                {t('theWeddingOf')}
              </motion.h2>

              {/* Couple Names */}
              <motion.h1
                className='text-center text-2xl mb-2 font-ergisa'
                custom={2}
                variants={contentVariants}
                initial='hidden'
                animate='visible'
                style={{ color: '#8B4513' }}
              >
                <span className='pb-1'>{t('coupleNames')}</span>
              </motion.h1>

              {/* Date */}
              <motion.div
                className='text-center mb-6'
                custom={3}
                variants={contentVariants}
                initial='hidden'
                animate='visible'
              >
                <div
                  className='text-lg border-b border-t border-[#8B4513] pb-1 inline-block font-semibold'
                  style={{ color: '#8B4513' }}
                >
                  {t('date')}
                </div>
              </motion.div>

              {/* Guest Name Section - Only show if guest exists */}
              {guest && (
                <>
                  {/* Dotted Line Separator */}
                  <motion.div
                    className='flex justify-center mb-6'
                    custom={4}
                    variants={contentVariants}
                    initial='hidden'
                    animate='visible'
                  >
                    <div className='w-3/4 border-t-2 border-dashed border-gray-300'></div>
                  </motion.div>
                  <motion.div
                    className='text-center mb-2'
                    custom={5}
                    variants={contentVariants}
                    initial='hidden'
                    animate='visible'
                  >
                    <div className='text-sm uppercase tracking-wider text-gray-600 mb-2'>
                      {t('inviteTo')}
                    </div>
                    <div className='text-4xl text-theme-primary-dark uppercase font-dancing-script'>
                      {guest.name}
                    </div>
                  </motion.div>
                  <motion.div
                    className='flex justify-center mb-6'
                    custom={5.5}
                    variants={contentVariants}
                    initial='hidden'
                    animate='visible'
                  >
                    <div className='w-3/4 border-t-2 border-dashed border-gray-300'></div>
                  </motion.div>
                </>
              )}

              <div className='flex justify-center'>
                <motion.button
                  onClick={handleClose}
                  className='border-2 border-[#cf4b2f] text-[#cf4b2f] px-8 py-2 rounded-full font-semibold text-sm uppercase tracking-wider transition-transform active:scale-95'
                  style={{ color: '#cf4b2f' }}
                  custom={6}
                  variants={contentVariants}
                  initial='hidden'
                  animate='visible'
                  whileTap={{ scale: 0.95 }}
                >
                  {t('viewInvitation')}
                </motion.button>
              </div>
              {/* Button */}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
