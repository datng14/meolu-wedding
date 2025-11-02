'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { useInView } from 'react-intersection-observer';

export default function Invitation() {
  const t = useTranslations('invitation');
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  // Wedding details
  const weddingDetails = {
    title: 'Tuan Dat & Anh Thao Wedding',
    date: '2026-01-24',
    startTime: '18:00',
    endTime: '21:00',
    location: 'PAVILLON TÂN SƠN NHẤT',
    address: '202 Đ. Hoàng Văn Thụ, Phường 9, Phú Nhuận, TP. HCM, Việt Nam',
  };

  const handleAddToCalendar = () => {
    const startDate = `${weddingDetails.date.replace(
      /-/g,
      ''
    )}T${weddingDetails.startTime.replace(':', '')}00`;
    const endDate = `${weddingDetails.date.replace(
      /-/g,
      ''
    )}T${weddingDetails.endTime.replace(':', '')}00`;
    const details = `Join us for our wedding celebration at ${weddingDetails.location}`;

    const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
      weddingDetails.title
    )}&dates=${startDate}/${endDate}&details=${encodeURIComponent(
      details
    )}&location=${encodeURIComponent(
      weddingDetails.address
    )}&sf=true&output=xml`;

    window.open(googleCalendarUrl, '_blank');
  };

  const handleGetDirections = () => {
    const googleMapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
      weddingDetails.address
    )}`;
    window.open(googleMapsUrl, '_blank');
  };

  return (
    <section
      ref={ref}
      className='py-16 px-4 md:py-20 bg-white relative overflow-hidden'
    >
      <div className='max-w-4xl mx-auto relative z-10'>
        <motion.div
          className='text-center space-y-8 md:space-y-12'
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Family Info */}
          <div className='grid grid-cols-2 gap-4 md:gap-8 mb-8'>
            {/* Groom's Family */}
            <div className='text-center flex flex-col'>
              <h3
                className='text-xl uppercase tracking-wider mb-2 font-semibold font-serif min-h-16'
                style={{ color: 'var(--wedding-text-dark)' }}
              >
                {t('groomFamily')}
              </h3>
              <p
                className='text-xs md:text-sm font-serif mb-1 '
                style={{ color: 'var(--wedding-text-dark)' }}
              >
                {t('groomFatherName')}
              </p>
              <p
                className='text-xs md:text-sm font-serif mb-1 '
                style={{ color: 'var(--wedding-text-dark)' }}
              >
                {t('groomMotherName')}
              </p>
              <p
                className='text-xs md:text-sm '
                style={{ color: 'var(--wedding-text-light)' }}
              >
                {t('groomCity')}
              </p>
            </div>

            {/* Bride's Family */}
            <div className='text-center flex flex-col'>
              <h3
                className='text-xl uppercase tracking-wider mb-2 font-semibold font-serif min-h-16'
                style={{ color: 'var(--wedding-text-dark)' }}
              >
                {t('brideFamily')}
              </h3>
              <p
                className='text-xs md:text-sm font-serif mb-1'
                style={{ color: 'var(--wedding-text-dark)' }}
              >
                {t('brideFatherName')}
              </p>
              <p
                className='text-xs md:text-sm font-serif mb-1'
                style={{ color: 'var(--wedding-text-dark)' }}
              >
                {t('brideMotherName')}
              </p>
              <p
                className='text-xs md:text-sm'
                style={{ color: 'var(--wedding-text-light)' }}
              >
                {t('brideCity')}
              </p>
            </div>
          </div>

          {/* Logo/Monogram with signature background */}
          <motion.div
            className='flex justify-center my-8'
            initial={{ scale: 0 }}
            animate={inView ? { scale: 1 } : { scale: 0 }}
            transition={{ delay: 0.3, type: 'spring', stiffness: 200 }}
          >
            <div className='relative w-36 h-36 md:w-40 md:h-40'>
              <div
                className='absolute inset-0 opacity-20'
                style={{
                  backgroundImage: 'url(/images/signature-bg.png)',
                  backgroundSize: 'contain',
                  backgroundRepeat: 'no-repeat',
                  backgroundPosition: 'center',
                }}
              />
              <div className='absolute inset-0 flex items-center justify-center'>
                <div
                  className='text-5xl md:text-5xl lg:text-6xl font-script relative h-20 w-20'
                  style={{ color: 'var(--theme-primary)' }}
                >
                  <span className='animate-pulse absolute top-[5px] left-[10px]'>
                    D
                  </span>
                  <span className='animate-pulse absolute top-[40px] left-[15px]'>
                    T
                  </span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Invitation Text */}
          <div className='space-y-4'>
            <p
              className='text-base md:text-lg font-serif'
              style={{ color: 'var(--wedding-text-dark)' }}
            >
              {t('invitationText')}
            </p>
            <p
              className='text-base md:text-lg font-serif'
              style={{ color: 'var(--wedding-text-dark)' }}
            >
              {t('celebrationText')}
            </p>
          </div>

          {/* Couple Names with signature background */}
          <div className='space-y-6 my-12'>
            <h2
              className='text-4xl md:text-6xl lg:text-6xl font-serif font-bold'
              style={{ color: 'var(--theme-primary)' }}
            >
              {t('groomName').split('&')[0].trim()}
            </h2>

            <p
              className='text-6xl md:text-6xl lg:text-6xl font-script'
              style={{ color: 'var(--theme-primary)' }}
            >
              and
            </p>

            <h2
              className='text-4xl md:text-6xl lg:text-6xl font-serif font-bold'
              style={{ color: 'var(--theme-primary)' }}
            >
              {t('groomName').split('&')[1].trim()}
            </h2>
          </div>

          {/* Date and Time */}
          <div className='space-y-8 my-16'>
            <div className='flex justify-center items-center gap-4 md:gap-8 text-4xl md:text-6xl lg:text-6xl font-serif font-bold'>
              <div className='text-center'>
                <p style={{ color: 'var(--theme-primary)' }}>24</p>
              </div>
              <div className='text-center'>
                <p style={{ color: 'var(--theme-primary)' }}>/</p>
              </div>
              <div className='text-center'>
                <p style={{ color: 'var(--theme-primary)' }}>01</p>
              </div>
              <div className='text-center'>
                <p style={{ color: 'var(--theme-primary)' }}>/</p>
              </div>
              <div className='text-center'>
                <p style={{ color: 'var(--theme-primary)' }}>26</p>
              </div>
            </div>
            <div className='flex justify-center items-center gap-4'>
              <p
                className='text-2xl md:text-3xl font-serif font-semibold'
                style={{ color: 'var(--theme-primary)' }}
              >
                18:00
              </p>
              <span
                className='text-2xl md:text-3xl'
                style={{ color: 'var(--theme-primary)' }}
              >
                |
              </span>
              <p
                className='text-2xl md:text-3xl font-serif font-semibold uppercase'
                style={{ color: 'var(--theme-primary)' }}
              >
                {t('dayOfWeek')}
              </p>
            </div>
            <p
              className='text-base md:text-lg font-serif'
              style={{ color: 'var(--wedding-text-dark)' }}
            >
              {t('lunarDate')}
            </p>
          </div>

          {/* Venue */}
          <div className='space-y-6'>
            <h3
              className='text-base md:text-lg uppercase tracking-widest font-semibold'
              style={{ color: 'var(--wedding-text-dark)' }}
            >
              {t('location')}
            </h3>
            <h2
              className='text-2xl md:text-3xl lg:text-4xl font-serif uppercase tracking-wide font-bold'
              style={{ color: 'var(--theme-primary)' }}
            >
              {t('venue')}
            </h2>
            <p
              className='text-lg md:text-xl font-serif'
              style={{ color: 'var(--wedding-text-dark)' }}
            >
              {t('address')}
            </p>
            <div className='flex flex-col sm:flex-row gap-4 justify-center mt-6'>
              <motion.button
                onClick={handleAddToCalendar}
                className='px-8 py-3 text-sm md:text-base text-white rounded-full uppercase tracking-wider transition-colors border-2 cursor-pointer'
                style={{
                  backgroundColor: 'var(--theme-primary)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'var(--theme-white)';
                  e.currentTarget.style.color = 'var(--theme-primary)';
                  e.currentTarget.style.borderColor = 'var(--theme-primary)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor =
                    'var(--theme-primary)';
                  e.currentTarget.style.color = 'white';
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {t('addToCalendar')}
              </motion.button>
              <motion.button
                onClick={handleGetDirections}
                className='px-8 py-3 text-sm md:text-base rounded-full uppercase tracking-wider transition-colors border-2 cursor-pointer'
                style={{
                  borderColor: 'var(--theme-primary)',
                  color: 'var(--theme-primary)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor =
                    'var(--theme-primary)';
                  e.currentTarget.style.color = 'white';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                  e.currentTarget.style.color = 'var(--theme-primary)';
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {t('directions')}
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
