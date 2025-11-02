'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useState, useEffect } from 'react';
import { collection, addDoc, query, orderBy, onSnapshot } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { GuestbookMessage } from '@/types';

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
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  // Fetch messages from Firestore
  useEffect(() => {
    const q = query(collection(db, 'guestbook'), orderBy('submittedAt', 'desc'));
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: 'easeOut' as const,
      },
    },
  };

  const messageVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.5,
        ease: 'easeOut' as const,
      },
    },
  };

  return (
    <section
      ref={ref}
      className="py-12 px-4 md:py-20 relative overflow-hidden"
      style={{ backgroundColor: '#8B9D7C' }}
    >

      <div className="max-w-4xl mx-auto relative z-10">
        <motion.h2
          className="text-5xl md:text-6xl lg:text-7xl font-script text-center mb-6 md:mb-8 text-white"
          style={{ textShadow: '1px 1px 6px rgba(0,0,0,0.3)' }}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
        >
          {t('title')}
        </motion.h2>
        <motion.p
          className="text-center text-sm md:text-base mb-8 md:mb-12 text-white opacity-90"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          {t('subtitle')}
        </motion.p>

        {/* Form */}
        <motion.form
          onSubmit={handleSubmit}
          className="rounded-lg shadow-lg p-6 md:p-8 mb-8 md:mb-12 bg-white border"
          style={{ borderColor: 'var(--theme-primary-light)' }}
          variants={cardVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
        >
          <div className="space-y-6">
            <div>
              <label htmlFor="name" className="block font-medium mb-2" style={{ color: 'var(--wedding-text-dark)' }}>
                {t('name')} <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                className="w-full px-3 py-2.5 md:px-4 md:py-3 text-sm md:text-base border border-gray-300 rounded-lg focus:ring-2 focus:border-transparent"
                style={{
                  '--tw-ring-color': 'var(--theme-primary)'
                } as React.CSSProperties}
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = 'var(--theme-primary)';
                  e.currentTarget.style.boxShadow = '0 0 0 2px var(--theme-primary-light)';
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = '';
                  e.currentTarget.style.boxShadow = '';
                }}
              />
            </div>

            <div>
              <label htmlFor="message" className="block font-medium mb-2" style={{ color: 'var(--wedding-text-dark)' }}>
                {t('message')} <span className="text-red-500">*</span>
              </label>
              <textarea
                id="message"
                name="message"
                rows={4}
                required
                value={formData.message}
                onChange={handleChange}
                placeholder={t('messagePlaceholder')}
                className="w-full px-3 py-2.5 md:px-4 md:py-3 text-sm md:text-base border border-gray-300 rounded-lg focus:ring-2 focus:border-transparent"
                style={{
                  '--tw-ring-color': 'var(--theme-primary)'
                } as React.CSSProperties}
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = 'var(--theme-primary)';
                  e.currentTarget.style.boxShadow = '0 0 0 2px var(--theme-primary-light)';
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = '';
                  e.currentTarget.style.boxShadow = '';
                }}
              />
            </div>

            {submitStatus === 'success' && (
              <motion.div
                className="px-4 py-3 rounded-lg border"
                style={{
                  backgroundColor: 'var(--theme-primary-lighter)',
                  borderColor: 'var(--theme-primary-light)',
                  color: 'var(--theme-primary-darker)'
                }}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                {t('thankYou')}
              </motion.div>
            )}

            {submitStatus === 'error' && (
              <motion.div
                className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                {t('error')}
              </motion.div>
            )}

            <motion.button
              type="submit"
              disabled={isSubmitting}
              className="w-full md:w-auto px-6 py-3 md:px-8 md:py-4 text-sm md:text-base text-white rounded-full font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              style={{ backgroundColor: 'var(--theme-primary)' }}
              onMouseEnter={(e) => {
                if (!isSubmitting) e.currentTarget.style.backgroundColor = 'var(--theme-primary-dark)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'var(--theme-primary)';
              }}
              whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
              whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
            >
              {isSubmitting ? tCommon('loading') : t('submit')}
            </motion.button>
          </div>
        </motion.form>

        {/* Messages */}
        <div className="space-y-6">
          {messages.length === 0 ? (
            <motion.p
              className="text-center py-12"
              style={{ color: 'var(--wedding-text-light)' }}
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
                className="bg-white rounded-lg shadow-md p-4 md:p-6 border"
                style={{ borderColor: 'var(--theme-primary-lighter)' }}
                variants={messageVariants}
                initial="hidden"
                animate={inView ? 'visible' : 'hidden'}
                transition={{ delay: index * 0.1 }}
              >
                <div className="flex items-start justify-between mb-2 md:mb-3">
                  <h3 className="font-semibold text-base md:text-lg font-serif"
                    style={{ color: 'var(--theme-primary)' }}
                  >
                    {message.name}
                  </h3>
                  <span className="text-xs md:text-sm" style={{ color: 'var(--wedding-text-light)' }}>
                    {message.submittedAt.toLocaleDateString()}
                  </span>
                </div>
                <p className="text-sm md:text-base" style={{ color: 'var(--wedding-text-dark)' }}>{message.message}</p>
              </motion.div>
            ))
          )}
        </div>
      </div>
    </section>
  );
}

