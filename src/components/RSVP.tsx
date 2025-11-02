'use client';

import { db } from '@/lib/firebase';
import { RSVPForm } from '@/types';
import { addDoc, collection } from 'firebase/firestore';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { useInView } from 'react-intersection-observer';

export default function RSVP() {
  const t = useTranslations('rsvp');
  const tCommon = useTranslations('common');
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [formData, setFormData] = useState<RSVPForm>({
    name: '',
    phone: '',
    attending: 'yes',
    guests: 1,
    message: '',
    submittedAt: new Date(),
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    'idle' | 'success' | 'error'
  >('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const rsvpData = {
        ...formData,
        submittedAt: new Date(),
      };

      await addDoc(collection(db, 'rsvps'), rsvpData);
      setSubmitStatus('success');
      setFormData({
        name: '',
        phone: '',
        attending: 'yes',
        guests: 1,
        message: '',
        submittedAt: new Date(),
      });
    } catch (error) {
      console.error('Error submitting RSVP:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'guests' ? parseInt(value) || 1 : value,
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

  return (
    <section
      ref={ref}
      className='py-12 px-4 md:py-20'
      style={{
        background: `linear-gradient(to bottom, white, var(--theme-primary-ultra-light))`,
      }}
    >
      <div className='max-w-2xl mx-auto'>
        <motion.h2
          className='text-3xl md:text-4xl lg:text-5xl font-serif text-center mb-4 md:mb-6'
          style={{ color: 'var(--theme-primary)' }}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
        >
          {t('title')}
        </motion.h2>
        <motion.p
          className='text-center text-sm md:text-base text-gray-600 mb-8 md:mb-12'
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          {t('subtitle')}
        </motion.p>

        <motion.form
          onSubmit={handleSubmit}
          className='bg-white rounded-lg shadow-lg p-6 md:p-8 lg:p-12'
          variants={cardVariants}
          initial='hidden'
          animate={inView ? 'visible' : 'hidden'}
        >
          <div className='space-y-6'>
            <div>
              <label
                htmlFor='name'
                className='block text-gray-700 font-medium mb-2'
              >
                {t('name')} <span className='text-red-500'>*</span>
              </label>
              <input
                type='text'
                id='name'
                name='name'
                required
                value={formData.name}
                onChange={handleChange}
                className='w-full px-3 py-2.5 md:px-4 md:py-3 text-sm md:text-base border border-gray-300 rounded-lg focus:ring-2 focus:border-transparent'
                style={
                  {
                    '--tw-ring-color': 'var(--theme-primary)',
                    focusRingColor: 'var(--theme-primary)',
                  } as React.CSSProperties & { focusRingColor?: string }
                }
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = 'var(--theme-primary)';
                  e.currentTarget.style.boxShadow =
                    '0 0 0 2px var(--theme-primary-light)';
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = '';
                  e.currentTarget.style.boxShadow = '';
                }}
              />
            </div>

            <div>
              <label
                htmlFor='phone'
                className='block text-gray-700 font-medium mb-2'
              >
                {t('phone')}
              </label>
              <input
                type='tel'
                id='phone'
                name='phone'
                value={formData.phone}
                onChange={handleChange}
                className='w-full px-3 py-2.5 md:px-4 md:py-3 text-sm md:text-base border border-gray-300 rounded-lg focus:ring-2 focus:border-transparent'
                style={
                  {
                    '--tw-ring-color': 'var(--theme-primary)',
                    focusRingColor: 'var(--theme-primary)',
                  } as React.CSSProperties & { focusRingColor?: string }
                }
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = 'var(--theme-primary)';
                  e.currentTarget.style.boxShadow =
                    '0 0 0 2px var(--theme-primary-light)';
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = '';
                  e.currentTarget.style.boxShadow = '';
                }}
              />
            </div>

            <div>
              <label className='block text-gray-700 font-medium mb-2'>
                {t('attending')} <span className='text-red-500'>*</span>
              </label>
              <div className='space-y-2'>
                <label className='flex items-center'>
                  <input
                    type='radio'
                    name='attending'
                    value='yes'
                    checked={formData.attending === 'yes'}
                    onChange={handleChange}
                    className='mr-2 focus:ring-2'
                    style={
                      {
                        color: 'var(--theme-primary)',
                        '--tw-ring-color': 'var(--theme-primary)',
                      } as React.CSSProperties
                    }
                  />
                  {t('yes')}
                </label>
                <label className='flex items-center'>
                  <input
                    type='radio'
                    name='attending'
                    value='no'
                    checked={formData.attending === 'no'}
                    onChange={handleChange}
                    className='mr-2 focus:ring-2'
                    style={
                      {
                        color: 'var(--theme-primary)',
                        '--tw-ring-color': 'var(--theme-primary)',
                      } as React.CSSProperties
                    }
                  />
                  {t('no')}
                </label>
              </div>
            </div>

            {formData.attending === 'yes' && (
              <div>
                <label
                  htmlFor='guests'
                  className='block text-gray-700 font-medium mb-2'
                >
                  {t('guests')}
                </label>
                <input
                  type='number'
                  id='guests'
                  name='guests'
                  min='1'
                  value={formData.guests}
                  onChange={handleChange}
                  className='w-full px-3 py-2.5 md:px-4 md:py-3 text-sm md:text-base border border-gray-300 rounded-lg focus:ring-2 focus:border-transparent'
                  style={
                    {
                      '--tw-ring-color': 'var(--theme-primary)',
                      focusRingColor: 'var(--theme-primary)',
                    } as React.CSSProperties & { focusRingColor?: string }
                  }
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = 'var(--theme-primary)';
                    e.currentTarget.style.boxShadow =
                      '0 0 0 2px var(--theme-primary-light)';
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = '';
                    e.currentTarget.style.boxShadow = '';
                  }}
                />
              </div>
            )}

            <div>
              <label
                htmlFor='message'
                className='block text-gray-700 font-medium mb-2'
              >
                {t('message')}
              </label>
              <textarea
                id='message'
                name='message'
                rows={4}
                value={formData.message}
                onChange={handleChange}
                placeholder={t('messagePlaceholder')}
                className='w-full px-3 py-2.5 md:px-4 md:py-3 text-sm md:text-base border border-gray-300 rounded-lg focus:ring-2 focus:border-transparent'
                style={
                  {
                    '--tw-ring-color': 'var(--theme-primary)',
                    focusRingColor: 'var(--theme-primary)',
                  } as React.CSSProperties & { focusRingColor?: string }
                }
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = 'var(--theme-primary)';
                  e.currentTarget.style.boxShadow =
                    '0 0 0 2px var(--theme-primary-light)';
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = '';
                  e.currentTarget.style.boxShadow = '';
                }}
              />
            </div>

            {submitStatus === 'success' && (
              <motion.div
                className='px-4 py-3 rounded-lg border'
                style={{
                  backgroundColor: 'var(--theme-primary-lighter)',
                  borderColor: 'var(--theme-primary-light)',
                  color: 'var(--theme-primary-darker)',
                }}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                {t('thankYou')}
              </motion.div>
            )}

            {submitStatus === 'error' && (
              <motion.div
                className='bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg'
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                {t('error')}
              </motion.div>
            )}

            <motion.button
              type='submit'
              disabled={isSubmitting}
              className='w-full px-6 py-3 md:px-8 md:py-4 text-sm md:text-base text-white rounded-full font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed'
              style={{ backgroundColor: 'var(--theme-primary)' }}
              onMouseEnter={(e) => {
                if (!isSubmitting)
                  e.currentTarget.style.backgroundColor =
                    'var(--theme-primary-dark)';
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
      </div>
    </section>
  );
}
