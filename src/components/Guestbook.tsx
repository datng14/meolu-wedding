'use client';

import { db } from '@/lib/firebase';
import { GuestbookMessage } from '@/types';
import {
  addDoc,
  collection,
  onSnapshot,
  orderBy,
  query,
} from 'firebase/firestore';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';

export default function Guestbook() {
  const t = useTranslations('guestbook');
  const tCommon = useTranslations('common');
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [formData, setFormData] = useState({
    name: '',
    message: '',
  });

  const [messages, setMessages] = useState<GuestbookMessage[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    'idle' | 'success' | 'error'
  >('idle');

  // Fetch messages from Firestore
  useEffect(() => {
    const q = query(
      collection(db, 'guestbook'),
      orderBy('submittedAt', 'desc')
    );
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const msgs: GuestbookMessage[] = [];
      snapshot.forEach((doc) => {
        msgs.push({
          id: doc.id,
          ...doc.data(),
          submittedAt: doc.data().submittedAt?.toDate() || new Date(),
        } as GuestbookMessage);
      });
      setMessages(msgs);
    });

    return () => unsubscribe();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const messageData = {
        name: formData.name,
        message: formData.message,
        submittedAt: new Date(),
      };

      await addDoc(collection(db, 'guestbook'), messageData);
      setSubmitStatus('success');
      setFormData({
        name: '',
        message: '',
      });
    } catch (error) {
      console.error('Error submitting message:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const messageVariants = {
    hidden: { opacity: 0, x: -50, rotate: -3 },
    visible: {
      opacity: 1,
      x: 0,
      rotate: 0,
      transition: {
        duration: 0.6,
        ease: 'easeOut' as const,
      },
    },
  };

  return (
    <section
      ref={ref}
      className='py-12 px-4 md:py-20 relative overflow-hidden'
      style={{ backgroundColor: 'var(--neutral-white)' }}
    >
      <div className='max-w-6xl mx-auto relative z-10'>
        <motion.h2
          className='text-6xl md:text-7xl lg:text-8xl text-center mb-8 md:mb-16 font-dancing-script text-theme-primary'
          initial={{ opacity: 0, y: -30, scale: 0.9 }}
          animate={
            inView
              ? { opacity: 1, y: 0, scale: 1 }
              : { opacity: 0, y: -30, scale: 0.9 }
          }
          transition={{
            duration: 0.8,
            type: 'spring',
            stiffness: 120,
            damping: 10,
          }}
        >
          {t('title')}
        </motion.h2>
        <motion.p
          className='text-center text-base md:text-lg lg:text-xl mb-8 md:mb-12 font-body-serif'
          style={{ color: 'var(--text-dark)' }}
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          {t('subtitle')}
        </motion.p>

        {/* Form */}
        {submitStatus === 'success' ? (
          <motion.div
            className='rounded-lg shadow-lg p-6 md:p-8 mb-8 md:mb-12'
            style={{ backgroundColor: 'var(--theme-primary-light)' }}
            variants={{
              hidden: { opacity: 0, y: 50, rotate: -5 },
              visible: {
                opacity: 1,
                y: 0,
                rotate: 0,
                transition: {
                  duration: 0.8,
                  type: 'spring',
                  stiffness: 100,
                  damping: 12,
                },
              },
            }}
            initial='hidden'
            animate={inView ? 'visible' : 'hidden'}
          >
            <motion.div
              className='flex flex-col items-center justify-center space-y-4 py-8'
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <motion.div
                className='w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center'
                style={{ backgroundColor: 'var(--theme-primary)' }}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
              >
                <svg
                  className='w-8 h-8 md:w-10 md:h-10 text-white'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M5 13l4 4L19 7'
                  />
                </svg>
              </motion.div>
              <motion.h3
                className='text-2xl md:text-3xl font-medium text-white'
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                {t('thankYou')}
              </motion.h3>
              <motion.p
                className='text-base md:text-lg text-white/90'
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                {t('successMessage')}
              </motion.p>
            </motion.div>
          </motion.div>
        ) : submitStatus === 'error' ? (
          <motion.div
            className='rounded-lg shadow-lg p-6 md:p-8 mb-8 md:mb-12'
            style={{ backgroundColor: 'var(--theme-primary-light)' }}
            variants={{
              hidden: { opacity: 0, y: 50, rotate: -5 },
              visible: {
                opacity: 1,
                y: 0,
                rotate: 0,
                transition: {
                  duration: 0.8,
                  type: 'spring',
                  stiffness: 100,
                  damping: 12,
                },
              },
            }}
            initial='hidden'
            animate={inView ? 'visible' : 'hidden'}
          >
            <motion.div
              className='bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-center'
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <p className='font-medium mb-2'>{t('error')}</p>
              <button
                onClick={() => setSubmitStatus('idle')}
                className='text-sm underline hover:no-underline'
              >
                {t('tryAgain')}
              </button>
            </motion.div>
          </motion.div>
        ) : (
          <motion.form
            onSubmit={handleSubmit}
            className='shadow-lg p-6 md:p-8 mb-8 md:mb-12'
            style={{ backgroundColor: 'var(--theme-primary-light)' }}
            variants={{
              hidden: { opacity: 0, y: 50, rotate: -5 },
              visible: {
                opacity: 1,
                y: 0,
                rotate: 0,
                transition: {
                  duration: 0.8,
                  type: 'spring',
                  stiffness: 100,
                  damping: 12,
                },
              },
            }}
            initial='hidden'
            animate={inView ? 'visible' : 'hidden'}
          >
            <div className='space-y-6'>
              <div>
                <input
                  type='text'
                  name='name'
                  required
                  value={formData.name}
                  onChange={handleChange}
                  placeholder={t('name')}
                  className='w-full px-3 py-2.5 md:px-4 md:py-3 text-sm md:text-base border bg-white font-body transition-all'
                  style={{
                    borderColor: 'var(--theme-primary-soft)',
                    color: 'var(--text-dark)',
                  }}
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = 'var(--theme-primary)';
                    e.currentTarget.style.boxShadow =
                      '0 0 0 2px var(--theme-primary-light)';
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor =
                      'var(--theme-primary-soft)';
                    e.currentTarget.style.boxShadow = '';
                  }}
                />
              </div>

              <div>
                <textarea
                  name='message'
                  rows={4}
                  required
                  value={formData.message}
                  onChange={handleChange}
                  placeholder={t('messagePlaceholder')}
                  className='w-full px-3 py-2.5 md:px-4 md:py-3 text-sm md:text-base border bg-white font-body transition-all'
                  style={{
                    borderColor: 'var(--theme-primary-soft)',
                    color: 'var(--text-dark)',
                  }}
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = 'var(--theme-primary)';
                    e.currentTarget.style.boxShadow =
                      '0 0 0 2px var(--theme-primary-light)';
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor =
                      'var(--theme-primary-soft)';
                    e.currentTarget.style.boxShadow = '';
                  }}
                />
              </div>

              <div className='flex justify-center'>
                <motion.button
                  type='submit'
                  disabled={isSubmitting}
                  className='px-6 py-3 md:px-8 md:py-4 text-sm md:text-base font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-white bg-theme-primary cursor-pointer'
                  whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                  whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                >
                  {isSubmitting ? tCommon('loading') : t('submit')}
                </motion.button>
              </div>
            </div>
          </motion.form>
        )}

        {/* Messages */}
        <div className='space-y-6'>
          {messages.length === 0 ? (
            <motion.p
              className='text-center py-12 text-base md:text-lg'
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ delay: 0.4 }}
            >
              {t('noMessages')}
            </motion.p>
          ) : (
            messages.map((message, index) => (
              <motion.div
                key={message.id}
                className='bg-white p-4 md:p-6'
                style={{
                  border: '1px solid var(--neutral-mid)',
                }}
                variants={messageVariants}
                initial='hidden'
                animate={inView ? 'visible' : 'hidden'}
                transition={{ delay: index * 0.1 }}
              >
                <div className='flex items-start justify-between mb-2 md:mb-3'>
                  <h3 className='text-base md:text-lg font-body font-semibold text-theme-primary'>
                    {message.name}
                  </h3>
                  <span className='text-sm md:text-base font-body'>
                    {message.submittedAt.toLocaleDateString()}
                  </span>
                </div>
                <p
                  className='text-sm md:text-base font-body-serif'
                  style={{ color: 'var(--text-dark)' }}
                >
                  {message.message}
                </p>
              </motion.div>
            ))
          )}
        </div>
      </div>
    </section>
  );
}
