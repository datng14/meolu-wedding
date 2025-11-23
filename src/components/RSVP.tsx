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
    vegan: 'no',
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
        vegan: 'no',
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
          className='text-5xl md:text-6xl lg:text-7xl text-center mb-4 md:mb-6 font-dancing-script'
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
        >
          {t('title')}
        </motion.h2>
        <motion.p
          className='text-center text-base md:text-lg lg:text-xl text-gray-600 mb-8 md:mb-12'
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          {t('subtitle')}
        </motion.p>

        {submitStatus === 'success' ? (
          <motion.div
            className='bg-white rounded-lg shadow-lg p-6 md:p-8 lg:p-12 text-center'
            variants={cardVariants}
            initial='hidden'
            animate={inView ? 'visible' : 'hidden'}
          >
            <motion.div
              className='flex flex-col items-center justify-center space-y-4'
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <motion.div
                className='w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center'
                style={{ backgroundColor: 'var(--theme-primary-light)' }}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
              >
                <svg
                  className='w-8 h-8 md:w-10 md:h-10'
                  style={{ color: 'var(--theme-primary)' }}
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
                className='text-2xl md:text-3xl font-medium'
                style={{ color: 'var(--theme-primary-darker)' }}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                {t('thankYou')}
              </motion.h3>
              <motion.p
                className='text-base md:text-lg text-gray-600'
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
            className='bg-white rounded-lg shadow-lg p-6 md:p-8 lg:p-12'
            variants={cardVariants}
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
            className='bg-white rounded-lg shadow-lg p-6 md:p-8 lg:p-12'
            variants={cardVariants}
            initial='hidden'
            animate={inView ? 'visible' : 'hidden'}
          >
            <div className='space-y-6'>
              <div>
                <label
                  htmlFor='name'
                  className='block font-medium mb-2 text-base md:text-lg'
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
                <label className='block font-medium mb-2 text-base md:text-lg'>
                  {t('attending')} <span className='text-red-500'>*</span>
                </label>
                <div className='space-y-2'>
                  <label className='flex items-center text-base md:text-lg'>
                    <input
                      type='radio'
                      name='attending'
                      value='yes'
                      checked={formData.attending === 'yes'}
                      onChange={handleChange}
                      className='mr-2 focus:ring-2'
                    />
                    {t('yes')}
                  </label>
                  <label className='flex items-center text-base md:text-lg'>
                    <input
                      type='radio'
                      name='attending'
                      value='no'
                      checked={formData.attending === 'no'}
                      onChange={handleChange}
                      className='mr-2 focus:ring-2'
                    />
                    {t('no')}
                  </label>
                </div>
              </div>

              {formData.attending === 'yes' && (
                <div>
                  <label
                    htmlFor='guests'
                    className='block font-medium mb-2 text-base md:text-lg'
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
                    onFocus={(e) => {
                      e.currentTarget.style.borderColor =
                        'var(--theme-primary)';
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
                <label className='block font-medium mb-2 text-base md:text-lg'>
                  {t('areYouVegan')} <span className='text-red-500'>*</span>
                </label>
                <div className='space-y-2'>
                  <label className='flex items-center text-base md:text-lg'>
                    <input
                      type='radio'
                      name='vegan'
                      value='yes'
                      checked={formData.vegan === 'yes'}
                      onChange={handleChange}
                      className='mr-2 focus:ring-2'
                    />
                    {t('yesVegan')}
                  </label>
                  <label className='flex items-center text-base md:text-lg'>
                    <input
                      type='radio'
                      name='vegan'
                      value='no'
                      checked={formData.vegan === 'no'}
                      onChange={handleChange}
                      className='mr-2 focus:ring-2'
                    />
                    {t('noVegan')}
                  </label>
                </div>
              </div>

              <div>
                <label
                  htmlFor='message'
                  className='block font-medium mb-2 text-base md:text-lg'
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
                  e.currentTarget.style.backgroundColor =
                    'var(--theme-primary)';
                }}
                whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
              >
                {isSubmitting ? tCommon('loading') : t('submit')}
              </motion.button>
            </div>
          </motion.form>
        )}
      </div>
    </section>
  );
}
